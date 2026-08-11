import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import worldTopology from '../assets/geo/countries-110m.json'

type Position = [number, number]
type Polygon = Position[][]
type Geometry =
  | { type: 'Polygon'; coordinates: Polygon }
  | { type: 'MultiPolygon'; coordinates: Polygon[] }
type FeatureCollection = { features: Array<{ geometry: Geometry | null }> }

type Hub = {
  name: string
  lat: number
  lon: number
  color?: number
}

const hubs: Hub[] = [
  { name: 'Hong Kong', lat: 22.32, lon: 114.17, color: 0xcfff00 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Tokyo', lat: 35.68, lon: 139.76 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
  { name: 'London', lat: 51.51, lon: -0.13 },
  { name: 'New York', lat: 40.71, lon: -74.01 },
  { name: 'Sao Paulo', lat: -23.55, lon: -46.63 },
  { name: 'Seoul', lat: 37.57, lon: 126.98 },
]

const links = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [1, 3], [2, 5], [3, 4], [4, 5],
] as const

function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function makeCountryLines(radius: number) {
  const positions: number[] = []
  const topology = worldTopology as unknown as Topology<{ countries: GeometryCollection }>
  const data = feature(topology, topology.objects.countries) as unknown as FeatureCollection
  const appendRing = (ring: Position[]) => {
    for (let index = 1; index < ring.length; index += 1) {
      const [lonA, latA] = ring[index - 1]
      const [lonB, latB] = ring[index]
      const a = latLonToVector(latA, lonA, radius)
      const b = latLonToVector(latB, lonB, radius)
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }

  data.features.forEach((feature) => {
    if (!feature.geometry) return
    const polygons = feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates
    polygons.forEach((polygon) => polygon.forEach(appendRing))
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return new THREE.LineSegments(
    geometry,
    new THREE.LineBasicMaterial({
      color: 0x8abaff,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
}

function makeAtmosphere(radius: number) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 96, 96),
    new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: { glowColor: { value: new THREE.Color(0x367dff) } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 3.2);
          gl_FragColor = vec4(glowColor, fresnel * 0.34);
        }
      `,
    }),
  )
}

export function GlobalNetworkScene({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x040812, 0.055)

    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 80)
    camera.position.set(0, 0.1, 6.25)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mount.clientWidth < 700 ? 1.35 : 1.7))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.96
    renderer.setClearColor(0x040812, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.42, 0.66)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())

    const globe = new THREE.Group()
    globe.rotation.set(0.08, -0.64, -0.025)
    scene.add(globe)

    const globeRadius = 1.62
    const surface = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 128, 128),
      new THREE.MeshPhysicalMaterial({
        color: 0x071d3d,
        emissive: 0x03142f,
        emissiveIntensity: 1.35,
        metalness: 0.42,
        roughness: 0.32,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
        transparent: true,
        opacity: 0.98,
      }),
    )
    globe.add(surface)

    const innerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius * 0.982, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x0a3a82, transparent: true, opacity: 0.38 }),
    )
    globe.add(innerGlow)
    globe.add(makeCountryLines(globeRadius * 1.006))
    globe.add(makeAtmosphere(globeRadius * 1.09))

    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(globeRadius * 1.012, 32, 18)),
      new THREE.LineBasicMaterial({ color: 0x2f6fc7, transparent: true, opacity: 0.055 }),
    )
    globe.add(grid)

    const pulseObjects: Array<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset: number; speed: number }> = []
    links.forEach(([fromIndex, toIndex], index) => {
      const from = latLonToVector(hubs[fromIndex].lat, hubs[fromIndex].lon, globeRadius * 1.018)
      const to = latLonToVector(hubs[toIndex].lat, hubs[toIndex].lon, globeRadius * 1.018)
      const midpoint = from.clone().add(to).multiplyScalar(0.5).normalize()
      const distance = from.distanceTo(to)
      midpoint.multiplyScalar(globeRadius + 0.32 + distance * 0.2)
      const curve = new THREE.QuadraticBezierCurve3(from, midpoint, to)
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)),
        new THREE.LineBasicMaterial({
          color: index % 4 === 0 ? 0xcfff00 : 0x4c91ff,
          transparent: true,
          opacity: index % 4 === 0 ? 0.72 : 0.42,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      globe.add(line)

      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(index % 4 === 0 ? 0.027 : 0.018, 14, 14),
        new THREE.MeshBasicMaterial({ color: index % 4 === 0 ? 0xcfff00 : 0x9ec5ff }),
      )
      pulse.position.copy(curve.getPoint(index / links.length))
      globe.add(pulse)
      pulseObjects.push({ mesh: pulse, curve, offset: index / links.length, speed: 0.075 + (index % 3) * 0.018 })
    })

    hubs.forEach((hub, index) => {
      const position = latLonToVector(hub.lat, hub.lon, globeRadius * 1.022)
      const marker = new THREE.Group()
      marker.position.copy(position)
      marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize())

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(index === 0 ? 0.055 : 0.035, index === 0 ? 0.074 : 0.049, 32),
        new THREE.MeshBasicMaterial({
          color: hub.color ?? 0x72a9ff,
          transparent: true,
          opacity: index === 0 ? 1 : 0.82,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      marker.add(ring)
      globe.add(marker)
    })

    let randomSeed = 8731
    const random = () => {
      randomSeed = (randomSeed * 16807) % 2147483647
      return (randomSeed - 1) / 2147483646
    }
    const starCount = mount.clientWidth < 700 ? 700 : 1500
    const starPositions = new Float32Array(starCount * 3)
    for (let index = 0; index < starCount; index += 1) {
      const radius = 7 + random() * 13
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[index * 3 + 1] = radius * Math.cos(phi)
      starPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0x75a8ef, size: 0.018, transparent: true, opacity: 0.46, depthWrite: false }),
    )
    scene.add(stars)

    scene.add(new THREE.HemisphereLight(0x78aaff, 0x02050b, 2.2))
    const keyLight = new THREE.DirectionalLight(0x8dbbff, 2.45)
    keyLight.position.set(4, 2.5, 6)
    scene.add(keyLight)
    const edgeLight = new THREE.PointLight(0xcfff00, 9, 10, 1.8)
    edgeLight.position.set(-3, -1.4, 3)
    scene.add(edgeLight)

    const pointer = new THREE.Vector2()
    let scrollProgress = 0
    let visible = true
    let frame = 0
    let lastTime = 0

    const updateScroll = () => {
      const hero = mount.closest('.commercial-hero')
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const distance = Math.max(rect.height - window.innerHeight, 1)
      scrollProgress = THREE.MathUtils.clamp(-rect.top / distance, 0, 1)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1)
      const height = Math.max(mount.clientHeight, 1)
      renderer.setSize(width, height, false)
      composer.setSize(width, height)
      bloom.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      globe.position.set(width < 700 ? 0.08 : 1.18, width < 700 ? 0.78 : 0.05, 0)
      globe.scale.setScalar(width < 700 ? 0.83 : 1)
    }

    const draw = (time = 0) => {
      if (!visible) {
        frame = window.requestAnimationFrame(draw)
        return
      }
      const delta = Math.min((time - lastTime) / 1000, 0.04)
      lastTime = time
      const motion = reducedMotion.matches ? 0 : 1
      const targetY = -0.64 + scrollProgress * 0.86 + pointer.x * 0.075
      const targetX = 0.08 + scrollProgress * 0.12 - pointer.y * 0.045
      globe.rotation.y = THREE.MathUtils.lerp(globe.rotation.y, targetY, 0.045)
      globe.rotation.x = THREE.MathUtils.lerp(globe.rotation.x, targetX, 0.045)
      surface.rotation.y += delta * 0.012 * motion
      grid.rotation.y -= delta * 0.008 * motion
      stars.rotation.y += delta * 0.003 * motion
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.25 - scrollProgress * 0.62, 0.04)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.1 + scrollProgress * 0.18, 0.04)
      pulseObjects.forEach(({ mesh, curve, offset, speed }) => {
        const progress = (offset + time * 0.001 * speed * motion) % 1
        mesh.position.copy(curve.getPoint(progress))
      })
      composer.render()
      frame = window.requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { rootMargin: '120px' })
    resizeObserver.observe(mount)
    visibilityObserver.observe(mount)
    mount.addEventListener('pointermove', onPointerMove)
    window.addEventListener('scroll', updateScroll, { passive: true })
    resize()
    updateScroll()
    composer.render()
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      mount.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', updateScroll)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material.dispose()
        }
      })
      composer.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className={`global-network-scene ${className}`.trim()} />
}

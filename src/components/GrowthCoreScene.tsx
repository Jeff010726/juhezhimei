import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  mode?: number
  className?: string
}

const modeColors = [0x1265e8, 0x00a7d8, 0xcfff00]

export function GrowthCoreScene({ mode = 0, className = '' }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const modeRef = useRef(mode)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0.15, 6.8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    const root = new THREE.Group()
    scene.add(root)

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: modeColors[0],
      emissive: 0x052f75,
      emissiveIntensity: 0.8,
      metalness: 0.15,
      roughness: 0.2,
      transmission: 0.12,
      transparent: true,
      opacity: 0.92,
    })
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.18, 4), coreMaterial)
    root.add(core)

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 2),
      new THREE.MeshBasicMaterial({ color: 0x8fc6ff, wireframe: true, transparent: true, opacity: 0.24 }),
    )
    root.add(shell)

    const rings = new THREE.Group()
    ;[
      [1.92, 0.006, 0],
      [2.2, 0.009, Math.PI / 3],
      [2.55, 0.006, -Math.PI / 4],
    ].forEach(([radius, tube, rotation], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 8, 180),
        new THREE.MeshBasicMaterial({ color: index === 2 ? 0xcfff00 : 0x1265e8, transparent: true, opacity: index === 2 ? 0.75 : 0.35 }),
      )
      ring.rotation.x = rotation
      ring.rotation.y = rotation * 0.6
      rings.add(ring)
    })
    root.add(rings)

    const particleCount = 900
    const particlePositions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.1 + Math.random() * 2.5
      particlePositions[index * 3] = Math.cos(angle) * radius
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 2.8
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius * 0.45
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x78b5ff, size: 0.026, transparent: true, opacity: 0.7, sizeAttenuation: true }),
    )
    root.add(particles)

    const nodeGeometry = new THREE.SphereGeometry(0.055, 18, 18)
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xcfff00 })
    const nodes = new THREE.Group()
    for (let index = 0; index < 8; index += 1) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      const angle = (index / 8) * Math.PI * 2
      node.position.set(Math.cos(angle) * 2.2, Math.sin(angle * 1.7) * 0.72, Math.sin(angle) * 0.68)
      nodes.add(node)
    }
    root.add(nodes)

    scene.add(new THREE.AmbientLight(0xffffff, 1.8))
    const blueLight = new THREE.PointLight(0x1265e8, 24, 12)
    blueLight.position.set(3, 2, 4)
    scene.add(blueLight)
    const greenLight = new THREE.PointLight(0xcfff00, 14, 10)
    greenLight.position.set(-3, -2, 3)
    scene.add(greenLight)

    const pointer = new THREE.Vector2()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let running = true

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1)
      const height = Math.max(mount.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const render = (time = 0) => {
      if (!running) return
      const seconds = time * 0.001
      const reduced = prefersReducedMotion.matches
      const speed = reduced ? 0 : 1
      root.rotation.y += ((pointer.x * 0.18) - root.rotation.y) * 0.035
      root.rotation.x += ((-pointer.y * 0.12) - root.rotation.x) * 0.035
      core.rotation.y = seconds * 0.18 * speed
      core.rotation.x = seconds * 0.11 * speed
      shell.rotation.y = -seconds * 0.12 * speed
      shell.rotation.z = seconds * 0.08 * speed
      rings.rotation.z = seconds * 0.05 * speed
      rings.children.forEach((ring, index) => {
        ring.rotation.y += (0.001 + index * 0.0005) * speed
      })
      particles.rotation.y = -seconds * 0.025 * speed
      nodes.rotation.z = seconds * 0.08 * speed
      const target = new THREE.Color(modeColors[modeRef.current] || modeColors[0])
      coreMaterial.color.lerp(target, 0.035)
      coreMaterial.emissive.lerp(target.clone().multiplyScalar(0.35), 0.025)
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(render)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    mount.addEventListener('pointermove', onPointerMove)
    resize()
    render()

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      mount.removeEventListener('pointermove', onPointerMove)
      root.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className={`growth-core-scene ${className}`.trim()} />
}

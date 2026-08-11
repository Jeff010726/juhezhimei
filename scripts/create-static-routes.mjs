import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const outputDirectory = 'dist'
const entryFile = join(outputDirectory, 'index.html')
const routes = ['services', 'cases', 'about', 'contact']

await Promise.all(
  routes.map(async (route) => {
    const routeDirectory = join(outputDirectory, route)
    await mkdir(routeDirectory, { recursive: true })
    await copyFile(entryFile, join(routeDirectory, 'index.html'))
  }),
)

await copyFile(entryFile, join(outputDirectory, '404.html'))

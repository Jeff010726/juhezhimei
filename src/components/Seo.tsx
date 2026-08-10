import { useEffect } from 'react'

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [title, description])
  return null
}

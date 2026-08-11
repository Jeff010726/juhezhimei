const logoFiles: Record<string, string> = {
  Meta: 'meta.svg',
  'Google Ads': 'google-ads.svg',
  'TikTok for Business': 'tiktok.svg',
  Snapchat: 'snapchat.svg',
}

export function PlatformLogo({ name, compact = false }: { name: string; compact?: boolean }) {
  const file = logoFiles[name]
  if (!file) return <strong className="platform-logo__fallback">{name}</strong>

  return (
    <span className={`platform-logo${compact ? ' platform-logo--compact' : ''}`}>
      <span className="platform-logo__icon">
        <img src={`${import.meta.env.BASE_URL}media-logos/${file}`} alt="" />
      </span>
      <strong>{name}</strong>
    </span>
  )
}

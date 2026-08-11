const brandThemes: Record<string, number> = {
  NORTHLINE: 0,
  'VELA HOME': 1,
  MORROW: 2,
  KITEPAY: 3,
  'ASTER LABS': 4,
  'NORI SKIN': 5,
  ORBITRA: 6,
  FINORA: 7,
}

export function FictionalBrandLogo({ name }: { name: string }) {
  const theme = brandThemes[name] ?? 0
  return (
    <span className={`fictional-logo fictional-logo--${theme}`} aria-label={`${name} 示意品牌`}>
      <span className="fictional-logo__symbol" aria-hidden="true"><i /><i /><i /></span>
      <strong>{name}</strong>
    </span>
  )
}

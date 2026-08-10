import { Link } from 'react-router-dom'

export function LogoMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand-mark${inverse ? ' brand-mark--inverse' : ''}`} to="/" aria-label="聚核智媒首页">
      <span className="brand-mark__symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>聚核智媒</strong>
        <small>GLOBAL GROWTH STUDIO</small>
      </span>
    </Link>
  )
}

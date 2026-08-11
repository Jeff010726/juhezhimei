import { Link } from 'react-router-dom'

export function LogoMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="brand-mark" to="/" aria-label="聚核智媒首页">
      <img
        src={`${import.meta.env.BASE_URL}brand/core-reach-media-${inverse ? 'light' : 'dark'}.svg`}
        alt="聚核智媒 Core Reach Media"
      />
    </Link>
  )
}

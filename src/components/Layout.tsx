import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { LogoMark } from './LogoMark'

const nav = [
  ['/', '首页'],
  ['/services', '服务'],
  ['/cases', '案例'],
  ['/about', '关于'],
] as const

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900
    const timer = window.setTimeout(() => setIntroVisible(false), delay)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="site-shell">
      {introVisible && (
        <div className="site-intro" aria-hidden="true">
          <div className="site-intro__mark"><i /><i /><i /></div>
          <span>CORE REACH MEDIA</span>
          <div className="site-intro__line" />
        </div>
      )}

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <LogoMark />
        <nav className="desktop-nav" aria-label="主导航">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="header-cta" to="/contact">
          项目咨询 <ArrowUpRight size={15} />
        </NavLink>
        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="移动端导航">
            {nav.map(([to, label], index) => (
              <NavLink key={to} to={to} end={to === '/'}>
                <span>0{index + 1}</span>{label}<ArrowUpRight size={17} />
              </NavLink>
            ))}
            <NavLink to="/contact"><span>05</span>项目咨询<ArrowUpRight size={17} /></NavLink>
          </nav>
        )}
      </header>

      <main><Outlet /></main>

      <footer className="site-footer">
        <div className="site-footer__lead">
          <div>
            <p>CORE REACH MEDIA</p>
            <h2>从目标市场开始，<br />把下一步说清楚。</h2>
          </div>
          <NavLink to="/contact" aria-label="提交项目需求"><ArrowUpRight size={28} /></NavLink>
        </div>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <LogoMark inverse />
            <p>为出海企业提供市场判断、本地化内容、海外媒体投放、网站和数据优化服务。</p>
          </div>
          <div>
            <span>服务</span>
            <NavLink to="/services">海外广告投放</NavLink>
            <NavLink to="/services">网站与 SEO</NavLink>
            <NavLink to="/services">创意与数据</NavLink>
          </div>
          <div>
            <span>了解我们</span>
            <NavLink to="/cases">项目案例</NavLink>
            <NavLink to="/about">工作方式</NavLink>
            <NavLink to="/contact">项目咨询</NavLink>
          </div>
          <div className="site-footer__project">
            <span>准备开始</span>
            <p>留下业务目标和目标市场，我们会根据现有情况回复。</p>
            <NavLink to="/contact">填写项目需求 <ArrowRight size={16} /></NavLink>
          </div>
        </div>
        <div className="site-footer__wordmark">CORE REACH MEDIA</div>
        <div className="site-footer__legal"><span>© 2026 聚核智媒</span><span>ASIA BASED · GLOBAL DELIVERY</span></div>
      </footer>
    </div>
  )
}

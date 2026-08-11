import { ArrowUpRight, Menu, X } from 'lucide-react'
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
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <div className="site-shell">
      <header className="site-header">
        <LogoMark />
        <nav className="desktop-nav" aria-label="主导航">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="header-cta" to="/contact">
          开始咨询 <ArrowUpRight size={16} />
        </NavLink>
        <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? '关闭菜单' : '打开菜单'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="移动端导航">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {label}<ArrowUpRight size={18} />
              </NavLink>
            ))}
            <NavLink to="/contact">联系我们<ArrowUpRight size={18} /></NavLink>
          </nav>
        )}
      </header>

      <main><Outlet /></main>

      <footer className="site-footer">
        <div className="footer-top">
          <p className="eyebrow eyebrow--light">BUILD YOUR NEXT MARKET</p>
          <h2>把下一站市场，<br />变成下一段增长。</h2>
          <NavLink className="footer-action" to="/contact" aria-label="获取增长诊断">
            <ArrowUpRight size={32} />
          </NavLink>
        </div>
        <div className="footer-grid">
          <LogoMark inverse />
          <div>
            <span>服务</span>
            <NavLink to="/services">广告投放</NavLink>
            <NavLink to="/services">网站与 SEO</NavLink>
            <NavLink to="/services">创意与数据</NavLink>
          </div>
          <div>
            <span>公司</span>
            <NavLink to="/about">关于我们</NavLink>
            <NavLink to="/cases">项目案例</NavLink>
            <NavLink to="/contact">联系我们</NavLink>
          </div>
          <div className="footer-placeholder">
            <span>合作</span>
            <p>全球数字增长项目</p>
            <NavLink to="/contact">提交项目需求</NavLink>
            <p>Asia based · Global delivery</p>
          </div>
        </div>
        <div className="footer-wordmark">CORE REACH MEDIA</div>
        <div className="footer-legal"><span>© 2026 CORE REACH MEDIA</span><span>聚核智媒 · 全球数字增长伙伴</span></div>
      </footer>
    </div>
  )
}

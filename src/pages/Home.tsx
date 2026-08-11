import { ArrowDown, ArrowRight, ArrowUpRight, CircleCheck, MoveRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'
import { growthSteps, platforms, rhythms, services } from '../data'

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .2 },
  transition: { duration: .65 },
}

export function Home() {
  return (
    <>
      <Seo title="聚核智媒｜企业出海增长解决方案" description="聚核智媒提供海外广告投放、网站建设、SEO、本地化创意和数据优化服务，帮助企业构建可持续的全球获客系统。" />

      <section className="home-hero">
        <div className="home-hero__background" />
        <div className="home-hero__veil" />
        <div className="home-hero__content">
          <motion.div className="home-hero__label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>
            GLOBAL GROWTH STUDIO · CHINA
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            聚核<br />智媒
          </motion.h1>
          <motion.div className="home-hero__statement" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25, duration: .7 }}>
            <span>让海外增长</span>
            <strong>从流量投入走向可持续生意</strong>
            <Link to="/contact">获取增长方案 <ArrowUpRight size={17} /></Link>
          </motion.div>
          <a className="hero-scroll" href="#growth" aria-label="继续浏览"><ArrowDown size={18} /></a>
        </div>
        <div className="hero-ticker" aria-hidden="true">
          <span>PAID MEDIA</span><i />
          <span>WEB EXPERIENCE</span><i />
          <span>SEO GROWTH</span><i />
          <span>LOCAL CREATIVE</span>
        </div>
      </section>

      <section className="thesis-band" id="growth">
        <motion.div className="thesis-band__visual" {...reveal}>
          <img src="/images/global-team.webp" alt="跨市场团队协作" />
          <div className="visual-stamp"><span>ONE</span><strong>GROWTH<br />SYSTEM</strong></div>
          <div className="visual-tag visual-tag--one">MARKET</div>
          <div className="visual-tag visual-tag--two">CREATIVE</div>
          <div className="visual-tag visual-tag--three">DATA</div>
        </motion.div>
        <motion.div className="thesis-band__copy" {...reveal}>
          <p className="eyebrow eyebrow--light">ABOUT JUHE</p>
          <h2>把分散的增长动作，<br />整合成一套获客系统。</h2>
          <p>聚核智媒连接市场判断、网站承接、流量获取、创意转化和数据优化，让每一个环节都为下一步提供更高质量的输入。</p>
          <Link className="text-link text-link--light" to="/about">了解我们的工作方式 <ArrowRight size={18} /></Link>
        </motion.div>
      </section>

      <section className="growth-system">
        <SectionIntro eyebrow="THE GROWTH SYSTEM" title="增长不是五项服务的叠加，而是五个环节的协同。" copy="从进入市场到规模增长，我们围绕同一个商业目标安排策略、执行与复盘。" />
        <div className="growth-system__track">
          {growthSteps.map(([number, title, copy], index) => (
            <motion.article key={number} className="growth-step" {...reveal} transition={{ duration: .55, delay: index * .06 }}>
              <span>{number}</span>
              <div className="growth-step__line"><i /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="capability-showcase">
        <div className="capability-showcase__header">
          <p className="eyebrow eyebrow--light">WHAT WE DO</p>
          <h2>围绕增长目标，<br />配置真正需要的能力。</h2>
        </div>
        <div className="capability-showcase__cards">
          {[
            ['广告增长', '在正确市场找到高价值用户', '/images/data-dashboard.webp', 'META · GOOGLE · TIKTOK'],
            ['网站转化', '把访问转化成可追踪的询盘', '/images/website-analytics.webp', 'STRATEGY · UX · ANALYTICS'],
            ['本地化创意', '让内容进入当地用户的语境', '/images/creative-workshop.webp', 'DESIGN · VIDEO · TESTING'],
          ].map(([title, copy, image, meta], index) => (
            <motion.article className={`capability-card capability-card--${index + 1}`} key={title} {...reveal}>
              <img src={image} alt={title} />
              <div className="capability-card__shade" />
              <div className="capability-card__body">
                <span>0{index + 1} / {meta}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link to="/services" aria-label={`查看${title}`}><ArrowUpRight /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="superpowers">
        <div className="superpowers__backdrop" />
        <SectionIntro light eyebrow="CORE CAPABILITIES" title="我们的增长能力" copy="策略、投放、网站、内容与数据，由同一支项目团队协同推进。" />
        <div className="superpowers__grid">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article className={`service-tile service-tile--${index + 1}`} key={service.title} {...reveal}>
                <div className="service-tile__top"><span>{service.number}</span><Icon size={23} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <small>{service.en}</small>
              </motion.article>
            )
          })}
        </div>
        <Link className="section-action section-action--light" to="/services">查看完整服务 <ArrowUpRight size={18} /></Link>
      </section>

      <section className="case-feature">
        <SectionIntro eyebrow="SELECTED CASE" title="用持续测试，扩大东南亚新用户获取规模。" copy="某消费分期服务项目，以多媒体组合、创意迭代和预算集中完成增长验证。" />
        <div className="case-feature__layout">
          <motion.div className="case-feature__metrics" {...reveal}>
            <div><strong>600万+</strong><span>单组广告系列展示</span></div>
            <div><strong>18.9万+</strong><span>单组链接点击</span></div>
            <div><strong>$0.72起</strong><span>单次链接点击费用</span></div>
            <Link to="/cases">查看项目方法 <MoveRight /></Link>
          </motion.div>
          <motion.div className="case-feature__evidence" {...reveal}>
            <img src="/images/case-dashboard.webp" alt="脱敏后的广告投放数据后台" />
            <div className="case-feature__note"><CircleCheck size={18} /> 2025 投放后台数据，账户及客户名称已脱敏</div>
          </motion.div>
        </div>
      </section>

      <section className="media-strip">
        <span>SUPPORTED MEDIA ECOSYSTEM</span>
        {platforms.map(platform => <strong key={platform}>{platform}</strong>)}
      </section>

      <section className="rhythm-section">
        <div className="rhythm-section__background" />
        <div className="rhythm-section__heading">
          <p className="eyebrow">VISIBLE COLLABORATION</p>
          <h2>你会持续知道：<br />发生了什么，为什么，下一步做什么。</h2>
        </div>
        <div className="rhythm-section__cards">
          {rhythms.map(([en, title, copy], index) => (
            <motion.article key={en} className={`rhythm-card rhythm-card--${index + 1}`} {...reveal}>
              <span>{en}</span><h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pilot-cta">
        <div>
          <p className="eyebrow">LOW-RISK PILOT</p>
          <h2>先验证，再放大。</h2>
          <p>从一次增长诊断开始，确定最值得优先投入的市场与获客路径。</p>
        </div>
        <Link to="/contact">开始增长诊断 <ArrowUpRight /></Link>
      </section>
    </>
  )
}

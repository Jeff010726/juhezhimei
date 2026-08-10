import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'
import { processSteps, services } from '../data'

export function Services() {
  return (
    <>
      <Seo title="服务能力｜聚核智媒" description="聚核智媒提供海外广告投放、网站与独立站、SEO、创意本地化和数据增长策略。" />
      <PageHero eyebrow="SERVICES" index="01" title="为增长配置能力，而不是堆叠服务。" intro="每个项目从真实商业目标出发，选择最能缩短验证路径、提高转化效率的执行组合。" image="/images/global-logistics.jpg" />

      <section className="services-overview">
        <SectionIntro eyebrow="FULL-FUNNEL SUPPORT" title="从市场进入到规模增长，提供全链路支持。" />
        <div className="service-detail-list">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article className="service-detail" key={service.number}>
                <div className="service-detail__number">{service.number}</div>
                <div className="service-detail__title"><Icon /><h3>{service.title}</h3><span>{service.en}</span></div>
                <p>{service.description}</p>
                <ul>{service.points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className="services-visual-band">
        <img src="/images/strategy-table.jpg" alt="出海增长策略讨论" />
        <div>
          <p className="eyebrow eyebrow--light">ONE TEAM, ONE GOAL</p>
          <h2>不是多个供应商的拼接，<br />而是一支团队共同经营增长。</h2>
          <p>渠道、素材、网站与数据使用同一套目标和判断标准，减少沟通损耗，也让优化动作更快进入下一轮。</p>
        </div>
      </section>

      <section className="process-section">
        <SectionIntro eyebrow="HOW WE WORK" title="从低风险试点开始，逐步建立共同判断。" />
        <div className="process-list">
          {processSteps.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <Link className="section-action" to="/contact">讨论你的项目 <ArrowUpRight size={18} /></Link>
      </section>
    </>
  )
}

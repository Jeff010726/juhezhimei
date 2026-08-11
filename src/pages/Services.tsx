import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'
import { images } from '../assets/site-images'
import { processSteps, services } from '../data'

export function Services() {
  return (
    <>
      <Seo title="服务能力｜聚核智媒" description="聚核智媒提供海外广告投放、网站与独立站、SEO、创意本地化和数据增长策略。" />
      <PageHero eyebrow="SERVICES" index="01" title="按业务目标安排团队、渠道和执行范围。" intro="有的项目需要先解决网站承接，有的项目需要先验证市场和素材。方案会根据现状调整。" image={images.globalLogistics} />

      <section className="services-overview">
        <SectionIntro eyebrow="FULL-FUNNEL SUPPORT" title="从市场进入到规模增长，每个环节都有明确交付。" copy="下面列出常用服务。实际项目会根据目标、团队能力和预算选择其中一部分。" />
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
        <img src={images.strategyTable} alt="出海增长策略讨论" />
        <div>
          <p className="eyebrow eyebrow--light">ONE TEAM, ONE GOAL</p>
          <h2>渠道、素材、网站和数据，使用同一套目标。</h2>
          <p>项目负责人统一安排执行和复盘。广告发现的问题会回到素材和页面，网站数据也会影响下一轮预算。</p>
        </div>
      </section>

      <section className="process-section">
        <SectionIntro eyebrow="HOW WE WORK" title="先完成一轮小范围验证，再决定怎么扩大投入。" />
        <div className="process-list">
          {processSteps.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <Link className="section-action" to="/contact">提交业务目标 <ArrowUpRight size={18} /></Link>
      </section>
    </>
  )
}

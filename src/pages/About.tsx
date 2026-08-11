import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'
import { companyValues, markets } from '../data'

export function About() {
  return (
    <>
      <Seo title="关于我们｜聚核智媒" description="聚核智媒是一家面向中国出海企业的全球增长服务团队，以数据驱动和本地化运营连接海外市场。" />
      <PageHero eyebrow="ABOUT JUHE" index="03" title="连接全球市场，也连接每一个增长环节。" intro="我们相信，稳定增长来自清晰的判断、专业的执行和持续透明的复盘。" image="/images/team-meeting.webp" />

      <section className="about-intro">
        <SectionIntro eyebrow="WHO WE ARE" title="专注企业海外获客与增长。" />
        <div className="about-intro__copy">
          <p>聚核智媒从跨境业务实战出发，以数据驱动和本地化运营连接全球市场。我们把广告、网站、SEO、创意和数据放在同一套增长逻辑中，帮助企业减少试错，让投入逐步沉淀为长期资产。</p>
          <p>我们不以“代操作”定义合作，而是与客户共同建立市场判断、验证增长路径，并持续改善获客效率。</p>
        </div>
        <div className="market-line"><span>关注市场</span>{markets.map(market => <strong key={market}>{market}</strong>)}</div>
      </section>

      <section className="value-section">
        <img src="/images/global-team.webp" alt="跨市场项目协作团队" />
        <div className="value-section__content">
          <p className="eyebrow eyebrow--light">OUR PRINCIPLES</p>
          <h2>专业，不只体现在策略里，也体现在每一次响应和复盘中。</h2>
          <div className="value-list">
            {companyValues.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="promise-section">
        <SectionIntro eyebrow="THE PROMISE" title="保持透明，尊重事实，长期主义。" />
        <div className="promise-line">
          <p>不使用无法核验的数据包装能力</p><p>不让报告停留在结果陈列</p><p>不以短期波动替代长期判断</p>
        </div>
        <Link className="section-action" to="/contact">认识项目团队 <ArrowUpRight size={18} /></Link>
      </section>
    </>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'
import { images } from '../assets/site-images'
import { companyValues, markets } from '../data'

export function About() {
  return (
    <>
      <Seo title="关于我们｜聚核智媒" description="聚核智媒是一家面向中国出海企业的全球增长服务团队，以数据和本地化运营连接海外市场。" />
      <PageHero eyebrow="ABOUT JUHE" index="03" title="一支围绕海外获客工作的项目团队。" intro="我们负责市场研究、内容、投放、网站和数据复盘，也会直接说明当前阶段不建议投入的项目。" image={images.teamMeeting} />

      <section className="about-intro">
        <SectionIntro eyebrow="WHO WE ARE" title="聚核智媒专注企业海外获客和增长。" />
        <div className="about-intro__copy">
          <p>团队从跨境业务实战出发，把广告、网站、SEO、创意和数据放进同一套项目计划。这样可以减少供应商之间的信息损耗，也方便判断问题出在哪个环节。</p>
          <p>合作过程中，客户会参与市场判断、目标确认和阶段复盘。账户执行由我们负责，预算与下一步动作保持透明。</p>
        </div>
        <div className="market-line"><span>关注市场</span>{markets.map(market => <strong key={market}>{market}</strong>)}</div>
      </section>

      <section className="value-section">
        <img src={images.globalTeam} alt="跨市场项目协作团队" />
        <div className="value-section__content">
          <p className="eyebrow eyebrow--light">OUR PRINCIPLES</p>
          <h2>策略写进方案后，还要有人每天处理账户和项目问题。</h2>
          <div className="value-list">
            {companyValues.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="promise-section">
        <SectionIntro eyebrow="THE PROMISE" title="合作中需要长期坚持的三条工作标准。" />
        <div className="promise-line">
          <p>公开材料使用能核验的数据</p><p>报告同时给出判断和下一步动作</p><p>短期波动与长期趋势分开处理</p>
        </div>
        <Link className="section-action" to="/contact">介绍你的业务情况 <ArrowUpRight size={18} /></Link>
      </section>
    </>
  )
}

import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'

export function Cases() {
  return (
    <>
      <Seo title="项目案例｜聚核智媒" description="查看聚核智媒在海外广告投放、创意测试和规模增长方面的项目方法与脱敏数据。" />
      <PageHero eyebrow="SELECTED WORK" index="02" title="用真实结果，验证每一个增长判断。" intro="我们关注的不是短期曝光，而是从测试、学习到规模化的完整过程。" image="/images/global-city.webp" />

      <section className="case-study">
        <div className="case-study__header">
          <p className="eyebrow">CASE / 01</p>
          <h2>东南亚消费分期服务</h2>
          <p>通过多媒体组合和持续素材测试，扩大新用户获取规模，并在放量过程中保持成本可控。</p>
        </div>
        <div className="case-study__stats">
          <div><strong>600万+</strong><span>单组广告系列展示</span></div>
          <div><strong>18.9万+</strong><span>单组链接点击</span></div>
          <div><strong>$0.72起</strong><span>单次链接点击费用</span></div>
        </div>
        <div className="case-study__evidence">
          <div className="case-study__image"><img src="/images/case-dashboard.webp" alt="脱敏后的 Meta 广告数据后台" /><span>账户及客户名称已脱敏</span></div>
          <div className="case-study__actions">
            <p className="eyebrow">EXECUTION FOCUS</p>
            {[
              ['01', '建立测试矩阵', '并行测试素材方向、受众组合和出价方式。'],
              ['02', '集中高效预算', '用实际数据筛选组合，把预算转向有效路径。'],
              ['03', '保持素材供给', '持续生成素材变体，并监控疲劳与成本变化。'],
            ].map(([number, title, copy]) => (
              <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-principles">
        <SectionIntro light eyebrow="OUR STANDARD" title="案例的价值，不在于漂亮数字，而在于方法能否复用。" />
        <div>
          {['明确数据口径与衡量目标', '保护客户账户和业务信息', '解释结果背后的因果判断', '将有效方法沉淀为下一轮资产'].map((item, index) => (
            <p key={item}><CheckCircle2 /><span>0{index + 1}</span>{item}</p>
          ))}
        </div>
      </section>

      <section className="compact-cta"><h2>你的业务，适合先验证哪条增长路径？</h2><Link to="/contact">获取初步判断 <ArrowUpRight /></Link></section>
    </>
  )
}

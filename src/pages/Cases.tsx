import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionIntro } from '../components/SectionIntro'
import { Seo } from '../components/Seo'
import { images } from '../assets/site-images'

export function Cases() {
  return (
    <>
      <Seo title="项目案例｜聚核智媒" description="查看聚核智媒在海外广告投放、创意测试和规模增长方面的项目方法与脱敏数据。" />
      <PageHero eyebrow="SELECTED WORK" index="02" title="这里保留能核验的数据，也交代数据从哪里来。" intro="客户名称和账户信息会做脱敏处理。项目数字使用后台口径，不把服务场景写成客户案例。" image={images.globalCity} />

      <section className="case-study">
        <div className="case-study__header">
          <p className="eyebrow">CASE / 01</p>
          <h2>东南亚消费分期服务</h2>
          <p>项目通过多媒体组合和持续素材测试扩大新用户获取规模。下面的数据来自 2025 年投放后台。</p>
        </div>
        <div className="case-study__stats">
          <div><strong>600万+</strong><span>单组广告系列展示</span></div>
          <div><strong>18.9万+</strong><span>单组链接点击</span></div>
          <div><strong>$0.72起</strong><span>单次链接点击费用</span></div>
        </div>
        <div className="case-study__evidence">
          <div className="case-study__image"><img src={images.caseDashboard} alt="脱敏后的 Meta 广告数据后台" /><span>账户及客户名称已脱敏</span></div>
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

      <section className="scenario-section">
        <SectionIntro eyebrow="COMMON SCENARIOS" title="没有公开案例的业务，我们只展示工作方法。" copy="以下内容用于说明合作范围，不对应特定客户，也不使用虚构结果。" />
        <div className="scenario-grid">
          <article>
            <img src={images.strategyTable} alt="B2B 企业海外市场策略讨论" loading="lazy" />
            <span>B2B 制造 / 欧美</span>
            <h3>搜索广告、SEO 和询盘页面一起规划。</h3>
            <p>从采购问题和产品关键词开始，整理页面内容、广告结构和询盘记录方式。</p>
          </article>
          <article>
            <img src={images.creativeWorkshop} alt="消费品牌本地化创意讨论" loading="lazy" />
            <span>消费品牌 / 东南亚</span>
            <h3>用多轮素材测试确认当地用户回应什么。</h3>
            <p>每轮控制测试变量，记录卖点、场景和表达方式对点击与转化的影响。</p>
          </article>
        </div>
      </section>

      <section className="case-principles">
        <SectionIntro light eyebrow="OUR STANDARD" title="发布案例前，我们会检查数据口径和客户信息。" />
        <div>
          {['明确数据口径与衡量目标', '保护客户账户和业务信息', '区分项目事实与服务场景', '保留下一轮可以继续使用的方法'].map((item, index) => (
            <p key={item}><CheckCircle2 /><span>0{index + 1}</span>{item}</p>
          ))}
        </div>
      </section>

      <section className="compact-cta"><h2>把业务目标和现状发给我们，先判断该验证什么。</h2><Link to="/contact">提交项目信息 <ArrowUpRight /></Link></section>
    </>
  )
}

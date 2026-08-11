import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CircleCheck,
  Globe2,
  Languages,
  Search,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { images } from '../assets/site-images'
import { Seo } from '../components/Seo'
import { growthSteps, platforms } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
}

const engines = [
  {
    index: '01',
    title: '市场洞察',
    label: 'MARKET INTELLIGENCE',
    description: '从市场容量、竞争格局和用户意图出发，先确认增长机会，再决定预算与渠道。',
    image: images.dataDashboard,
    icon: Search,
    points: ['市场优先级', '用户需求地图', '竞争投放观察'],
  },
  {
    index: '02',
    title: '本地化创意',
    label: 'LOCAL CREATIVE',
    description: '把产品价值翻译成当地用户愿意停留、理解并行动的内容，而不只是语言转换。',
    image: images.creativeWorkshop,
    icon: Languages,
    points: ['沟通策略', '素材生产', '落地页协同'],
  },
  {
    index: '03',
    title: '增长优化',
    label: 'GROWTH OPTIMIZATION',
    description: '围绕真实业务目标持续测试受众、素材和出价，让每一轮数据都进入下一轮决策。',
    image: images.websiteAnalytics,
    icon: BarChart3,
    points: ['投放执行', '归因分析', '持续迭代'],
  },
]

const proofMetrics = [
  { value: '600万+', label: '累计曝光' },
  { value: '18.9万+', label: '有效点击' },
  { value: '$0.72起', label: '单次点击成本' },
]

export function Home() {
  return (
    <>
      <Seo
        title="聚核智媒｜全球数字增长伙伴"
        description="聚核智媒为出海企业提供市场洞察、本地化创意、媒体投放与增长优化服务。"
      />

      <div className="cr-home">
        <section className="cr-hero" aria-labelledby="hero-title">
          <img
            className="cr-hero__image"
            src={images.heroEarth}
            alt="从亚洲连接全球市场的数字网络"
            fetchPriority="high"
          />
          <div className="cr-hero__shade" />

          <div className="cr-hero__inner">
            <motion.div {...reveal} className="cr-hero__content">
              <p className="cr-kicker cr-kicker--light">
                <span>CORE REACH MEDIA</span>
                <span>GLOBAL GROWTH PARTNER</span>
              </p>
              <h1 id="hero-title">
                让全球触达，
                <strong>变成可衡量的增长。</strong>
              </h1>
              <p className="cr-hero__lead">
                从市场判断到媒体投放，我们把策略、创意和数据放进同一套增长系统，帮助中国品牌更稳地进入全球市场。
              </p>
              <div className="cr-actions">
                <Link className="cr-button cr-button--signal" to="/contact">
                  开始一个增长项目
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </Link>
                <Link className="cr-text-link cr-text-link--light" to="/cases">
                  查看真实案例 <ArrowRight size={17} />
                </Link>
              </div>
            </motion.div>

            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="cr-hero__signal">
              <span className="cr-status-dot" />
              <span>Asia based</span>
              <span>Global delivery</span>
            </motion.div>
          </div>

          <div className="cr-hero__footer">
            <div className="cr-hero__metrics" aria-label="核心能力">
              <span><b>4</b> 主流媒体平台</span>
              <span><b>5</b> 步增长闭环</span>
              <span><b>1</b> 个统一业务目标</span>
            </div>
            <a className="cr-scroll" href="#growth-system" aria-label="向下查看增长系统">
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <section className="cr-intro" id="growth-system">
          <motion.div {...reveal} className="cr-intro__heading">
            <p className="cr-kicker"><span>THE GROWTH SYSTEM</span><span>01 / 05</span></p>
            <h2>我们不把出海拆成一堆孤立动作。</h2>
          </motion.div>
          <motion.div {...reveal} className="cr-intro__copy">
            <p>
              流量、内容、转化和数据必须相互反馈。聚核智媒把它们放进一条可复盘、可优化、可持续推进的工作链路。
            </p>
            <Link className="cr-text-link" to="/services">
              了解完整服务 <ArrowRight size={17} />
            </Link>
          </motion.div>
        </section>

        <section className="cr-engines" aria-label="增长引擎">
          {engines.map((engine, index) => {
            const Icon = engine.icon
            return (
              <motion.article
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.08 }}
                className="cr-engine"
                key={engine.title}
              >
                <div className="cr-engine__media">
                  <img src={engine.image} alt="" loading="lazy" />
                  <span className="cr-engine__index">{engine.index}</span>
                </div>
                <div className="cr-engine__body">
                  <Icon size={24} strokeWidth={1.6} />
                  <p>{engine.label}</p>
                  <h3>{engine.title}</h3>
                  <div className="cr-engine__description">{engine.description}</div>
                  <ul>
                    {engine.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </section>

        <section className="cr-process">
          <div className="cr-section-head">
            <motion.div {...reveal}>
              <p className="cr-kicker"><span>ONE CONNECTED PROCESS</span><span>02 / 05</span></p>
              <h2>从判断到放大，五步形成闭环。</h2>
            </motion.div>
            <motion.p {...reveal}>
              每个阶段都有明确交付物和验证标准，团队知道为什么做，也看得见下一步。
            </motion.p>
          </div>

          <div className="cr-process__rail">
            {growthSteps.map(([number, title, description], index) => (
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.06 }}
                className="cr-process__step"
                key={number}
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                {index < growthSteps.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="cr-media">
          <div className="cr-media__visual">
            <img src={images.globalCity} alt="全球城市中的数字媒体网络" loading="lazy" />
            <div className="cr-media__caption">
              <Globe2 size={23} strokeWidth={1.6} />
              <span>GLOBAL MEDIA ACCESS</span>
            </div>
          </div>

          <div className="cr-media__content">
            <motion.div {...reveal}>
              <p className="cr-kicker cr-kicker--light"><span>MEDIA RESOURCES</span><span>03 / 05</span></p>
              <h2>连接主流平台，也连接每一次业务判断。</h2>
              <p className="cr-media__lead">
                我们根据市场阶段、用户意图和转化目标组合渠道，不用同一套投放逻辑解决所有问题。
              </p>
            </motion.div>

            <div className="cr-platforms">
              {platforms.map((platform, index) => (
                <motion.div
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.06 }}
                  className="cr-platform"
                  key={platform}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{platform}</strong>
                  <p>{['社交触达与需求培育', '高意图搜索与全域覆盖', '短视频内容与规模获客', '视觉内容与品牌连接'][index]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="cr-proof">
          <div className="cr-section-head cr-section-head--proof">
            <motion.div {...reveal}>
              <p className="cr-kicker"><span>PROOF, NOT PROMISES</span><span>04 / 05</span></p>
              <h2>让数据成为共同语言。</h2>
            </motion.div>
            <motion.p {...reveal}>
              从曝光效率到有效询盘，我们用一套透明的指标体系同步进展，让优化建立在事实之上。
            </motion.p>
          </div>

          <div className="cr-proof__layout">
            <motion.div {...reveal} className="cr-proof__visual">
              <img src={images.caseDashboard} alt="数字广告项目数据分析面板" loading="lazy" />
              <div className="cr-proof__badge">
                <CircleCheck size={20} />
                <span>持续优化中</span>
              </div>
            </motion.div>

            <motion.div {...reveal} className="cr-proof__content">
              <p className="cr-proof__eyebrow">跨境数字广告项目</p>
              <h3>从分散投放，到一套能持续迭代的增长机制。</h3>
              <p>
                重新梳理目标市场、受众和素材节奏，以周为单位复盘预算与结果，逐步提高有效触达效率。
              </p>
              <div className="cr-proof__metrics">
                {proofMetrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <Link className="cr-button cr-button--ink" to="/cases">
                查看案例详情 <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="cr-collaboration">
          <motion.div {...reveal} className="cr-collaboration__copy">
            <p className="cr-kicker"><span>BUILT TO WORK TOGETHER</span><span>05 / 05</span></p>
            <h2>你掌握业务，我们负责把增长跑起来。</h2>
            <p>
              从首次沟通开始，我们就以业务目标、决策节奏和可执行交付为中心。没有黑箱，也没有脱离实际的漂亮方案。
            </p>
          </motion.div>
          <motion.div {...reveal} className="cr-collaboration__list">
            {['目标与预算同步', '策略与执行一体', '数据与结论透明', '团队与节奏稳定'].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
                <CircleCheck size={20} />
              </div>
            ))}
          </motion.div>
        </section>

        <section className="cr-final-cta">
          <div>
            <p>READY TO EXPAND?</p>
            <h2>下一站，增长见。</h2>
          </div>
          <Link className="cr-button cr-button--signal" to="/contact">
            和我们聊聊 <ArrowUpRight size={18} />
          </Link>
        </section>
      </div>
    </>
  )
}

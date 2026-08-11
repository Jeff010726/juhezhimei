import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  CircleCheck,
  FileCheck2,
  Globe2,
  Languages,
  LineChart,
  Radio,
  ScanSearch,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { images } from '../assets/site-images'
import { FictionalBrandLogo } from '../components/FictionalBrandLogo'
import { PlatformLogo } from '../components/PlatformLogo'
import { Seo } from '../components/Seo'

const GlobalNetworkScene = lazy(() => import('../components/GlobalNetworkScene').then((module) => ({ default: module.GlobalNetworkScene })))

const platforms = [
  {
    name: 'Meta',
    type: 'SOCIAL DISCOVERY',
    title: '从兴趣发现到再营销',
    copy: '围绕受众、素材和转化事件管理广告，让测试结果回到下一轮预算安排。',
    scope: 'Facebook / Instagram / Reels',
  },
  {
    name: 'Google Ads',
    type: 'SEARCH INTENT',
    title: '承接明确搜索需求',
    copy: '用搜索、展示和视频覆盖不同意图阶段，并把广告与网站页面、转化追踪接在一起。',
    scope: 'Search / Display / YouTube',
  },
  {
    name: 'TikTok for Business',
    type: 'CONTENT COMMERCE',
    title: '用本地内容快速验证',
    copy: '持续测试创意主题、开场表达和受众组合，找到可以稳定放大的内容方向。',
    scope: 'Video / Spark Ads / Shop',
  },
  {
    name: 'Snapchat',
    type: 'NEXT-GEN AUDIENCE',
    title: '覆盖年轻移动用户',
    copy: '结合移动优先素材和地区人群策略，为品牌认知、应用增长与再营销补充触点。',
    scope: 'Video / AR / App Growth',
  },
]

const operatingSteps = [
  {
    number: '01',
    en: 'MARKET SIGNAL',
    title: '市场判断',
    copy: '比较需求、竞争、渠道成本和现有资源，确认优先市场与试点范围。',
    detail: '市场优先级 / 用户需求 / 竞争投放',
  },
  {
    number: '02',
    en: 'MEDIA ACCESS',
    title: '账户与媒体',
    copy: '准备账户、像素、预算结构和投放规则，让执行从一开始就有清楚的边界。',
    detail: '账户开通 / 预算结构 / 风险检查',
  },
  {
    number: '03',
    en: 'LOCAL CREATIVE',
    title: '本地化创意',
    copy: '根据当地语言、场景和购买顾虑生产素材，每轮测试保留明确变量。',
    detail: '创意策略 / 素材变体 / 落地页表达',
  },
  {
    number: '04',
    en: 'PERFORMANCE',
    title: '投放与优化',
    copy: '按日处理账户异常，按周复盘受众、素材和成本，逐步集中有效预算。',
    detail: '日常管理 / 出价测试 / 扩量路径',
  },
  {
    number: '05',
    en: 'MEASUREMENT',
    title: '数据与复盘',
    copy: '把曝光、点击、询盘和成交放在同一条路径里，说明结果，也说明下一步。',
    detail: '归因检查 / 周报月报 / 增长建议',
  },
]

const advantages = [
  {
    icon: BadgeCheck,
    en: 'AUTHORIZED ACCESS',
    title: '媒体账户与代理资质',
    copy: '相关平台代理证明可在商务沟通中提供核验。账户准备、开户资料和投放规则由团队协助处理。',
  },
  {
    icon: Languages,
    en: 'LOCAL EXECUTION',
    title: '内容按市场重新组织',
    copy: '语言、场景、卖点和购买顾虑都会进入素材规划，避免把翻译稿直接当作本地内容。',
  },
  {
    icon: LineChart,
    en: 'ONE MEASUREMENT',
    title: '广告、网站与归因一起看',
    copy: '投放数据会和页面行为、询盘质量一起复盘，减少只看平台指标带来的误判。',
  },
  {
    icon: ScanSearch,
    en: 'VISIBLE DELIVERY',
    title: '问题和动作都能看见',
    copy: '日报同步消耗与异常，周报解释变化和测试结果，月度复盘决定预算与下一阶段安排。',
  },
]

const clientBrands = ['NORTHLINE', 'VELA HOME', 'MORROW', 'KITEPAY', 'ASTER LABS', 'NORI SKIN', 'ORBITRA', 'FINORA']

const projects = [
  {
    type: '已脱敏项目',
    industry: '消费金融 / 东南亚',
    title: '持续测试素材与受众，扩大新用户获取规模。',
    copy: '以单组广告系列为单位观察曝光、点击和成本变化，预算逐步集中到表现稳定的组合。',
    image: images.caseDashboard,
    imageAlt: '脱敏后的广告投放数据后台',
    facts: [['600万+', '单组广告系列展示'], ['18.9万+', '单组链接点击'], ['$0.72起', '单次链接点击费用']],
    note: '2025 投放后台数据，账户及客户名称已脱敏。',
  },
  {
    type: '服务场景示意',
    industry: 'B2B 制造 / 欧美',
    title: '让搜索广告、SEO 和询盘页面使用同一套信息。',
    copy: '从关键词和采购问题安排页面、内容与广告，网站负责回答问题，数据负责判断询盘质量。',
    image: images.strategyTable,
    imageAlt: '海外市场与网站承接策略讨论',
    facts: [['SEARCH', '承接明确需求'], ['CONTENT', '回答采购问题'], ['CRM', '跟进询盘质量']],
    note: '服务场景示意，不代表特定客户项目。',
  },
  {
    type: '服务场景示意',
    industry: '消费品牌 / 东南亚',
    title: '用本地素材测试卖点，再放大有效内容。',
    copy: '每轮素材只调整有限变量，团队可以判断用户回应了哪个卖点、场景或表达。',
    image: images.creativeWorkshop,
    imageAlt: '本地化创意素材讨论现场',
    facts: [['INSIGHT', '梳理购买顾虑'], ['CREATIVE', '持续提供变体'], ['LEARN', '按结果更新脚本']],
    note: '服务场景示意，不代表特定客户项目。',
  },
]

const markets = [
  ['01', 'SOUTHEAST ASIA', '东南亚'],
  ['02', 'MIDDLE EAST', '中东'],
  ['03', 'EUROPE & NORTH AMERICA', '欧美'],
  ['04', 'LATIN AMERICA', '拉丁美洲'],
  ['05', 'JAPAN & KOREA', '日韩'],
]

export function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [caseSwiper, setCaseSwiper] = useState<SwiperType | null>(null)
  const [caseIndex, setCaseIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.v4-reveal').forEach((element) => {
        gsap.fromTo(element, { y: 48, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('.number-reveal').forEach((element) => {
        gsap.fromTo(element, { yPercent: 115 }, {
          yPercent: 0,
          duration: 1.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const rail = document.querySelector<HTMLElement>('.operating-system__rail')
        const stage = document.querySelector<HTMLElement>('.operating-system__stage')
        if (!rail || !stage) return
        const distance = () => Math.max(rail.scrollWidth - window.innerWidth, 0)
        gsap.to(rail, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.operating-system',
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.8}`,
            scrub: 0.7,
            pin: stage,
            invalidateOnRefresh: true,
          },
        })
      })

      gsap.to('.brand-universe__track--one', {
        xPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: '.brand-universe', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.brand-universe__track--two', {
        xPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '.brand-universe', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      return () => media.revert()
    }, rootRef)

    return () => context.revert()
  }, [])

  return (
    <div ref={rootRef} className="v4-home">
      <Seo
        title="聚核智媒｜全球数字媒体与增长服务"
        description="聚核智媒为出海企业提供媒体账户、本地化创意、海外广告投放、网站承接和数据优化服务。"
      />

      <section className="commercial-hero" aria-labelledby="home-title">
        <div className="commercial-hero__stage">
          <Suspense fallback={<div className="commercial-hero__fallback" aria-hidden="true" />}>
            <GlobalNetworkScene />
          </Suspense>
          <div className="commercial-hero__grid" aria-hidden="true" />
          <div className="commercial-hero__content">
            <div className="commercial-hero__copy">
              <p className="v4-overline v4-overline--signal"><Radio size={14} /> CORE REACH MEDIA / GLOBAL DELIVERY</p>
              <h1 id="home-title">让海外增长，<br />有市场判断，<br />也有执行结果。</h1>
              <p className="commercial-hero__lead">从媒体账户、本地化素材到网站和数据优化，一支团队负责同一套增长目标。</p>
              <div className="v4-actions">
                <Link className="v4-button v4-button--signal" to="/contact">讨论项目目标 <ArrowUpRight size={18} /></Link>
                <a className="v4-text-link v4-text-link--light" href="#media-resources">查看媒体资源 <ArrowDown size={17} /></a>
              </div>
            </div>

            <div className="commercial-hero__telemetry" aria-label="服务能力概览">
              <div><span>04</span><small>MEDIA ECOSYSTEMS</small></div>
              <div><span>05</span><small>DELIVERY MODULES</small></div>
              <div><span>05</span><small>MARKET REGIONS</small></div>
            </div>

            <div className="commercial-hero__locations" aria-hidden="true">
              <span className="commercial-hero__location commercial-hero__location--asia">ASIA PACIFIC<i /></span>
              <span className="commercial-hero__location commercial-hero__location--emea">EMEA<i /></span>
              <span className="commercial-hero__location commercial-hero__location--americas">AMERICAS<i /></span>
            </div>
          </div>

          <div className="commercial-hero__trust">
            <span>AUTHORIZED MEDIA ACCESS</span>
            {platforms.map((platform) => <PlatformLogo key={platform.name} name={platform.name} compact />)}
            <small>代理资质可提供核验</small>
          </div>
        </div>
      </section>

      <section className="resource-network" id="media-resources">
        <div className="resource-network__heading v4-reveal">
          <p className="v4-overline">01 / GLOBAL DIGITAL MEDIA RESOURCES</p>
          <h2>全球数字媒体资源</h2>
          <p>根据目标市场、用户意图和业务阶段安排媒体组合。相关代理证明可在商务沟通中提供核验。</p>
        </div>

        <div className="resource-network__grid">
          {platforms.map((platform, index) => (
            <article className="resource-network__platform v4-reveal" key={platform.name}>
              <div className="resource-network__platform-top">
                <span>0{index + 1}</span>
                <PlatformLogo name={platform.name} />
                <ArrowUpRight size={20} />
              </div>
              <div>
                <small>{platform.type}</small>
                <h3>{platform.title}</h3>
                <p>{platform.copy}</p>
              </div>
              <strong>{platform.scope}</strong>
            </article>
          ))}
        </div>

        <div className="resource-network__credential">
          <FileCheck2 size={28} />
          <div><strong>MEDIA AGENCY DOCUMENTS AVAILABLE</strong><span>商务沟通阶段可根据合作范围提供对应平台资质文件。</span></div>
          <Link to="/contact">申请核验 <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="operating-system" id="growth-system">
        <div className="operating-system__stage">
          <div className="operating-system__intro">
            <p className="v4-overline">02 / GROWTH OPERATING SYSTEM</p>
            <h2>从市场判断，到可持续执行。</h2>
            <p>每一步都要留下下一步能继续使用的信息、素材和数据。</p>
          </div>
          <div className="operating-system__rail">
            {operatingSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <small>{step.en}</small>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <strong>{step.detail}</strong>
              </article>
            ))}
          </div>
          <div className="operating-system__progress" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="why-core">
        <div className="why-core__visual">
          <img src={images.globalTeam} alt="跨市场项目团队协作" loading="lazy" />
          <div><Globe2 size={21} /><span>ONE TEAM / MULTI-MARKET DELIVERY</span></div>
        </div>
        <div className="why-core__content">
          <div className="why-core__heading v4-reveal">
            <p className="v4-overline v4-overline--signal">03 / WHY CORE REACH MEDIA?</p>
            <h2>为什么选择聚核智媒？</h2>
            <p>合作过程需要让账户、素材、页面和数据互相对得上。团队知道目前发生了什么，也知道下一步由谁处理。</p>
          </div>
          <div className="why-core__list">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <article className="v4-reveal" key={advantage.en}>
                  <span>0{index + 1}</span>
                  <Icon size={24} />
                  <div><small>{advantage.en}</small><h3>{advantage.title}</h3><p>{advantage.copy}</p></div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="scale-proof">
        <div className="scale-proof__label"><span>04 / ADVERTISER SCALE</span><small>PREVIEW DATA / 待企业数据确认</small></div>
        <div className="scale-proof__number"><div><strong className="number-reveal">100,000+</strong></div></div>
        <div className="scale-proof__copy">
          <h2>Advertisers Supported<br />in Global Expansion</h2>
          <p>该数字用于确认页面版式和动效，正式发布前需要替换成聚核智媒可核验的服务规模。</p>
        </div>
        <div className="scale-proof__verified">
          <div><strong>600万+</strong><span>单组广告系列展示</span></div>
          <div><strong>18.9万+</strong><span>单组链接点击</span></div>
          <div><strong>$0.72起</strong><span>单次链接点击费用</span></div>
          <small>2025 已脱敏项目数据</small>
        </div>
      </section>

      <section className="brand-universe">
        <div className="brand-universe__heading v4-reveal">
          <p className="v4-overline">05 / CLIENT NETWORK</p>
          <h2>为不同业务阶段准备对应的增长路径。</h2>
          <div><span>示意品牌 Logo</span><small>正式发布前替换为已获授权的客户标识</small></div>
        </div>
        <div className="brand-universe__tracks">
          <div className="brand-universe__track brand-universe__track--one">
            {[...clientBrands, ...clientBrands].map((brand, index) => <FictionalBrandLogo name={brand} key={`${brand}-${index}`} />)}
          </div>
          <div className="brand-universe__track brand-universe__track--two">
            {[...clientBrands].reverse().concat(clientBrands).map((brand, index) => <FictionalBrandLogo name={brand} key={`${brand}-reverse-${index}`} />)}
          </div>
        </div>
      </section>

      <section className="commercial-cases">
        <div className="commercial-cases__header">
          <div className="v4-reveal">
            <p className="v4-overline v4-overline--light">06 / PROJECT PROOF</p>
            <h2>用项目数据和执行过程说明结果。</h2>
          </div>
          <div className="commercial-cases__controls">
            <span>{String(caseIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => caseSwiper?.slidePrev()} aria-label="上一个项目"><ArrowLeft /></button>
            <button type="button" onClick={() => caseSwiper?.slideNext()} aria-label="下一个项目"><ArrowRight /></button>
          </div>
        </div>

        <Swiper
          className="commercial-cases__swiper"
          modules={[A11y]}
          slidesPerView={1}
          onSwiper={setCaseSwiper}
          onSlideChange={(swiper) => setCaseIndex(swiper.activeIndex)}
          grabCursor
        >
          {projects.map((project) => (
            <SwiperSlide className="commercial-case" key={project.title}>
              <div className="commercial-case__image">
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <span>{project.type}</span>
              </div>
              <div className="commercial-case__body">
                <p className="v4-overline">{project.industry}</p>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
                <div className="commercial-case__facts">
                  {project.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
                </div>
                <small>{project.note}</small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link className="v4-text-link v4-text-link--light commercial-cases__link" to="/cases">查看项目方法 <ArrowRight size={17} /></Link>
      </section>

      <section className="global-delivery">
        <div className="global-delivery__image">
          <img src={images.globalCity} alt="全球数字业务网络" loading="lazy" />
          <div className="global-delivery__image-label"><CircleCheck size={20} /><span>GLOBAL COORDINATION / LOCAL EXECUTION</span></div>
        </div>
        <div className="global-delivery__content">
          <div className="v4-reveal">
            <p className="v4-overline">07 / GLOBAL DELIVERY</p>
            <h2>市场不同，交付标准保持清楚。</h2>
            <p>每个地区单独判断渠道、语言和用户顾虑，项目进度、数据口径和复盘节奏保持一致。</p>
          </div>
          <div className="global-delivery__markets">
            {markets.map(([number, en, name]) => <div key={en}><span>{number}</span><strong>{en}</strong><small>{name}</small></div>)}
          </div>
        </div>
      </section>

      <section className="commercial-contact">
        <div>
          <p className="v4-overline v4-overline--signal">08 / START A PROJECT</p>
          <h2>告诉我们目标市场、预算范围和目前遇到的问题。</h2>
          <p>第一次沟通会确认业务情况、可执行范围和需要补充的资料。</p>
        </div>
        <Link className="v4-button v4-button--signal" to="/contact">提交项目需求 <ArrowUpRight size={19} /></Link>
        <BarChart3 className="commercial-contact__icon" aria-hidden="true" />
      </section>
    </div>
  )
}

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleCheck,
  Radio,
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
import { Seo } from '../components/Seo'
import { growthModules, placeholderBrands, platforms, rhythms } from '../data'

const GrowthCoreScene = lazy(() => import('../components/GrowthCoreScene').then((module) => ({ default: module.GrowthCoreScene })))

const heroStories = [
  {
    key: 'GROWTH SYSTEM',
    title: '市场、内容和投放使用同一套目标。',
    copy: '项目从业务问题开始。我们一起确认市场、预算和衡量方式，再进入执行。',
  },
  {
    key: 'LOCAL CREATIVE',
    title: '素材要让当地用户看懂，也愿意行动。',
    copy: '语言、场景、产品卖点和购买顾虑都会进入素材测试，不做简单翻译。',
  },
  {
    key: 'PERFORMANCE MEDIA',
    title: '每天处理账户，按周调整下一轮动作。',
    copy: '预算、受众、素材和页面一起复盘，异常及时处理，有效组合逐步放大。',
  },
]

const serviceScenes = [
  {
    number: '01',
    label: '市场进入',
    title: '先找到值得验证的市场。',
    copy: '把市场需求、竞争强度、渠道成本和现有资源放在一起比较。',
    tags: ['市场研究', '竞争观察', '试点规划'],
    tone: 'signal',
  },
  {
    number: '02',
    label: '内容承接',
    title: '广告和页面讲同一件事。',
    copy: '素材负责吸引正确的人，页面负责回答问题，数据负责记录下一步。',
    tags: ['本地创意', '网站体验', '转化追踪'],
    tone: 'light',
  },
  {
    number: '03',
    label: '规模增长',
    title: '让有效结果决定预算去向。',
    copy: '保留表现稳定的组合，补充素材和新受众，再逐步提高投入。',
    tags: ['媒体投放', '数据复盘', '预算优化'],
    tone: 'blue',
  },
]

const caseSlides = [
  {
    type: '已脱敏项目',
    industry: '消费金融 / 东南亚',
    title: '持续测试素材与受众，扩大新用户获取规模。',
    copy: '项目以单组广告系列为单位观察曝光、点击和成本变化，预算逐步集中到稳定组合。',
    image: images.caseDashboard,
    imageAlt: '脱敏后的广告投放数据后台',
    facts: [['600万+', '单组广告系列展示'], ['18.9万+', '单组链接点击'], ['$0.72起', '单次链接点击费用']],
    note: '2025 投放后台数据，账户及客户名称已脱敏。',
  },
  {
    type: '典型服务场景',
    industry: 'B2B 制造 / 欧美',
    title: '把搜索广告、SEO 和询盘页面接成一条路径。',
    copy: '适合产品复杂、决策周期较长的企业。工作从关键词和客户问题开始，再安排页面、内容和广告。',
    image: images.strategyTable,
    imageAlt: '团队讨论海外市场与网站承接策略',
    facts: [['SEARCH', '承接明确需求'], ['CONTENT', '回答采购问题'], ['CRM', '跟进询盘质量']],
    note: '服务场景示意，不代表特定客户项目。',
  },
  {
    type: '典型服务场景',
    industry: '消费品牌 / 东南亚',
    title: '用本地素材测试卖点，再把有效内容放大。',
    copy: '适合需要快速验证内容方向的品牌。每轮测试保留明确变量，方便判断用户回应了什么。',
    image: images.creativeWorkshop,
    imageAlt: '本地化创意素材讨论现场',
    facts: [['INSIGHT', '梳理购买顾虑'], ['CREATIVE', '持续提供变体'], ['LEARN', '按结果更新脚本']],
    note: '服务场景示意，不代表特定客户项目。',
  },
]

export function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeStory, setActiveStory] = useState(0)
  const [caseSwiper, setCaseSwiper] = useState<SwiperType | null>(null)
  const [caseIndex, setCaseIndex] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const timer = window.setInterval(() => setActiveStory((current) => (current + 1) % heroStories.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })

      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.growth-architecture__module')
        gsap.set(cards, { opacity: 0.18, y: 54, scale: 0.96 })
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.growth-architecture',
            start: 'top top',
            end: '+=80%',
            scrub: 0.65,
            pin: '.growth-architecture__stage',
          },
        })
        cards.forEach((card, index) => {
          timeline.to(card, { opacity: 1, y: 0, scale: 1, duration: 1 }, index * 0.72)
          timeline.to(card, { opacity: index === cards.length - 1 ? 1 : 0.45, duration: 0.55 }, index * 0.72 + 0.72)
        })
        timeline.to('.growth-architecture__core', { rotate: 110, scale: 1.08, duration: 2.4 }, 0)
        timeline.to('.growth-architecture__beam', { scaleX: 1, duration: 2.2 }, 0.2)
      })

      gsap.to('.media-network__track--one', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: '.media-network', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.media-network__track--two', {
        xPercent: 24,
        ease: 'none',
        scrollTrigger: { trigger: '.media-network', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      return () => media.revert()
    }, rootRef)

    return () => context.revert()
  }, [])

  const currentStory = heroStories[activeStory]

  return (
    <div ref={rootRef} className="v3-home">
      <Seo
        title="聚核智媒｜全球数字增长伙伴"
        description="聚核智媒为出海企业提供市场判断、本地化创意、海外媒体投放、网站与数据优化服务。"
      />

      <section className="v3-hero" aria-labelledby="home-title">
        <Suspense fallback={<div className="v3-hero__scene-fallback" aria-hidden="true"><i /><i /><i /></div>}>
          <GrowthCoreScene mode={activeStory} className="v3-hero__scene" />
        </Suspense>
        <div className="v3-hero__grid" aria-hidden="true" />
        <div className="v3-hero__content">
          <div className="v3-hero__copy">
            <p className="v3-overline"><Radio size={14} /> CORE REACH MEDIA / CHINA</p>
            <h1 id="home-title">全球数字增长伙伴</h1>
            <div className="v3-hero__statement" key={currentStory.key}>
              <span>{currentStory.key}</span>
              <h2>{currentStory.title}</h2>
              <p>{currentStory.copy}</p>
            </div>
            <div className="v3-actions">
              <Link className="v3-button v3-button--primary" to="/contact">
                讨论你的目标 <ArrowUpRight size={18} />
              </Link>
              <Link className="v3-text-link" to="/cases">
                查看项目数据 <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>

        <div className="v3-hero__story-tabs" role="tablist" aria-label="核心能力">
          {heroStories.map((story, index) => (
            <button
              key={story.key}
              type="button"
              role="tab"
              aria-selected={activeStory === index}
              className={activeStory === index ? 'is-active' : ''}
              onClick={() => setActiveStory(index)}
            >
              <span>0{index + 1}</span>
              <strong>{story.key}</strong>
              <i />
            </button>
          ))}
        </div>
        <a className="v3-hero__scroll" href="#system" aria-label="继续浏览">
          <ArrowDown size={18} />
        </a>
      </section>

      <section className="growth-architecture" id="system">
        <div className="growth-architecture__stage">
          <div className="v3-section-heading growth-architecture__heading">
            <p className="v3-overline">01 / THE GROWTH SYSTEM</p>
            <h2>三个团队动作，<br />围绕一个业务目标。</h2>
            <p>市场判断决定从哪里开始，内容和页面负责承接，投放数据推动下一轮调整。</p>
          </div>

          <div className="growth-architecture__map">
            <div className="growth-architecture__beam" />
            <div className="growth-architecture__core" aria-hidden="true">
              <span>CORE</span>
              <strong>GROWTH</strong>
              <i /><i /><i />
            </div>
            {growthModules.map((module, index) => (
              <article className={`growth-architecture__module growth-architecture__module--${index + 1}`} key={module.key}>
                <div><span>{module.number}</span><small>{module.key}</small></div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <ul>{module.details.map((detail) => <li key={detail}><Check size={13} />{detail}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-scenes">
        <div className="v3-section-heading v3-section-heading--center js-reveal">
          <p className="v3-overline">02 / HOW THE WORK MOVES</p>
          <h2>每一轮工作，都要留下下一轮能用的判断。</h2>
          <p>策略、素材和投放不会各自结束。测试结果会回到页面、内容和预算安排里。</p>
        </div>

        <Swiper
          className="service-scenes__swiper"
          modules={[A11y]}
          slidesPerView="auto"
          spaceBetween={14}
          centeredSlides={false}
          grabCursor
          breakpoints={{ 901: { allowTouchMove: false } }}
        >
          {serviceScenes.map((scene) => (
            <SwiperSlide className={`service-scene service-scene--${scene.tone}`} key={scene.number}>
              <div className="service-scene__visual" aria-hidden="true">
                <div className="service-scene__orbit"><i /><i /><i /></div>
                <span>{scene.number}</span>
              </div>
              <div className="service-scene__copy">
                <p>{scene.label}</p>
                <h3>{scene.title}</h3>
                <div>{scene.copy}</div>
                <ul>{scene.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link className="v3-text-link service-scenes__link" to="/services">查看完整服务 <ArrowRight size={17} /></Link>
      </section>

      <section className="media-network">
        <div className="media-network__header js-reveal">
          <div>
            <p className="v3-overline v3-overline--light">03 / MEDIA ACCESS</p>
            <h2>根据目标选平台，<br />不让渠道替业务做决定。</h2>
          </div>
          <p>我们可以协助 Meta、Google、TikTok 等主流平台的账户与投放工作。相关代理资质可在商务沟通中提供核验。</p>
        </div>

        <div className="media-network__platforms">
          {platforms.map((platform, index) => (
            <article className="media-platform js-reveal" key={platform.name}>
              <span>0{index + 1}</span>
              <div><small>{platform.type}</small><h3>{platform.name}</h3></div>
              <p>{platform.description}</p>
              <ArrowUpRight size={20} />
            </article>
          ))}
        </div>

        <div className="media-network__brand-cloud">
          <div className="media-network__cloud-label">
            <span>服务行业示意</span>
            <small>以下名称用于版式占位，正式上线前替换</small>
          </div>
          <div className="media-network__track media-network__track--one">
            {[...placeholderBrands, ...placeholderBrands].map((brand, index) => <strong key={`${brand}-${index}`}>{brand}</strong>)}
          </div>
          <div className="media-network__track media-network__track--two">
            {[...placeholderBrands].reverse().concat(placeholderBrands).map((brand, index) => <span key={`${brand}-reverse-${index}`}>{brand}</span>)}
          </div>
        </div>
      </section>

      <section className="working-rhythm">
        <div className="working-rhythm__image">
          <img src={images.globalCity} alt="全球市场中的数字业务网络" loading="lazy" />
          <div><CircleCheck size={20} /><span>进展可以看到，问题及时处理</span></div>
        </div>
        <div className="working-rhythm__content">
          <div className="v3-section-heading js-reveal">
            <p className="v3-overline v3-overline--light">04 / WORKING RHYTHM</p>
            <h2>你会知道账户发生了什么，团队准备怎么处理。</h2>
            <p>报告需要给出判断和动作。只有数据截图，没有解释，下一周还是会遇到同一个问题。</p>
          </div>
          <div className="working-rhythm__list">
            {rhythms.map(([en, title, copy], index) => (
              <article className="js-reveal" key={en}>
                <span>0{index + 1}</span>
                <div><small>{en}</small><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-carousel">
        <div className="case-carousel__header">
          <div className="v3-section-heading js-reveal">
            <p className="v3-overline">05 / PROJECT PROOF</p>
            <h2>用项目数据和执行过程说清楚结果。</h2>
          </div>
          <div className="case-carousel__controls">
            <span>{String(caseIndex + 1).padStart(2, '0')} / {String(caseSlides.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => caseSwiper?.slidePrev()} aria-label="上一个项目"><ArrowLeft /></button>
            <button type="button" onClick={() => caseSwiper?.slideNext()} aria-label="下一个项目"><ArrowRight /></button>
          </div>
        </div>

        <Swiper
          className="case-carousel__swiper"
          modules={[A11y]}
          slidesPerView={1}
          spaceBetween={24}
          onSwiper={setCaseSwiper}
          onSlideChange={(swiper) => setCaseIndex(swiper.activeIndex)}
          grabCursor
        >
          {caseSlides.map((project) => (
            <SwiperSlide className="case-slide" key={project.title}>
              <div className="case-slide__image">
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <span>{project.type}</span>
              </div>
              <div className="case-slide__body">
                <p className="v3-overline">{project.industry}</p>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
                <div className="case-slide__facts">
                  {project.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
                </div>
                <small>{project.note}</small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link className="v3-text-link case-carousel__link" to="/cases">查看项目方法 <ArrowRight size={17} /></Link>
      </section>

      <section className="home-contact">
        <div>
          <p className="v3-overline v3-overline--light">06 / START A PROJECT</p>
          <h2>告诉我们目标市场、预算范围和目前遇到的问题。</h2>
          <p>第一次沟通会先确认业务情况。适合做什么、暂时不该做什么，我们会直接说明。</p>
        </div>
        <Link className="v3-button v3-button--signal" to="/contact">提交项目需求 <ArrowUpRight size={19} /></Link>
      </section>
    </div>
  )
}

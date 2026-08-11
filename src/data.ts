import {
  BarChart3,
  Blocks,
  ChartNoAxesCombined,
  Globe2,
  Languages,
  Search,
} from 'lucide-react'

export const services = [
  {
    number: '01',
    title: '海外广告投放',
    en: 'PERFORMANCE MEDIA',
    description: '根据市场阶段安排渠道、预算和测试节奏。账户每天有人看，问题出现时有人处理。',
    points: ['Meta / Google / TikTok', '账户与预算管理', '受众、素材与出价测试'],
    icon: ChartNoAxesCombined,
  },
  {
    number: '02',
    title: '网站与独立站',
    en: 'WEB EXPERIENCE',
    description: '把访客关心的信息放到正确位置，同时接好转化事件、广告像素和分析工具。',
    points: ['信息架构与页面设计', '移动端与加载性能', 'GA4 / Pixel / 事件追踪'],
    icon: Blocks,
  },
  {
    number: '03',
    title: 'SEO 增长',
    en: 'ORGANIC GROWTH',
    description: '围绕真实搜索需求规划页面和内容，让自然流量逐月积累，并能被业务团队继续使用。',
    points: ['技术 SEO 与结构化数据', '关键词与内容集群', '多语言页面建设'],
    icon: Search,
  },
  {
    number: '04',
    title: '创意本地化',
    en: 'LOCAL CREATIVE',
    description: '从当地用户的语言习惯、购买顾虑和内容偏好出发，持续生产可以测试的素材。',
    points: ['市场语境与文化检查', '平面、视频与真人素材', '测试结果驱动素材变体'],
    icon: Languages,
  },
  {
    number: '05',
    title: '数据与增长策略',
    en: 'GROWTH INTELLIGENCE',
    description: '日报处理异常，周报解释变化，月度复盘决定预算和下一轮动作。',
    points: ['市场与账户诊断', '日报、周报与月度复盘', '预算建议与扩量路径'],
    icon: BarChart3,
  },
]

export const growthModules = [
  {
    number: '01',
    key: 'MARKET SIGNAL',
    title: '市场判断',
    description: '先看需求、竞争和进入成本，再决定从哪个市场开始。',
    details: ['市场优先级', '用户需求', '竞争投放'],
  },
  {
    number: '02',
    key: 'CREATIVE ENGINE',
    title: '内容与承接',
    description: '广告素材、网站页面和本地语言使用同一套信息判断。',
    details: ['本地化创意', '网站转化', '素材测试'],
  },
  {
    number: '03',
    key: 'PERFORMANCE LOOP',
    title: '投放与优化',
    description: '让曝光、点击、询盘和成交数据回到下一轮预算决策。',
    details: ['媒体执行', '归因分析', '预算优化'],
  },
]

export const growthSteps = [
  ['01', '市场洞察', '确认优先市场、用户需求和进入成本'],
  ['02', '网站承接', '整理价值表达、页面路径和转化事件'],
  ['03', '流量获取', '覆盖高意图搜索和目标受众'],
  ['04', '内容转化', '持续测试当地用户愿意回应的素材'],
  ['05', '数据优化', '根据业务结果调整预算和动作'],
]

export const rhythms = [
  ['DAILY', '日报与异常', '同步消耗、结果和当天需要处理的问题'],
  ['WEEKLY', '周度优化', '复盘渠道、受众和素材，明确下周测试'],
  ['MONTHLY', '月度复盘', '判断趋势、预算效率和下一阶段目标'],
  ['QUARTERLY', '季度规划', '更新市场、竞品和业务增长计划'],
]

export const markets = ['东南亚', '中东', '欧美', '拉美', '日韩']

export const platforms = [
  { name: 'Meta', type: '社交广告', description: '覆盖兴趣人群、再营销和需求培育' },
  { name: 'Google Ads', type: '搜索与展示', description: '承接明确搜索需求并扩大有效覆盖' },
  { name: 'TikTok for Business', type: '短视频广告', description: '用本地内容快速测试人群和创意' },
  { name: 'Instagram', type: '视觉内容', description: '建立品牌认知并连接内容消费场景' },
]

// Fictional names used only as layout placeholders until approved client logos are supplied.
export const placeholderBrands = ['NORTHLINE', 'VELA HOME', 'MORROW', 'KITEPAY', 'ASTER LABS', 'NORI SKIN']

export const processSteps = [
  ['01', '增长诊断', '把业务目标、目标市场和现有获客链路放在一张表里。'],
  ['02', '试点方案', '确定周期、预算、渠道、素材数量和衡量指标。'],
  ['03', '上线验证', '测试受众、创意、页面和转化事件，及时处理异常。'],
  ['04', '规模增长', '预算向有效组合集中，同时补充素材和新受众。'],
  ['05', '长期协作', '复盘结果、保存有效资产，进入下一轮增长计划。'],
]

export const companyValues = [
  { icon: Globe2, title: '理解市场差异', text: '不同地区的渠道、语言和用户顾虑需要分别判断。' },
  { icon: BarChart3, title: '用结果做决定', text: '报告需要解释变化，并明确预算和动作怎么调整。' },
  { icon: Blocks, title: '把环节接起来', text: '广告、网站、内容和数据使用同一套目标。' },
]

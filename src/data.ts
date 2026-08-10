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
    en: 'PAID MEDIA',
    description: '围绕市场、受众、素材与转化目标，持续测试并放大高效组合。',
    points: ['Meta / Google / TikTok', '账户运营与预算管理', '素材、受众与出价测试'],
    icon: ChartNoAxesCombined,
  },
  {
    number: '02',
    title: '网站与独立站',
    en: 'WEB EXPERIENCE',
    description: '把网站建设成流量承接、数据采集和询盘转化的增长基础设施。',
    points: ['信息架构与体验设计', '移动端与性能优化', 'GA4 / Pixel / 事件追踪'],
    icon: Blocks,
  },
  {
    number: '03',
    title: 'SEO 增长',
    en: 'ORGANIC GROWTH',
    description: '以技术基础、内容资产和行业权威，积累可持续的自然流量。',
    points: ['技术 SEO 与结构化数据', '关键词与内容集群', '多语言页面与权威建设'],
    icon: Search,
  },
  {
    number: '04',
    title: '创意本地化',
    en: 'LOCAL CREATIVE',
    description: '不止翻译素材，而是重构当地用户愿意回应的内容表达。',
    points: ['市场语境与文化风险', '平面、视频与真人素材', '测试结果驱动素材变体'],
    icon: Languages,
  },
  {
    number: '05',
    title: '数据与增长策略',
    en: 'GROWTH INTELLIGENCE',
    description: '让数据进入下一轮决策，持续校准预算、渠道和转化路径。',
    points: ['增长诊断与区域判断', '日报、周报与月度复盘', '预算建议与规模化路径'],
    icon: BarChart3,
  },
]

export const growthSteps = [
  ['01', '市场洞察', '识别优先区域、用户需求与进入路径'],
  ['02', '网站承接', '把价值表达和转化路径放在同一个体验里'],
  ['03', '流量获取', '用付费媒体与自然搜索覆盖高价值需求'],
  ['04', '内容转化', '用本地化创意提高点击与响应效率'],
  ['05', '数据优化', '让真实结果决定下一轮预算和动作'],
]

export const rhythms = [
  ['DAILY', '日报与异常', '消耗、结果、关键动作及时同步'],
  ['WEEKLY', '周度优化', '渠道、受众、素材与下周计划'],
  ['MONTHLY', '月度复盘', '趋势、预算、目标和结构化建议'],
  ['QUARTERLY', '季度规划', '行业变化、竞品研究与阶段策略'],
]

export const markets = ['东南亚', '中东', '欧美', '拉美', '日韩']
export const platforms = ['META', 'GOOGLE', 'TIKTOK', 'INSTAGRAM']

export const processSteps = [
  ['01', '增长诊断', '理解业务目标、市场现状和现有获客链路。'],
  ['02', '试点方案', '明确周期、预算、渠道和关键衡量指标。'],
  ['03', '上线验证', '测试受众、创意、页面和转化事件。'],
  ['04', '规模增长', '预算向高效组合集中，持续扩展素材和人群。'],
  ['05', '长期共创', '复盘结果、沉淀资产并进入下一轮增长。'],
]

export const companyValues = [
  { icon: Globe2, title: '全球视野', text: '理解不同市场的媒介环境、文化语境与用户决策。' },
  { icon: BarChart3, title: '结果导向', text: '所有策略最终回到可衡量的流量、询盘与商业结果。' },
  { icon: Blocks, title: '系统协同', text: '广告、网站、SEO、创意和数据围绕同一目标工作。' },
]

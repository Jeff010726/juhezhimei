import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'offline' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
    if (!endpoint) {
      setStatus('offline')
      return
    }
    setStatus('sending')
    try {
      const payload = Object.fromEntries(new FormData(form).entries())
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!response.ok) throw new Error('submit failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo title="联系我们｜聚核智媒" description="联系聚核智媒，讨论海外广告投放、网站建设、SEO、本地化创意和全球增长需求。" />
      <PageHero eyebrow="LET'S TALK" index="04" title="从一次增长诊断开始。" intro="告诉我们你的业务目标、目标市场和当前挑战，我们会据此梳理最值得优先验证的增长路径。" image="/images/hero-earth.webp" />

      <section className="contact-section">
        <div className="contact-section__intro">
          <p className="eyebrow">PROJECT INQUIRY</p>
          <h2>让我们了解你的项目。</h2>
          <p>提交基本信息后，项目顾问将结合目标市场、业务阶段和现有资源进行初步判断。</p>
          <div className="contact-details">
            <div><span>官方网站</span><strong>____________________</strong></div>
            <div><span>联系电话</span><strong>____________________</strong></div>
            <div><span>电子邮箱</span><strong>____________________</strong></div>
            <div><span>公司地址</span><strong>____________________</strong></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label><span>公司名称 *</span><input name="company" required autoComplete="organization" placeholder="请输入公司名称" /></label>
          <div className="form-row">
            <label><span>姓名 *</span><input name="name" required autoComplete="name" placeholder="您的姓名" /></label>
            <label><span>联系电话 *</span><input name="phone" required autoComplete="tel" placeholder="手机或微信" /></label>
          </div>
          <div className="form-row">
            <label><span>目标市场</span><input name="market" placeholder="例如：东南亚 / 欧美" /></label>
            <label><span>主要需求 *</span><select name="service" required defaultValue=""><option value="" disabled>请选择</option><option>海外广告投放</option><option>网站与独立站</option><option>SEO 增长</option><option>创意本地化</option><option>全链路增长服务</option></select></label>
          </div>
          <label><span>项目情况 *</span><textarea name="message" required rows={5} placeholder="业务类型、目标、目前遇到的问题，以及预期启动时间" /></label>
          <label className="consent"><input type="checkbox" required name="consent" /><span>我同意聚核智媒仅将以上信息用于本次业务沟通。</span></label>
          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? '正在提交' : '提交咨询'} <ArrowUpRight size={19} /></button>
          {status === 'success' && <p className="form-status form-status--success"><CheckCircle2 />咨询已提交，我们会尽快与你联系。</p>}
          {status === 'offline' && <p className="form-status">在线提交接口尚未配置，请通过上方预留联系方式与我们联系。</p>}
          {status === 'error' && <p className="form-status">提交未完成，请稍后重试。</p>}
        </form>
      </section>
    </>
  )
}

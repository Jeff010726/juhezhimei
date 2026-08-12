import { motion } from 'motion/react'

type Props = {
  eyebrow: string
  title: string
  intro: string
  image: string
  index: string
}

export function PageHero({ eyebrow, title, intro, image, index }: Props) {
  return (
    <section className="page-hero">
      <img src={image} alt="" aria-hidden="true" />
      <div className="page-hero__shade" />
      <motion.div className="page-hero__content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
        <div className="page-hero__meta"><span>{eyebrow}</span><span>{index} / 04</span></div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </motion.div>
    </section>
  )
}

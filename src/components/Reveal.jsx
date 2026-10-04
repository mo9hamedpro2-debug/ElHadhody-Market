import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** ظهور هادي للعناصر أول ما تدخل الشاشة. */
export default function Reveal({ children, delay = 0, y = 18, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, children, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <Reveal className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow mb-2">
            <span className="h-[3px] w-6 rounded-full bg-lime" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-[28px] font-black leading-[1.25] text-forest-950 sm:text-[36px]">{title}</h2>
        {children && <p className="mt-2 text-[15px] leading-7 text-muted sm:text-base">{children}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  )
}

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ProductImage from './ProductImage'
import { SectionHeading } from './Reveal'
import { CATEGORIES, PRODUCTS } from '../data/catalog'
import { productsLabel } from '../lib/format'

const counts = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {})

export default function Categories({ active, onCategory }) {
  return (
    <section id="categories" className="py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading eyebrow="الأقسام" title="كل حاجة في مكانها">
          اختار القسم وهتلاقي منتجاته قدامك على طول.
        </SectionHeading>

        <motion.ul
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(0,210px))]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {CATEGORIES.map((c, i) => {
            const big = i === 0
            const isActive = active === c.id
            return (
              <motion.li
                key={c.id}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
                className={big ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => onCategory(c.id)}
                  aria-pressed={isActive}
                  className={`group relative block size-full overflow-hidden rounded-[22px] text-start ring-offset-2 ring-offset-cream transition-shadow ${
                    big ? 'aspect-[16/10] md:aspect-auto' : 'aspect-[4/3.6] md:aspect-auto'
                  } ${isActive ? 'ring-[3px] ring-lime' : 'hover:shadow-lift'}`}
                >
                  <ProductImage
                    id={c.image}
                    category={c.id}
                    alt=""
                    width={big ? 640 : 420}
                    height={big ? 760 : 380}
                    className="absolute inset-0"
                    imgClassName="group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(to_top,rgb(15_42_28/0.86)_0%,rgb(15_42_28/0.25)_48%,transparent_75%)]" aria-hidden="true" />
                  <span className="absolute top-3 start-3 grid size-9 place-items-center rounded-xl bg-cream/95 text-forest shadow-soft">
                    <c.icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <span>
                      <span className={`block font-black text-cream ${big ? 'text-[24px] sm:text-[28px]' : 'text-[17px] sm:text-[19px]'}`}>{c.name}</span>
                      <span className="mt-0.5 block text-[12.5px] font-medium text-cream/75 sm:text-[13px]">
                        {big ? c.blurb + ' · ' : ''}{productsLabel(counts[c.id] || 0)}
                      </span>
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime text-forest-950 transition-transform duration-300 group-hover:-translate-x-1">
                      <ArrowLeft className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

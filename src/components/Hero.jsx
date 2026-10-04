import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import ProductImage from './ProductImage'
import { CATEGORIES, unsplash } from '../data/catalog'
import { scrollToId } from '../lib/format'

const EASE = [0.22, 1, 0.36, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
})

const LIST = [
  { t: 'عيش وجبنة', done: true },
  { t: 'لبن للفطار', done: true },
  { t: 'طماطم وخيار', done: false },
  { t: 'شاي وسكر', done: false },
]

const QUICK = ['produce', 'dairy', 'pantry', 'cleaning']

function ShoppingNote() {
  return (
    <div className="w-[190px] -rotate-[4deg] rounded-[14px] bg-paper p-4 pb-3 shadow-lift sm:w-[210px]">
      <div className="mb-2 flex items-center justify-between border-b border-dashed border-line pb-2">
        <span className="font-hand text-[22px] leading-none text-forest">طلبات البيت</span>
        <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
      </div>
      <ul className="space-y-1.5">
        {LIST.map((i) => (
          <li key={i.t} className="flex items-center gap-2 text-[14px]">
            <span className={`grid size-4 shrink-0 place-items-center rounded-[5px] border ${i.done ? 'border-forest bg-forest text-lime' : 'border-line bg-cream'}`}>
              {i.done && <Check className="size-3" strokeWidth={3.2} />}
            </span>
            <span className={`font-hand text-[17px] leading-6 ${i.done ? 'text-muted line-through decoration-orange/70' : 'text-ink'}`}>{i.t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Stamp() {
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
      <defs>
        {/* قوس علوي مع عقارب الساعة، وقوس سفلي عكسها علشان الكلام يتقري معدول */}
        <path id="stamp-top" d="M14,60 a46,46 0 0,1 92,0" />
        <path id="stamp-bottom" d="M10,60 a50,50 0 0,0 100,0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--color-lime)" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="var(--color-forest)" strokeOpacity="0.25" />
      <circle cx="10.5" cy="60" r="2" fill="var(--color-forest)" />
      <circle cx="109.5" cy="60" r="2" fill="var(--color-forest)" />
      <text fontSize="13" fontWeight="900" fill="var(--color-forest-950)" fontFamily="Cairo">
        <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">الهدهودي ماركت</textPath>
      </text>
      <text fontSize="11" fontWeight="700" fill="var(--color-forest-950)" fontFamily="Cairo">
        <textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">احتياجات بيتك</textPath>
      </text>
      <g transform="translate(44 40)" fill="var(--color-forest)">
        <path d="M8 6c-1-4 0-7 2-9 .7 3 .7 6-2 9zM14 5.5c-.6-4.5.6-7.7 3.2-9.6 0 3.8-.6 6.4-3.2 9.6zM19 6c.6-3.8 2.6-5.8 5.2-7-.6 3.2-2 5.8-5.2 7z" />
        <path d="M2 9h28l-3 15a3 3 0 0 1-3 2.4H8A3 3 0 0 1 5 24z" />
      </g>
    </svg>
  )
}

export default function Hero({ onCategory }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-10 pt-8 pb-14 sm:pt-12 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pt-14 lg:pb-20">
        {/* النص */}
        <div className="relative z-10 max-w-[560px]">
          <motion.p {...rise(0.05)} className="eyebrow mb-5">
            <span className="h-[3px] w-6 rounded-full bg-lime" aria-hidden="true" />
            سوبر ماركت الحي، بشكل أقرب ليك
          </motion.p>
          <motion.h1 {...rise(0.12)} className="text-[40px] font-black leading-[1.18] text-forest-950 sm:text-[54px] lg:text-[62px]">
            كل احتياجات بيتك{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">في مكان واحد</span>
              <motion.svg
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-1 h-[0.42em] w-full text-lime"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 16 C 70 6, 150 4, 296 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="11"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                />
              </motion.svg>
            </span>
          </motion.h1>
          <motion.p {...rise(0.2)} className="mt-6 max-w-[480px] text-[17px] leading-8 text-muted sm:text-lg sm:leading-9">
            اكتشف منتجاتك اليومية، اختار اللي محتاجه، وجهّز طلبك بسهولة.
          </motion.p>
          <motion.div {...rise(0.28)} className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <button type="button" onClick={() => scrollToId('products')} className="btn btn-primary group h-[52px] px-4 sm:px-6">
              تسوّق المنتجات
              <ArrowLeft className="size-[18px] transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollToId('categories')} className="btn btn-ghost h-[52px] px-4 sm:px-6">
              اكتشف الأقسام
            </button>
          </motion.div>

          <motion.div {...rise(0.36)} className="mt-10 border-t border-line pt-5">
            <p className="mb-3 text-[13px] font-bold text-muted">تسوّق سريع</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {QUICK.map((id) => {
                const c = CATEGORIES.find((x) => x.id === id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onCategory(id)}
                    className="group flex items-center gap-2.5 rounded-xl text-[14.5px] font-bold text-forest-950"
                  >
                    <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-paper shadow-soft">
                      <img src={unsplash(c.image, 96, 96)} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-110" loading="eager" />
                    </span>
                    <span className="border-b-2 border-transparent transition-colors group-hover:border-lime">{c.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* التكوين البصري */}
        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <div className="relative aspect-[4/4.1] sm:aspect-[5/4.6]">
            {/* بلوك أخضر خلف الصورة */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="absolute inset-y-[6%] start-[8%] end-0 overflow-hidden rounded-[34px] bg-forest"
              aria-hidden="true"
            >
              <svg className="absolute inset-0 size-full text-forest-700/70" aria-hidden="true">
                <defs>
                  <pattern id="hero-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.4" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-dots)" />
              </svg>
            </motion.div>

            {/* الصورة الرئيسية */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="absolute top-0 bottom-[12%] start-[18%] end-[6%]"
            >
              <ProductImage
                id="1588964895597-cfccd6e2dbf9"
                category="produce"
                alt="أكياس مشتريات ورق فيها عيش وتفاح وموز وكرنب"
                width={760}
                height={820}
                eager
                className="size-full rounded-[28px] shadow-lift"
              />
            </motion.div>

            {/* صورة فرعية: سلة خضار */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
              className="absolute bottom-0 start-0 w-[40%] rounded-[24px] bg-cream p-[6px] shadow-lift"
            >
              <ProductImage
                id="1760445529436-25510c869789"
                category="produce"
                alt="سلة خشب مليانة طماطم وجزر وخضار طازة"
                width={360}
                height={420}
                eager
                className="aspect-[6/7] w-full rounded-[19px]"
              />
            </motion.div>

            {/* ورقة الطلبات */}
            <motion.div
              initial={{ opacity: 0, y: -14, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
              className="absolute top-[7%] start-0 sm:start-[2%]"
            >
              <ShoppingNote />
            </motion.div>

            {/* ختم */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              className="absolute bottom-[3%] end-[1%] size-[92px] sm:size-[112px]"
            >
              <Stamp />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

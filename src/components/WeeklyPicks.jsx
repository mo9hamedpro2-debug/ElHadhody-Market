import { Info } from 'lucide-react'
import ProductImage from './ProductImage'
import Reveal from './Reveal'
import { AddToCart, OfferBadge, Price } from './ProductCard'
import { PRODUCTS, categoryById } from '../data/catalog'

const PICKS = PRODUCTS.filter((p) => p.featured)

function FeatureCard({ product }) {
  return (
    <article className="group grid h-full overflow-hidden rounded-[26px] bg-paper sm:grid-cols-[1.05fr_1fr]">
      <div className="relative min-h-[260px]">
        <ProductImage
          id={product.image}
          category={product.category}
          alt={product.name}
          width={620}
          height={640}
          className="absolute inset-0"
          imgClassName="group-hover:scale-[1.04]"
        />
        <OfferBadge product={product} className="absolute top-4 start-4 text-[13px]" />
      </div>
      <div className="flex flex-col p-6 sm:p-7">
        <p className="text-[13px] font-bold text-forest-700">{categoryById[product.category].name}</p>
        <h3 className="mt-1 text-[26px] font-black leading-tight text-forest-950">{product.name}</h3>
        <p className="mt-1 text-[14px] text-muted">{product.size}</p>
        <p className="mt-4 text-[15px] leading-7 text-muted">
          من أساسيات كل مطبخ، وموجود ضمن اختيارات الأسبوع كمثال لطريقة عرض العروض على الموقع.
        </p>
        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-end justify-between gap-2">
            <Price product={product} large />
            <span className="demo-tag">عرض تجريبي</span>
          </div>
          <AddToCart product={product} size="lg" />
        </div>
      </div>
    </article>
  )
}

function CompactCard({ product }) {
  return (
    <article className="group flex h-full gap-4 rounded-[20px] bg-paper p-3 pe-4">
      <div className="relative w-[112px] shrink-0 sm:w-[128px]">
        <ProductImage
          id={product.image}
          category={product.category}
          alt={product.name}
          width={260}
          height={260}
          className="size-full min-h-[128px] rounded-[14px]"
          imgClassName="group-hover:scale-[1.06]"
        />
        <OfferBadge product={product} className="absolute top-2 start-2 !px-1.5 !py-0.5 !text-[11px]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-extrabold leading-6 text-forest-950">{product.name}</h3>
          <span className="demo-tag shrink-0">تجريبي</span>
        </div>
        <p className="text-[13px] text-muted">{product.size}</p>
        <div className="mt-auto pt-2">
          <div className="mb-2"><Price product={product} /></div>
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  )
}

export default function WeeklyPicks() {
  const [first, ...rest] = PICKS
  return (
    <section id="offers" className="bg-forest py-16 text-cream sm:py-20">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-[13px] font-bold text-lime">
              <span className="h-[3px] w-6 rounded-full bg-orange" aria-hidden="true" />
              عروض مختارة
            </p>
            <h2 className="text-[30px] font-black leading-tight sm:text-[40px]">اختيارات الأسبوع</h2>
            <p className="mt-2 text-[15px] leading-7 text-cream/70 sm:text-base">
              منتجات بنرشّحها للبيت الأسبوع ده، بأسعار متوضّحة قبل وبعد العرض.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="flex max-w-sm items-start gap-2 rounded-xl border border-cream/15 px-4 py-3 text-[13px] leading-6 text-cream/75">
              <Info className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
              العروض والأسعار هنا توضيحية لعرض شكل الموقع، ومش عروض حقيقية للمحل.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 text-ink lg:grid-cols-[1.35fr_1fr]">
          <Reveal>{first && <FeatureCard product={first} />}</Reveal>
          <div className="grid gap-4">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={0.08 * (i + 1)}>
                <CompactCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

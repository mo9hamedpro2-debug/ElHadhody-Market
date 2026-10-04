import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBasket } from 'lucide-react'
import ProductImage from './ProductImage'
import { useCart } from '../context/CartContext'
import { discountPercent } from '../data/catalog'
import { egp, num } from '../lib/format'

/** زرار الإضافة: بيتحول لعدّاد كمية لما المنتج يبقى في السلة. */
export function AddToCart({ product, size = 'md' }) {
  const { items, add, setQty } = useCart()
  const qty = items[product.id] || 0
  const h = size === 'lg' ? 'h-12' : 'h-11'

  return (
    <div className={`relative ${h}`}>
      <AnimatePresence initial={false} mode="wait">
        {qty === 0 ? (
          <motion.button
            key="add"
            type="button"
            onClick={() => add(product.id)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            aria-label={`أضف ${product.name} للسلة`}
            className={`flex ${h} w-full items-center justify-center gap-2 rounded-xl border border-forest/15 bg-forest-100/70 text-[14.5px] font-bold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream active:scale-[0.97]`}
          >
            <ShoppingBasket className="size-[17px]" aria-hidden="true" />
            أضف للسلة
          </motion.button>
        ) : (
          <motion.div
            key="qty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className={`flex ${h} w-full items-center justify-between rounded-xl bg-forest p-1 text-cream`}
          >
            <button
              type="button"
              onClick={() => add(product.id)}
              aria-label={`زوّد كمية ${product.name}`}
              className="grid aspect-square h-full place-items-center rounded-lg transition-colors hover:bg-forest-700 active:scale-90"
            >
              <Plus className="size-4" />
            </button>
            <span className="text-[15px] font-extrabold" aria-live="polite">
              {num(qty)} <span className="hidden text-[12px] font-semibold text-cream/70 min-[400px]:inline">في السلة</span>
            </span>
            <button
              type="button"
              onClick={() => setQty(product.id, qty - 1)}
              aria-label={`قلّل كمية ${product.name}`}
              className="grid aspect-square h-full place-items-center rounded-lg transition-colors hover:bg-forest-700 active:scale-90"
            >
              <Minus className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Price({ product, large = false }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`font-black text-forest-950 ${large ? 'text-[26px]' : 'text-[19px]'}`}>{egp(product.price)}</span>
      {product.oldPrice && (
        <span className={`font-semibold text-muted line-through decoration-orange/80 ${large ? 'text-[15px]' : 'text-[13px]'}`}>
          {egp(product.oldPrice)}
        </span>
      )}
    </div>
  )
}

export function OfferBadge({ product, className = '' }) {
  const d = discountPercent(product)
  if (!d) return null
  return (
    <span className={`inline-flex items-center rounded-lg bg-orange px-2 py-1 text-[12px] font-extrabold text-white shadow-soft ${className}`}>
      وفّر {num(d)}٪
    </span>
  )
}

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line/80 bg-paper transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line hover:shadow-lift">
      <div className="relative">
        <ProductImage
          id={product.image}
          category={product.category}
          alt={product.name}
          width={420}
          height={340}
          sizes="(min-width: 1024px) 280px, 50vw"
          className="aspect-[5/4] w-full"
          imgClassName="group-hover:scale-[1.05]"
        />
        <OfferBadge product={product} className="absolute top-3 start-3" />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-[15.5px] font-extrabold leading-6 text-forest-950 sm:text-base">{product.name}</h3>
        <p className="mt-0.5 text-[13px] font-medium text-muted">{product.size}</p>
        <div className="mt-auto pt-3">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
            <Price product={product} />
            <span className="demo-tag shrink-0">سعر تجريبي</span>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  )
}

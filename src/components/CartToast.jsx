import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { productById } from '../data/catalog'

/** إشعار صغير لما منتج يتضاف للسلة. */
export default function CartToast() {
  const { lastAdded, dismissToast, open, isOpen } = useCart()

  useEffect(() => {
    if (!lastAdded) return
    const t = setTimeout(dismissToast, 2600)
    return () => clearTimeout(t)
  }, [lastAdded, dismissToast])

  const product = lastAdded && productById[lastAdded.id]
  const show = product && !isOpen

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {show && (
          <motion.div
            key={lastAdded.at}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-forest-950 py-2.5 ps-3 pe-2.5 text-cream shadow-lift"
          >
            <span className="grid size-7 place-items-center rounded-lg bg-lime text-forest-950">
              <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="text-[14px] font-semibold">
              اتضاف <strong className="font-extrabold">{product.name}</strong> للسلة
            </span>
            <button
              type="button"
              onClick={() => {
                dismissToast()
                open()
              }}
              className="rounded-lg bg-cream/10 px-3 py-1.5 text-[13px] font-bold text-lime hover:bg-cream/20"
            >
              عرض السلة
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

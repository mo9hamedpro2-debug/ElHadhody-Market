import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CircleAlert, Copy, Info, MessageCircle, Minus, Plus, ShoppingBasket, Trash2, X } from 'lucide-react'
import ProductImage from './ProductImage'
import { useCart } from '../context/CartContext'
import { isWhatsAppConfigured } from '../config/store'
import { buildOrderMessage, whatsappUrl } from '../lib/whatsapp'
import { egp, num, productsLabel, scrollToId } from '../lib/format'

function CartLine({ line }) {
  const { setQty, remove, add } = useCart()
  const { product, qty, total } = line
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
      className="flex gap-3 border-b border-line/70 py-4 last:border-0"
    >
      <ProductImage id={product.image} category={product.category} alt={product.name} width={160} height={160} className="size-[76px] shrink-0 rounded-xl" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-extrabold text-forest-950">{product.name}</p>
            <p className="text-[12.5px] text-muted">{product.size} · {egp(product.price)} للوحدة</p>
          </div>
          <button
            type="button"
            onClick={() => remove(product.id)}
            aria-label={`شيل ${product.name} من السلة`}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-orange-100 hover:text-orange-700"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex h-9 items-center rounded-lg border border-line bg-paper">
            <button type="button" onClick={() => add(product.id)} aria-label={`زوّد ${product.name}`} className="grid h-full w-9 place-items-center rounded-s-lg hover:bg-cream-200 active:scale-90">
              <Plus className="size-3.5" />
            </button>
            <span className="min-w-8 text-center text-[14px] font-extrabold" aria-label={`الكمية ${num(qty)}`}>{num(qty)}</span>
            <button type="button" onClick={() => setQty(product.id, qty - 1)} aria-label={`قلّل ${product.name}`} className="grid h-full w-9 place-items-center rounded-e-lg hover:bg-cream-200 active:scale-90">
              <Minus className="size-3.5" />
            </button>
          </div>
          <span className="text-[15px] font-black text-forest-950">{egp(total)}</span>
        </div>
      </div>
    </motion.li>
  )
}

function OrderPreview({ message, onBack }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = message
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-5 py-5">
      <div className="flex items-start gap-3 rounded-2xl border border-orange/30 bg-orange-100/70 p-4">
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-orange-700" aria-hidden="true" />
        <div className="text-[13.5px] leading-6 text-ink">
          <p className="font-extrabold">رقم واتساب المحل لسه مش متظبط</p>
          <p className="mt-1 text-muted">
            علشان كده الرسالة مش هتتبعت لأي حد. الطلب الفعلي محتاج رقم واتساب معتمد من صاحب المحل وأسعار متأكدة.
            دي معاينة للرسالة اللي هتتبعت للمحل لما الرقم يتضاف.
          </p>
        </div>
      </div>
      <p className="mt-5 mb-2 text-[13px] font-bold text-muted">معاينة رسالة الطلب</p>
      <pre className="whitespace-pre-wrap rounded-2xl border border-line bg-paper p-4 font-sans text-[14px] leading-7 text-ink">{message}</pre>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={copy} className="btn btn-primary h-11 flex-1">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'اتنسخت' : 'انسخ الرسالة'}
        </button>
        <button type="button" onClick={onBack} className="btn btn-ghost h-11">رجوع للسلة</button>
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const cart = useCart()
  const { isOpen, close, lines, count, subtotal, savings, clear } = cart
  const [preview, setPreview] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      setPreview(false)
      setConfirmClear(false)
      return
    }
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  const message = buildOrderMessage(lines, subtotal)

  const orderViaWhatsApp = () => {
    const url = whatsappUrl(message)
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
    else setPreview(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div className="absolute inset-0 bg-forest-950/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="سلة المشتريات"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 flex w-full max-w-[440px] flex-col bg-cream shadow-lift"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="text-[20px] font-black text-forest-950">{preview ? 'تجهيز الطلب' : 'سلّتك'}</h2>
                <p className="text-[13px] text-muted">{count ? productsLabel(count) : 'السلة فاضية'}</p>
              </div>
              <button ref={closeRef} type="button" onClick={close} aria-label="إغلاق السلة" className="grid size-10 place-items-center rounded-xl hover:bg-cream-200">
                <X className="size-5" />
              </button>
            </header>

            {preview ? (
              <OrderPreview message={message} onBack={() => setPreview(false)} />
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid size-16 place-items-center rounded-2xl bg-forest-100 text-forest">
                  <ShoppingBasket className="size-8" aria-hidden="true" />
                </span>
                <p className="mt-4 text-[19px] font-black text-forest-950">سلتك لسه فاضية</p>
                <p className="mt-1 text-[14.5px] leading-7 text-muted">اختار اللي محتاجه من المنتجات وهيظهر هنا.</p>
                <button
                  type="button"
                  onClick={() => {
                    close()
                    setTimeout(() => scrollToId('products'), 80)
                  }}
                  className="btn btn-primary mt-6"
                >
                  تصفّح المنتجات
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  <ul>
                    <AnimatePresence initial={false}>
                      {lines.map((l) => <CartLine key={l.product.id} line={l} />)}
                    </AnimatePresence>
                  </ul>
                  <div className="pb-4 text-start">
                    {confirmClear ? (
                      <div className="flex items-center gap-2 text-[13.5px]">
                        <span className="text-muted">تفضّي السلة كلها؟</span>
                        <button type="button" onClick={() => { clear(); setConfirmClear(false) }} className="rounded-lg px-2 py-1 font-bold text-orange-700 hover:bg-orange-100">أيوه، فضّيها</button>
                        <button type="button" onClick={() => setConfirmClear(false)} className="rounded-lg px-2 py-1 font-bold text-muted hover:bg-cream-200">لأ</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setConfirmClear(true)} className="rounded-lg px-2 py-1 text-[13.5px] font-bold text-muted hover:bg-cream-200 hover:text-ink">
                        تفضية السلة
                      </button>
                    )}
                  </div>
                </div>

                <footer className="border-t border-line bg-paper px-5 pt-4 pb-5">
                  <dl className="space-y-1.5 text-[14.5px]">
                    <div className="flex justify-between">
                      <dt className="text-muted">عدد القطع</dt>
                      <dd className="font-bold">{num(count)}</dd>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-muted">توفير العروض التجريبية</dt>
                        <dd className="font-bold text-orange-700">{egp(savings)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted">رسوم التوصيل</dt>
                      <dd className="font-semibold text-muted">تتحدد من المحل</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-dashed border-line pt-2.5">
                      <dt className="font-extrabold text-forest-950">الإجمالي المبدئي</dt>
                      <dd className="text-[22px] font-black text-forest-950">{egp(subtotal)}</dd>
                    </div>
                  </dl>
                  <button type="button" onClick={orderViaWhatsApp} className="btn btn-primary mt-4 h-[52px] w-full">
                    <MessageCircle className="size-5" aria-hidden="true" />
                    {isWhatsAppConfigured() ? 'اطلب عن طريق واتساب' : 'جهّز رسالة الطلب لواتساب'}
                  </button>
                  <p className="mt-3 flex items-start gap-2 text-[12px] leading-5 text-muted">
                    <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                    نسخة تجريبية: الأسعار للعرض فقط والموقع مش بينفّذ أي عملية شراء أو دفع.
                    الطلب الحقيقي محتاج رقم المحل المعتمد وتأكيد الأسعار.
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

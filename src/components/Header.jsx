import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ShoppingBasket, X, Info } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'
import { num, productsLabel, scrollToId } from '../lib/format'
import { CATEGORIES } from '../data/catalog'
import { NAV_LINKS } from '../data/nav'

export function AnnouncementBar() {
  return (
    <div className="bg-forest-950 text-cream/85">
      <div className="container-x flex h-9 items-center justify-center gap-2 text-center text-[12.5px] font-medium sm:text-[13px]">
        <span className="size-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
        <p className="truncate">
          تصفّح الأقسام واختار احتياجاتك براحتك
          <span className="mx-2 hidden text-cream/35 sm:inline">|</span>
          <span className="hidden text-cream/60 sm:inline">نسخة تجريبية لعرض فكرة الموقع</span>
        </p>
      </div>
    </div>
  )
}

function SearchField({ query, onQuery, onSubmit, id }) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="group relative flex-1"
    >
      <label htmlFor={id} className="sr-only">ابحث عن منتج</label>
      <Search className="pointer-events-none absolute start-4 top-1/2 size-[18px] -translate-y-1/2 text-muted transition-colors group-focus-within:text-forest" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="بتدوّر على إيه النهارده؟ لبن، رز، منظفات…"
        autoComplete="off"
        enterKeyHint="search"
        className="h-12 w-full rounded-xl border border-line bg-paper ps-11 pe-4 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] outline-none focus:border-forest/40 focus:shadow-[0_0_0_4px_rgb(185_213_74/0.35)] [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => onQuery('')}
          aria-label="مسح البحث"
          className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-cream-200 hover:text-ink"
        >
          <X className="size-4" />
        </button>
      )}
    </form>
  )
}

function CartButton() {
  const { count, open } = useCart()
  return (
    <button
      type="button"
      onClick={open}
      aria-label={count ? `فتح السلة، فيها ${productsLabel(count)}` : 'فتح السلة، السلة فاضية'}
      className="relative inline-flex h-12 items-center gap-2 rounded-xl bg-forest px-3.5 text-cream transition-colors hover:bg-forest-900 active:scale-[0.97] sm:px-4"
    >
      <ShoppingBasket className="size-5" aria-hidden="true" />
      <span className="hidden text-[15px] font-bold sm:inline">السلة</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 22 }}
          className={`grid h-6 min-w-6 place-items-center rounded-md px-1 text-[13px] font-extrabold ${count ? 'bg-lime text-forest-950' : 'bg-forest-700 text-cream/70'}`}
          aria-hidden="true"
        >
          {num(count)}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function MobileMenu({ open, onClose, onCategory }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const go = (id) => {
    onClose()
    setTimeout(() => scrollToId(id), 60)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <motion.div
            className="absolute inset-0 bg-forest-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="القائمة"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col bg-cream shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo compact />
              <button type="button" onClick={onClose} aria-label="إغلاق القائمة" className="grid size-10 place-items-center rounded-xl text-ink hover:bg-cream-200">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button type="button" onClick={() => go(l.id)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-start text-[17px] font-bold text-forest-950 hover:bg-cream-200">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 mb-2 px-3 text-[13px] font-bold text-muted">تسوّق حسب القسم</p>
              <ul className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onCategory(c.id)
                      }}
                      className="flex w-full items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 text-start text-[14px] font-semibold text-ink hover:border-forest/30"
                    >
                      <c.icon className="size-4 shrink-0 text-forest-700" aria-hidden="true" />
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-start gap-2 border-t border-line px-5 py-4 text-[12px] leading-5 text-muted">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              نسخة تجريبية: الأسعار والعروض للعرض فقط ومفيش طلبات حقيقية بتتنفذ من الموقع.
            </p>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Header({ query, onQuery, onCategory }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = () => scrollToId('products')

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? 'border-line/80 bg-cream/95 shadow-[0_10px_30px_-20px_rgb(23_37_28/0.35)] backdrop-blur-md' : 'border-transparent bg-cream'
        }`}
      >
        <div className="container-x">
          <div className={`flex items-center gap-3 transition-[height] duration-300 sm:gap-5 ${scrolled ? 'h-[68px]' : 'h-[76px]'}`}>
            <a href="#top" aria-label="الهدهودي ماركت — الرئيسية" className="shrink-0 rounded-xl">
              <Logo />
            </a>
            <div className="hidden flex-1 md:flex md:max-w-xl md:ms-6 lg:ms-10">
              <SearchField id="search-desktop" query={query} onQuery={onQuery} onSubmit={submit} />
            </div>
            <nav aria-label="الأقسام الرئيسية" className="ms-auto hidden xl:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.slice(0, 4).map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="rounded-lg px-3 py-2 text-[14.5px] font-semibold text-ink/80 transition-colors hover:bg-cream-200 hover:text-forest">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="ms-auto flex items-center gap-2 xl:ms-2">
              <CartButton />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="فتح القائمة"
                aria-expanded={menuOpen}
                className="grid size-12 place-items-center rounded-xl border border-line bg-paper text-ink hover:border-forest/30 xl:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
          <div className="pb-3 md:hidden">
            <SearchField id="search-mobile" query={query} onQuery={onQuery} onSubmit={submit} />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} onCategory={onCategory} />
    </>
  )
}

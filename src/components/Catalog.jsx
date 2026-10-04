import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownWideNarrow, RotateCcw, SearchX } from 'lucide-react'
import ProductCard from './ProductCard'
import { SectionHeading } from './Reveal'
import { CATEGORIES, PRODUCTS, categoryById } from '../data/catalog'
import { normalizeArabic, productsLabel } from '../lib/format'

const SORTS = [
  { id: 'default', label: 'الترتيب المقترح' },
  { id: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { id: 'price-desc', label: 'السعر: من الأعلى للأقل' },
]

const TABS = [{ id: 'all', name: 'الكل' }, ...CATEGORIES]

export function filterProducts({ query, category, sort }) {
  const q = normalizeArabic(query)
  let list = PRODUCTS.filter((p) => {
    if (category !== 'all' && p.category !== category) return false
    if (!q) return true
    const hay = normalizeArabic(`${p.name} ${p.size} ${categoryById[p.category].name}`)
    return q.split(/\s+/).every((w) => hay.includes(w))
  })
  if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  return list
}

export default function Catalog({ query, onQuery, category, onCategorySelect, sort, onSort }) {
  const results = useMemo(() => filterProducts({ query, category, sort }), [query, category, sort])
  const hasFilters = query.trim() || category !== 'all' || sort !== 'default'

  const clearAll = () => {
    onQuery('')
    onCategorySelect('all')
    onSort('default')
  }

  return (
    <section id="products" className="py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading eyebrow="المنتجات" title="جهّز طلبك على راحتك">
          ابحث باسم المنتج أو اختار القسم، ورتّب حسب السعر. كل الأسعار المعروضة أسعار تجريبية.
        </SectionHeading>

        {/* شريط الفلاتر */}
        <div className="relative z-20 -mx-4 mb-6 border-y border-line bg-cream/95 px-4 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-3 md:sticky md:top-[69px]">
          <div className="flex flex-col gap-2 py-2 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label="تصفية حسب القسم" className="no-scrollbar -mx-1 flex overflow-x-auto">
              {TABS.map((t) => {
                const selected = category === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => onCategorySelect(t.id)}
                    className={`relative shrink-0 px-3 py-2.5 text-[14.5px] font-bold transition-colors ${selected ? 'text-forest-950' : 'text-muted hover:text-forest'}`}
                  >
                    {t.name}
                    {selected && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute inset-x-2 -bottom-[1px] h-[3px] rounded-full bg-lime"
                        transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-2">
              <label className="relative flex-1 lg:flex-none">
                <span className="sr-only">ترتيب المنتجات</span>
                <ArrowDownWideNarrow className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                <select
                  value={sort}
                  onChange={(e) => onSort(e.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-line bg-paper ps-9 pe-4 text-[14px] font-semibold text-ink outline-none focus:border-forest/40 lg:w-[220px]"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={clearAll}
                disabled={!hasFilters}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-[14px] font-bold text-orange-700 transition-[opacity,background-color] hover:bg-orange-100 disabled:opacity-35 disabled:hover:bg-transparent"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                مسح الفلاتر
              </button>
            </div>
          </div>
        </div>

        <p className="mb-5 text-[14px] text-muted" aria-live="polite">
          {results.length ? (
            <>
              بنعرض <strong className="text-ink">{productsLabel(results.length)}</strong>
              {category !== 'all' && <> في قسم <strong className="text-ink">{categoryById[category].name}</strong></>}
              {query.trim() && <> لنتيجة البحث «<strong className="text-ink">{query.trim()}</strong>»</>}
            </>
          ) : (
            'مفيش نتايج'
          )}
        </p>

        {results.length ? (
          <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.06 }}
                >
                  <ProductCard product={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="flex flex-col items-center rounded-[24px] border border-dashed border-line bg-paper px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-cream-200 text-forest">
              <SearchX className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[20px] font-black text-forest-950">ملقيناش اللي بتدوّر عليه</h3>
            <p className="mt-2 max-w-md text-[15px] leading-7 text-muted">
              {query.trim()
                ? <>جرّب تكتب اسم المنتج بشكل تاني، أو ابحث في كل الأقسام بدل قسم واحد.</>
                : <>القسم ده لسه مفيهوش منتجات في النسخة التجريبية.</>}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {category !== 'all' && query.trim() && (
                <button type="button" onClick={() => onCategorySelect('all')} className="btn btn-ghost h-11">
                  ابحث في كل الأقسام
                </button>
              )}
              <button type="button" onClick={clearAll} className="btn btn-primary h-11">
                اعرض كل المنتجات
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

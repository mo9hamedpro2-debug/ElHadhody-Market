const nf = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 2 })

export const num = (n) => nf.format(n)
export const egp = (n) => `${nf.format(n)} ج.م`

/** تحويل النص لصيغة بحث موحدة (أ/إ/آ → ا، ة → ه، ى → ي، وشيل التشكيل). */
export const normalizeArabic = (s = '') =>
  s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/٫/g, '.')
    .trim()

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/** صيغة العدد بالعربي: منتج / منتجين / ٣ منتجات / ١١ منتج */
export const countLabel = (n, [one, two, few, many]) => {
  if (n === 0) return `مفيش ${few}`
  if (n === 1) return one
  if (n === 2) return two
  if (n <= 10) return `${num(n)} ${few}`
  return `${num(n)} ${many}`
}
export const productsLabel = (n) => countLabel(n, ['منتج واحد', 'منتجين', 'منتجات', 'منتج'])

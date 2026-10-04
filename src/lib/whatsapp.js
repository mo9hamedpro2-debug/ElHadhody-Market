import { WHATSAPP_ORDER_NUMBER, isWhatsAppConfigured } from '../config/store'
import { egp, num } from './format'

/** بيبني رسالة الطلب من محتويات السلة. */
export function buildOrderMessage(lines, subtotal) {
  const rows = lines.map(
    (l, i) => `${num(i + 1)}) ${l.product.name} (${l.product.size}) × ${num(l.qty)} — ${egp(l.total)}`,
  )
  return [
    'السلام عليكم،',
    'حابب أطلب من الهدهودي ماركت:',
    '',
    ...rows,
    '',
    `الإجمالي المبدئي: ${egp(subtotal)}`,
    '(الأسعار المذكورة أسعار تجريبية، ومحتاج تأكيد السعر النهائي ورسوم التوصيل)',
    '',
    'الاسم:',
    'العنوان:',
  ].join('\n')
}

/** رابط واتساب — بيرجع null لو رقم المحل لسه مش متظبط. */
export function whatsappUrl(message) {
  if (!isWhatsAppConfigured()) return null
  const n = String(WHATSAPP_ORDER_NUMBER).replace(/\D/g, '')
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`
}

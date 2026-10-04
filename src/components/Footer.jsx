import Logo from './Logo'
import { NAV_LINKS } from '../data/nav'
import { SocialLinks } from './StoreInfo'
import { CATEGORIES } from '../data/catalog'
import { STORE_INFO } from '../config/store'

export default function Footer({ onCategory }) {
  return (
    <footer className="bg-forest-950 text-cream">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[14.5px] leading-7 text-cream/65">
            احتياجات بيتك اليومية في مكان واحد، بطريقة أسهل وأوضح.
          </p>
          <div className="mt-5"><SocialLinks light /></div>
        </div>

        <nav aria-label="روابط سريعة">
          <h3 className="mb-4 text-[14px] font-extrabold text-lime">روابط سريعة</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-[14.5px] text-cream/75 transition-colors hover:text-cream">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="الأقسام">
          <h3 className="mb-4 text-[14px] font-extrabold text-lime">الأقسام</h3>
          <ul className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => onCategory(c.id)} className="text-[14.5px] text-cream/75 transition-colors hover:text-cream">
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-[14px] font-extrabold text-lime">تواصل معانا</h3>
          <ul className="space-y-2.5 text-[14px] leading-6 text-cream/65">
            <li>{STORE_INFO.address}</li>
            <li>{STORE_INFO.phone}</li>
            <li>{STORE_INFO.hours}</li>
          </ul>
          <p className="mt-3 inline-block rounded-md border border-dashed border-cream/25 px-2 py-0.5 text-[11.5px] font-semibold text-cream/55">
            بيانات تجريبية تُستبدل ببيانات المحل
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-2 py-5 text-[12.5px] leading-6 text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} الهدهودي ماركت — نموذج تجريبي مقترح للموقع. الأسعار والعروض للعرض فقط، ومفيش طلبات أو مدفوعات حقيقية بتتم من خلاله.
          </p>
          <p className="shrink-0">الصور من Unsplash</p>
        </div>
      </div>
    </footer>
  )
}

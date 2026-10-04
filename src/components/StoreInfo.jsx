import { Clock, Globe, MapPin, Phone, Truck } from 'lucide-react'
import Reveal, { SectionHeading } from './Reveal'
import { DEMO_MODE, SOCIAL_LINKS, STORE_INFO } from '../config/store'

const FIELDS = [
  { key: 'address', label: 'العنوان', icon: MapPin },
  { key: 'hours', label: 'مواعيد العمل', icon: Clock },
  { key: 'phone', label: 'رقم التواصل', icon: Phone },
  { key: 'deliveryCoverage', label: 'مناطق التوصيل', icon: Truck },
]

export function PlaceholderTag() {
  if (!DEMO_MODE) return null
  return <span className="rounded-md border border-dashed border-orange/50 bg-orange-100/60 px-1.5 py-0.5 text-[11px] font-bold text-orange-700">بيانات تجريبية</span>
}

export function SocialLinks({ light = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {SOCIAL_LINKS.map((s) =>
        s.url ? (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-bold transition-colors ${light ? 'border-cream/20 text-cream hover:bg-cream/10' : 'border-line text-forest hover:bg-cream-200'}`}
            >
              <Globe className="size-3.5" aria-hidden="true" />
              {s.label}
            </a>
          </li>
        ) : (
          <li
            key={s.id}
            className={`inline-flex items-center gap-1.5 rounded-lg border border-dashed px-3 py-1.5 text-[13px] font-semibold ${light ? 'border-cream/20 text-cream/55' : 'border-line text-muted'}`}
            title="الرابط يُضاف لاحقًا"
          >
            <Globe className="size-3.5" aria-hidden="true" />
            {s.label} <span className="text-[11px] opacity-80">(يُضاف لاحقًا)</span>
          </li>
        ),
      )}
    </ul>
  )
}

export default function StoreInfo() {
  return (
    <section id="store" className="py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading eyebrow="معلومات المحل" title="تلاقينا فين؟">
          البيانات دي خانات جاهزة تتملي ببيانات المحل الحقيقية بعد موافقة صاحب المحل.
        </SectionHeading>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <dl className="grid h-full gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.key} className="flex gap-4 bg-paper p-5 sm:p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="flex flex-wrap items-center gap-2 text-[14px] font-extrabold text-forest-950">
                      {f.label} <PlaceholderTag />
                    </dt>
                    <dd className="mt-1 text-[14.5px] leading-7 text-muted">{STORE_INFO[f.key]}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[24px] bg-forest p-6 text-cream sm:p-7">
              <p className="font-hand text-[30px] leading-tight text-lime">تابعنا</p>
              <p className="mt-2 text-[14.5px] leading-7 text-cream/75">
                صفحات المحل على السوشيال ميديا هتظهر هنا أول ما الروابط تتأكد.
              </p>
              <div className="mt-5"><SocialLinks light /></div>
              <div className="mt-auto pt-6">
                {STORE_INFO.mapUrl ? (
                  <a href={STORE_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="btn h-11 w-full bg-lime text-forest-950 hover:bg-lime-300">
                    <MapPin className="size-4" aria-hidden="true" /> افتح الموقع على الخريطة
                  </a>
                ) : (
                  <p className="rounded-xl border border-dashed border-cream/25 px-4 py-3 text-[13px] leading-6 text-cream/65">
                    رابط الخريطة يُضاف لما عنوان المحل يتأكد.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

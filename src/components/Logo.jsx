/** شعار الهدهودي: سلة مشتريات فوقها ريش "الهدهد" على شكل أوراق خضرا. */
export function LogoMark({ className = 'size-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="var(--color-forest)" />
      <path d="M24 22c-2-6 0-11 3-14 1 5 1 9-3 14z" fill="var(--color-lime)" />
      <path d="M32 21c-1-7 1-12 5-15 0 6-1 10-5 15z" fill="var(--color-lime)" />
      <path d="M40 22c1-6 4-9 8-11-1 5-3 9-8 11z" fill="var(--color-orange)" />
      <path d="M13 27h38l-4.5 22.5A4 4 0 0 1 42.6 53H21.4a4 4 0 0 1-3.9-3.5z" fill="var(--color-cream)" />
      <path d="M22 34v12M32 34v12M42 34v12" stroke="var(--color-forest)" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ light = false, compact = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={compact ? 'size-9' : 'size-10 sm:size-11'} />
      <span className="flex flex-col leading-none">
        <span className={`text-[21px] sm:text-[23px] font-black tracking-tight ${light ? 'text-cream' : 'text-forest'}`}>
          الهدهودي
          <span className={light ? 'text-lime' : 'text-orange'}> ماركت</span>
        </span>
        {!compact && (
          <span className={`mt-1 text-[10.5px] font-semibold tracking-[0.18em] ${light ? 'text-cream/60' : 'text-muted'}`} dir="ltr">
            EL HADHOUDI MARKET
          </span>
        )}
      </span>
    </span>
  )
}

import { useState } from 'react'
import { categoryById, unsplash } from '../data/catalog'

/**
 * صورة منتج بمقاس ثابت: skeleton أثناء التحميل، وبديل مصمم
 * (أيقونة القسم على خلفية هادية) لو الصورة ماحمّلتش.
 */
export default function ProductImage({ id, category, alt, width = 480, height, className = '', imgClassName = '', sizes, eager = false }) {
  const [status, setStatus] = useState('loading')
  const Icon = categoryById[category]?.icon

  return (
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative '}overflow-hidden bg-cream-200 ${className}`}>
      {status === 'loading' && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-forest-100 text-forest/70" role="img" aria-label={alt}>
          {Icon && <Icon className="size-10" strokeWidth={1.5} />}
          <span className="text-xs font-semibold">{categoryById[category]?.name}</span>
        </div>
      ) : (
        <img
          src={unsplash(id, width, height)}
          srcSet={`${unsplash(id, width, height)} 1x, ${unsplash(id, width * 2, height ? height * 2 : undefined)} 2x`}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  )
}

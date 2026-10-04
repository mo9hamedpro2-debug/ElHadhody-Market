# الهدهودي ماركت | El Hadhoudi Market (demo)

This is a proposal site for an Egyptian neighborhood supermarket. The interface is Arabic-first and fully RTL.
All prices, offers and store details are **demo content**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Stack: React 18, Vite 6, Tailwind CSS 4, Framer Motion, Lucide icons. There is no backend.

## Replace before going live

| What | Where |
| --- | --- |
| WhatsApp order number (`WHATSAPP_ORDER_NUMBER`, format `2010XXXXXXXX`) | `src/config/store.js` |
| Address, opening hours, contact number, delivery coverage, map link (`STORE_INFO`) | `src/config/store.js` |
| Social media links (`SOCIAL_LINKS`) | `src/config/store.js` |
| Set `DEMO_MODE = false` to hide the "بيانات تجريبية" tags on the store info | `src/config/store.js` |
| Real product list, sizes and confirmed prices (`PRODUCTS`) | `src/data/catalog.js` |
| Real weekly offers (`oldPrice` + `featured: true`) | `src/data/catalog.js` |
| Demo-disclaimer copy (announcement bar, cards, cart, footer) | `src/components/*` |

While the WhatsApp number is still the placeholder (`201000000000`), the order button only shows a copyable preview and sends nothing to anyone.

Product photos are hotlinked from Unsplash under the Unsplash License. If an image fails to load, the card shows a fallback with the category icon.

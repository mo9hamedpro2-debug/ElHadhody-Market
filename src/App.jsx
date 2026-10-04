import { useCallback, useState } from 'react'
import Header, { AnnouncementBar } from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import WeeklyPicks from './components/WeeklyPicks'
import Catalog from './components/Catalog'
import About from './components/About'
import StoreInfo from './components/StoreInfo'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CartToast from './components/CartToast'
import { scrollToId } from './lib/format'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')

  /** اختيار قسم من أي مكان في الصفحة: يفلتر المنتجات وينزل لها. */
  const goToCategory = useCallback((id) => {
    setCategory(id)
    setTimeout(() => scrollToId('products'), 40)
  }, [])

  return (
    <>
      <a href="#products" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[60] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-cream">
        تخطّي للمنتجات
      </a>
      <AnnouncementBar />
      <Header query={query} onQuery={setQuery} onCategory={goToCategory} />
      <main>
        <Hero onCategory={goToCategory} />
        <Categories active={category === 'all' ? null : category} onCategory={goToCategory} />
        <WeeklyPicks />
        <Catalog
          query={query}
          onQuery={setQuery}
          category={category}
          onCategorySelect={setCategory}
          sort={sort}
          onSort={setSort}
        />
        <About />
        <StoreInfo />
      </main>
      <Footer onCategory={goToCategory} />
      <CartDrawer />
      <CartToast />
    </>
  )
}

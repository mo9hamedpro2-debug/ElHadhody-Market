import { LayoutGrid, ListChecks, MessageCircle } from 'lucide-react'
import ProductImage from './ProductImage'
import Reveal from './Reveal'

const POINTS = [
  { icon: LayoutGrid, title: 'كل حاجة متقسمة', text: 'أقسام واضحة من الخضار للمنظفات، فتوصل للي محتاجه من غير لف.' },
  { icon: ListChecks, title: 'جهّز طلبك براحتك', text: 'اختار المنتجات والكميات، وشوف الإجمالي المبدئي قبل ما تطلب.' },
  { icon: MessageCircle, title: 'تواصل مباشر مع المحل', text: 'الطلب بيوصل للمحل في رسالة واحدة مرتبة، والتأكيد بيكون منهم.' },
]

export default function About() {
  return (
    <section id="about" className="bg-cream-200/60 py-16 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-last lg:order-first">
          <div className="grid grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
            <ProductImage
              id="1652262968340-b735524f9ae4"
              category="pantry"
              alt="أكياس ورق فيها عيش وطماطم وموز على ترابيزة"
              width={560}
              height={700}
              className="aspect-[4/5] rounded-[26px]"
            />
            <div className="flex flex-col gap-3 pt-10 sm:gap-4 sm:pt-16">
              <ProductImage
                id="1583258292688-d0213dc5a3a8"
                category="produce"
                alt="رفوف فاكهة مرتبة في سوبر ماركت"
                width={440}
                height={440}
                className="aspect-square rounded-[22px]"
              />
              <div className="rounded-[22px] bg-forest p-5 text-cream">
                <p className="font-hand text-[26px] leading-none text-lime">من غير لف</p>
                <p className="mt-2 text-[13.5px] leading-6 text-cream/80">احتياجات البيت اليومية في مكان واحد قريب منك.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-3">
              <span className="h-[3px] w-6 rounded-full bg-lime" aria-hidden="true" />
              عن الماركت
            </p>
            <h2 className="text-[30px] font-black leading-[1.3] text-forest-950 sm:text-[40px]">
              الهدهودي ماركت.. أقرب لاحتياجات بيتك
            </h2>
            <p className="mt-5 text-[16.5px] leading-8 text-muted">
              مشوار السوبر ماركت جزء من يومك، وإحنا عايزينه يبقى أسهل. من لبن الفطار لحد منظفات آخر الأسبوع،
              هتلاقي الأساسيات اللي البيت محتاجها مترتبة قدامك، تختار منها اللي يناسبك وتجهّز طلبك في دقايق.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.08 * i} className="flex gap-4 rounded-2xl border border-line bg-paper p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime-100 text-forest">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[16px] font-extrabold text-forest-950">{p.title}</span>
                  <span className="mt-0.5 block text-[14.5px] leading-7 text-muted">{p.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

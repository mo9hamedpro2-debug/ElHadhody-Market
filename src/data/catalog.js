import { Carrot, Milk, Wheat, CupSoda, Cookie, SprayCan, Snowflake } from 'lucide-react'

/** صور Unsplash (رخصة Unsplash المجانية) — بنحدد المقاس حسب مكان العرض. */
export const unsplash = (id, w = 600, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`

export const CATEGORIES = [
  { id: 'produce', name: 'خضار وفاكهة', blurb: 'طازة كل يوم', icon: Carrot, image: '1597362925123-77861d3fbac7' },
  { id: 'dairy', name: 'ألبان وجبن', blurb: 'لبن وزبادي وجبن وبيض', icon: Milk, image: '1550583724-b2692b85b150' },
  { id: 'pantry', name: 'بقالة أساسية', blurb: 'رز ومكرونة وزيت وشاي', icon: Wheat, image: '1592178036182-5400889dfc74' },
  { id: 'drinks', name: 'مشروبات', blurb: 'مياه وعصاير', icon: CupSoda, image: '1613478223719-2ab802602423' },
  { id: 'snacks', name: 'سناكس وحلويات', blurb: 'لقمة حلوة مع الشاي', icon: Cookie, image: '1558961363-fa8fdf82db35' },
  { id: 'cleaning', name: 'منظفات', blurb: 'لنضافة البيت والمواعين', icon: SprayCan, image: '1626379481874-3dc5678fa8ca' },
  { id: 'frozen', name: 'مجمدات', blurb: 'جاهزة وقت ما تحتاجها', icon: Snowflake, image: '1565711120607-903eb0a17e2f' },
]

export const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

/**
 * منتجات تجريبية — الأسعار والعروض توضيحية للعرض فقط
 * ومش أسعار أو عروض حقيقية للمحل.
 * oldPrice = سعر قبل العرض (تجريبي)، featured = يظهر في "اختيارات الأسبوع".
 */
export const PRODUCTS = [
  { id: 'milk-full', name: 'لبن كامل الدسم', size: '١ لتر', price: 48, category: 'dairy', image: '1634141510639-d691d86f47be' },
  { id: 'yogurt-plain', name: 'زبادي طبيعي', size: '١٧٠ جم', price: 14, category: 'dairy', image: '1571212515416-fef01fc43637' },
  { id: 'eggs-30', name: 'بيض أحمر', size: 'كرتونة ٣٠ بيضة', price: 195, category: 'dairy', image: '1506976785307-8732e854ad03' },
  { id: 'cheese-white', name: 'جبنة بيضاء', size: '٥٠٠ جم', price: 85, category: 'dairy', image: '1661349008073-136bed6e6788' },
  { id: 'cheese-roumy', name: 'جبنة رومي', size: '٢٥٠ جم', price: 120, oldPrice: 135, featured: true, category: 'dairy', image: '1683314573422-649a3c6ad784' },
  { id: 'rice-egy', name: 'أرز مصري', size: '١ كجم', price: 38, category: 'pantry', image: '1723475158232-819e29803f4d' },
  { id: 'pasta-penne', name: 'مكرونة قلم', size: '٤٠٠ جم', price: 22, category: 'pantry', image: '1612966893103-790e549a2ab1' },
  { id: 'oil-sunflower', name: 'زيت عباد الشمس', size: '١ لتر', price: 95, oldPrice: 110, featured: true, category: 'pantry', image: '1552592074-ea7a91b851b3' },
  { id: 'tea-black', name: 'شاي أسود ناعم', size: '٢٥٠ جم', price: 75, category: 'pantry', image: '1546641555-20676239fb5d' },
  { id: 'coffee-ground', name: 'بن محوّج', size: '٢٠٠ جم', price: 140, oldPrice: 160, featured: true, category: 'pantry', image: '1606791405792-1004f1718d0c' },
  { id: 'water-15', name: 'مياه معدنية', size: '١٫٥ لتر', price: 9, category: 'drinks', image: '1616118132534-381148898bb4' },
  { id: 'juice-orange', name: 'عصير برتقال', size: '١ لتر', price: 42, category: 'drinks', image: '1577680716097-9a565ddc2007' },
  { id: 'biscuits-choco', name: 'بسكويت بقطع الشوكولاتة', size: '٢٠٠ جم', price: 35, category: 'snacks', image: '1726733995322-13779de0111f' },
  { id: 'chips-salt', name: 'شيبس بطاطس بالملح', size: '٨٠ جم', price: 15, category: 'snacks', image: '1528751014936-863e6e7a319c' },
  { id: 'detergent-gel', name: 'جل غسيل للأوتوماتيك', size: '٢٫٥ لتر', price: 210, oldPrice: 245, featured: true, category: 'cleaning', image: '1624372635310-01d078c05dd9' },
  { id: 'dish-liquid', name: 'سائل غسيل أطباق', size: '١ لتر', price: 45, category: 'cleaning', image: '1590610994353-7b0e7546e681' },
  { id: 'frozen-mixed', name: 'خضار مشكل مجمد', size: '٤٠٠ جم', price: 40, category: 'frozen', image: '1790861286904-a5158b131c62' },
  { id: 'frozen-peas', name: 'بسلة بالجزر مجمدة', size: '٤٠٠ جم', price: 38, category: 'frozen', image: '1565711120607-903eb0a17e2f' },
  { id: 'tomatoes', name: 'طماطم', size: '١ كجم', price: 20, category: 'produce', image: '1546094096-0df4bcaaa337' },
  { id: 'cucumbers', name: 'خيار', size: '١ كجم', price: 18, category: 'produce', image: '1568584711271-6c929fb49b60' },
  { id: 'potatoes', name: 'بطاطس', size: '١ كجم', price: 22, category: 'produce', image: '1518977676601-b53f82aba655' },
  { id: 'oranges', name: 'برتقال', size: '١ كجم', price: 25, category: 'produce', image: '1547514701-42782101795e' },
  { id: 'bananas', name: 'موز', size: '١ كجم', price: 35, category: 'produce', image: '1571771894821-ce9b6c11b08e' },
]

export const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))

export const discountPercent = (p) =>
  p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0

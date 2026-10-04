import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { productById } from '../data/catalog'

const STORAGE_KEY = 'hadhoudi-cart-v1'
const MAX_QTY = 99

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    // نحتفظ بس بالمنتجات الموجودة في الكتالوج وبكميات صحيحة
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([id, q]) => productById[id] && Number.isInteger(q) && q > 0 && q <= MAX_QTY,
      ),
    )
  } catch {
    return {}
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const q = Math.min((state[action.id] || 0) + 1, MAX_QTY)
      return { ...state, [action.id]: q }
    }
    case 'set': {
      const q = Math.max(0, Math.min(action.qty, MAX_QTY))
      const next = { ...state }
      if (q === 0) delete next[action.id]
      else next[action.id] = q
      return next
    }
    case 'remove': {
      const next = { ...state }
      delete next[action.id]
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadCart)
  const [isOpen, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* التخزين مش متاح — السلة هتفضل شغالة في الجلسة بس */
    }
  }, [items])

  const add = useCallback((id) => {
    dispatch({ type: 'add', id })
    setLastAdded({ id, at: Date.now() })
  }, [])
  const setQty = useCallback((id, qty) => dispatch({ type: 'set', id, qty }), [])
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const dismissToast = useCallback(() => setLastAdded(null), [])

  const value = useMemo(() => {
    const lines = Object.entries(items).map(([id, qty]) => {
      const product = productById[id]
      return { product, qty, total: product.price * qty }
    })
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const subtotal = lines.reduce((s, l) => s + l.total, 0)
    const savings = lines.reduce(
      (s, l) => s + (l.product.oldPrice ? (l.product.oldPrice - l.product.price) * l.qty : 0),
      0,
    )
    return {
      items, lines, count, subtotal, savings,
      add, setQty, remove, clear,
      isOpen, open, close,
      lastAdded, dismissToast,
    }
  }, [items, isOpen, lastAdded, add, setQty, remove, clear, open, close, dismissToast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

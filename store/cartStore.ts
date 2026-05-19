import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

// =========================================
// CART ITEM TYPE
// =========================================
export interface CartItem {
    product: Product
    quantity: number
}

// =========================================
// CART STORE TYPE
// Defines all state and actions
// =========================================
interface CartStore {
    // State
    items: CartItem[]

    // Actions
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void

    // Computed helpers
    getTotalItems: () => number
    getTotalPrice: () => number
}

// =========================================
// CART STORE
// persist middleware saves to localStorage
// so cart survives page refresh
// =========================================
export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            // ── ADD ITEM ──
            // If product already in cart → increase quantity
            // If not → add as new item with quantity 1
            addItem: (product: Product) => {
                const items = get().items
                const existing = items.find(
                    (item) => item.product.id === product.id
                )

                if (existing) {
                    set({
                        items: items.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    })
                } else {
                    set({
                        items: [...items, { product, quantity: 1 }],
                    })
                }
            },

            // ── REMOVE ITEM ──
            // Removes the item completely from cart
            removeItem: (productId: number) => {
                set({
                    items: get().items.filter(
                        (item) => item.product.id !== productId
                    ),
                })
            },

            // ── UPDATE QUANTITY ──
            // If quantity is 0 or less → remove item
            updateQuantity: (productId: number, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }

                set({
                    items: get().items.map((item) =>
                        item.product.id === productId
                            ? { ...item, quantity }
                            : item
                    ),
                })
            },

            // ── CLEAR CART ──
            clearCart: () => set({ items: [] }),

            // ── GET TOTAL ITEMS ──
            // Sum of all quantities
            getTotalItems: () => {
                return get().items.reduce(
                    (total, item) => total + item.quantity,
                    0
                )
            },

            // ── GET TOTAL PRICE ──
            // Sum of price × quantity for all items
            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) =>
                        total + item.product.price * item.quantity,
                    0
                )
            },
        }),
        {
            name: 'bazar-cart', // localStorage key
        }
    )
)
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        totalPrice: (state) =>
            state.items.reduce((sum, item) => sum + item.price * item.count, 0)
    },
    actions: {
        addItem(item) {
            const existing = this.items.find(i => i.id === item.id)
            if (existing) {
                existing.count++
            } else {
                this.items.push({ ...item, count: 1 })
            }
        },
        removeItem(id) {
            this.items = this.items.filter(i => i.id !== id)
        },
        changeCount(id, count) {
            const item = this.items.find(i => i.id === id)
            if (item && count >= 1) {
                item.count = count
            }
        }
    }
})

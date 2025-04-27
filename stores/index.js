import { defineStore } from 'pinia'

export const baseStore = defineStore('store', {

    state: () => {
        return {
            mode: null, // desktop, mobile, tablet
        }
    },
    persist: true,
    actions: {}
})
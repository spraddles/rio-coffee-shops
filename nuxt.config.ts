export default defineNuxtConfig({

    ssr: true,
    
    nitro: {
        preset: 'netlify'
    },

    compatibilityDate: '2025-04-25',

    components: [{
        dirs: [
            '@/components'
        ]
    }],

    app: {

        head: {
            title: 'Rio cafe finder',
            htmlAttrs: {
                lang: 'en'
            },
            meta: [{
                    charset: 'utf-8'
                },
                {
                    name: 'description',
                    content: "Find the best cafe's in Rio for working"
                },
            ],
            link: [
                // https://favicon.io/favicon-converter
                { rel: 'apple-touch-icon', sizes: "180x180", type: 'image/x-icon', href: '/apple-touch-icon.png' },
                { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
                { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' }
            ]
        }
    },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],

    css: [
        '@/assets/css/fonts.css',
        '@/assets/css/tailwind.css',
        '@/assets/css/fontawesome.css'
    ],

    devtools: {
        enabled: false
    },

    vite: {
        define: {
            'process.env.DEBUG': false,
        }
    }
})
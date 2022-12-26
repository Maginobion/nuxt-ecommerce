// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules:[
        '@nuxt/image-edge'
    ],
    app:{
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    typescript: {
        shim: false
    },
    runtimeConfig:{
        mongo: process.env.MONGO_URL,
        gmailClient: process.env.GMAIL_CLIENT,
        gmailSecret: process.env.GMAIL_SECRET,
        public:{
            supabaseUrl: process.env.SUPABASE_URL,
            supabasePass: process.env.SUPABASE_PASS,           
        }
    },
    css: ['@/assets/css/styles.css'],
})

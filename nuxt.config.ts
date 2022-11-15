// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    runtimeConfig:{
        mongo: process.env.MONGO_URL
    },
    css: ['@/assets/css/styles.css']
})

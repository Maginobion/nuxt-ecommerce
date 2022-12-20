// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app:{
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    typescript: {
        shim: false
    },
    runtimeConfig:{
        mongo: process.env.MONGO_URL,
        awsKey: process.env.AWS_ACCESS_KEY_ID,
        awsSecret: process.env.AWS_SECRET_ACCESS_KEY
    },
    css: ['@/assets/css/styles.css']
})

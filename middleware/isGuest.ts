import { validarCookies } from "~~/controllers/controlInvitado"

export default defineNuxtRouteMiddleware((to,from)=>{

    validarCookies()

})
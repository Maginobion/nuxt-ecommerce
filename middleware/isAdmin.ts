import { validarCookies } from "~~/controllers/controlAdmin"

export default defineNuxtRouteMiddleware(async (to,from)=>{

    await validarCookies()

})
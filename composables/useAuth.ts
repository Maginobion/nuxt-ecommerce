const useAuth = () =>{
    
    const token = useCookie('Authorization')

    const verify = () => {
        if(!token.value) return false
        return true
    }

    return useState<boolean>('auth', verify)
}

export default useAuth
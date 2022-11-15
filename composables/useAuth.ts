const useAuth = () =>{

    const cookie = useCookie('Authorization')

    const verify = () => {
        if(!cookie) return false
        return true
    }

    return useState<boolean>('auth', verify)
}

export default useAuth
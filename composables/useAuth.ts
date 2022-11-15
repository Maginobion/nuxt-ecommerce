const useAuth = () =>{

    type Headers = {
        [k: string]: string | number,
        Authorization: string
    }

    const headers = useRequestHeaders(['cookie']) as Headers

    const verify = () => {
        if(!headers.Authorization) return false
        return true
    }

    return useState<boolean>('auth', verify)
}

export default useAuth
import { createClient } from '@supabase/supabase-js'

const useSupabase = () =>{

    const config = useRuntimeConfig()

    const sbClient = createClient(config.supabaseUrl, config.supabasePass)

    return sbClient
}

export default useSupabase
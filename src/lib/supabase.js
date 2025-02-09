import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_API_KEY)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

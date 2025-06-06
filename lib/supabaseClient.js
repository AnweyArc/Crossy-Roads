import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://swscfeudgtgrqjfnlukj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3c2NmZXVkZ3RncnFqZm5sdWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzA5NzUsImV4cCI6MjA2NDc0Njk3NX0.XffWuyYJ1UN6xAuhKD7pmS6U8dnvO72NsLPE4jT0rPE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

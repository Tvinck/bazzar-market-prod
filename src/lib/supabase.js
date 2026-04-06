import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzsyvbwfaszpgtixcolt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16c3l2YndmYXN6cGd0aXhjb2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDg2NjAsImV4cCI6MjA5MDE4NDY2MH0.XzyDByXpRqFYKfkPxcRLle-tucXCcaEpXE3AwWbf2xA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

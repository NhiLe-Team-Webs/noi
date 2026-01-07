
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase URL or Anon Key. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const saveJoinRequest = async (data: any) => {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Cannot save to Supabase: Configuration missing');
        return;
    }

    const { error } = await supabase
        .from('join_requests')
        .insert([
            {
                email: data.email,
                watch_duration: data.watch_duration,
                platform: data.platform,
                community_need: data.community_need,
                profession: data.profession,
                marital_status: data.marital_status,
                gender: data.gender,
                location: data.location,
                phone: data.phone,
                telegram: data.telegram,
            },
        ]);

    if (error) {
        console.error('Error saving join request:', error);
        throw error;
    }
};

const {createClient} = require("@supabase/supabase-js");

const supabase = createClient("https://hjbqkkehucfdgnmkcauy.supabase.co", process.env.SUPAKEY);

module.exports = {supabase};
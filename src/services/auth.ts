import { supabase } from "../lib/supabase";

export const authService = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw "Wrong Email or Password, Try again";
    } else {
      return data;
    }
  },
};

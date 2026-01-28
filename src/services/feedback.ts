import { supabase } from "../lib/supabase";

export const feedbackService = {
  createFeedback: async (title: string, description: string) => {
    const user_id = sessionStorage.getItem("authToken");

    const { data, error } = await supabase
      .from("feedback")
      .insert([{ user_id, title, description }]);

    if (error) {
      throw "Error Creating Feedback";
    } else {
      return data;
    }
  },

  getFeedbacks: async () => {
    const { data, error } = await supabase.from("feedback").select("*");

    if (error) {
      throw "Error Fetching Feedbacks";
    } else {
      return data;
    }
  },
};

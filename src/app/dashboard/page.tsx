"use client";
import { useEffect, useState } from "react";
import ModalCreateFeedback from "./modal";
import { feedbackService } from "@/services/feedback";
import { Feedback } from "@/interface/feedback";
import FeedbackCard from "../../../components/FeedbackCard";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async (): Promise<void> => {
      const data: Feedback[] = await feedbackService.getFeedbacks();
      setFeedbacks(data);
    };

    fetchFeedbacks();
  });

  return (
    <main className="w-full min-h-screen p-4 sm:p-10 flex flex-col">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Feedback
            </span>
          </button>
        </div>
        <div className="w-full flex flex-col p-10">
          {feedbacks.length === 0 ? (
            <div className="flex justify-center">
              <p>No Feedbacks Available</p>
            </div>
          ) : (
            feedbacks.map((feedback: Feedback) => {
              return <FeedbackCard key={feedback.id} feedback={feedback} />;
            })
          )}
        </div>
      </div>
      <ModalCreateFeedback
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}

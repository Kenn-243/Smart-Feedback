import { Feedback } from "@/interface/feedback";

export default function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <div
      key={feedback.id}
      className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex-1 pr-4">
          {feedback.title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            feedback.priority === "high"
              ? "bg-red-100 text-red-700"
              : feedback.priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {feedback.priority}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{feedback.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
            {feedback.category}
          </span>
          <span
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              feedback.status === "Processed"
                ? "bg-green-50 text-green-700"
                : feedback.status === "Pending"
                  ? "bg-purple-50 text-purple-700"
                  : "bg-gray-50 text-gray-700"
            }`}
          >
            {feedback.status}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(feedback.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

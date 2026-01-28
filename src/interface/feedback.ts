import { UUID } from "crypto";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Feedback {
  id: UUID;
  user_id: UUID;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: Timestamp;
}

type statusType = "pending" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: statusType;
}
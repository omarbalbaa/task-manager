export type TStatusType = "pending" | "in-progress" | "done";

export class TaskModel {
  id: number;
  name: string;
  status: TStatusType;

  constructor (args?: {id: number | null, name: string | null, status: TStatusType}){
    this.id = args?.id ?? 1;
    this.name = args?.name ?? "";
    this.status = args?.status ?? "pending"
  }
}
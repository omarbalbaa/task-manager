type statusType = "pending" | "in-progress" | "done";

export class TaskModel {
  id: number;
  name: string;
  status: statusType;

  constructor (){
    this.id = 1;
    this.name = "";
    this.status = "pending";
  }
}
export interface Task {
  id?: string | number;
  title: string;
  desc: string;
  date: number;
  creator?: string;
}

import { Category } from "./Category";

export interface Todo {
  user?: string;
  title: string;
  description?: string;
  status?: number;
  createdAt?: string;
  categories?: Category[];
  _id?: string;
}

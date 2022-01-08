export interface IItem {
  _id?: string;
  list?: string;
  title: string;
  url: string;
  image: string;
  createdAt: Date;
  handleDelete?: (itemId?: string) => void;
}
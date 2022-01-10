export interface IItem {
  _id?: string;
  list?: string;
  title: string;
  price: string;
  url: string;
  image: string;
  createdAt: Date;
  handleDelete?: (itemId?: string) => void;
  isShared?: boolean;
}
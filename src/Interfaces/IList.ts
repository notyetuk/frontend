export interface IList {
  _id?: string;
  title: string;
  createdAt: Date;
  cover: string;
  handleDelete?: (id?: string) => Promise<any>;
  handleEdit?: (id?: string) => Promise<any>;
}
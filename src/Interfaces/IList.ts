export interface IList {
  _id?: string;
  title: string;
  total?: string;
  createdAt: Date;
  cover: string;
  isPrivate: boolean;
  handleDelete?: (id?: string) => Promise<any>;
  handleEdit?: (id?: string) => Promise<any>;
  handlePrivacy?: (id?: string, privacy?: boolean) => Promise<any>;
}
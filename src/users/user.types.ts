export type User = {
  id: number;
  name: string;
  email: string;
};

export interface UserVm {
  users: User[];
  user: User;
  filter: string;
}

export const initialUser = { id: 0, name: '', email: '' };

export const initialUserVm = {
  users: [],
  user: initialUser,
  filter: ''
};

import { ActionContext } from "vuex/types/index.js";


export interface IUser {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  [key: string]: string | number;
}

export type IUserData = {
  [key in keyof IUser]: string;
};


export interface State {
  usersList: IUser[];
  isLoading: boolean;
}

export interface UsersState {
  users: State;
}

type Context = ActionContext<UsersState, State>;

export interface Getters {
  [index: string]: any;
  getUserById: (state: State) => (id: number) => IUser | undefined;
}

export interface Mutations {
  [index: string]: any;
  setUsers: (state: State, payload: IUser[]) => void;
  setIsLoading: (state: State, payload: boolean) => void;
  saveUser: (state: State, payload: IUser) => void;
  addNewUser: (state: State, payload: Pick<IUser, 'first_name' | 'last_name' | 'email'>) => void;
  removeUser: (state: State, userId: number) => void;
}

export interface Actions {
  [index: string]: any;
  fetchUsers: (context: Context) => Promise<void>;
}
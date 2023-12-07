export interface User {
  id: number;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  is_active: boolean;
  last_login: string;
  is_superuser: boolean;
}
export interface PatchedUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  is_active: boolean;
  last_login: string;
  is_superuser: boolean;
}

export interface CreateUser {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_superuser: boolean;
}
export interface UpdateUser {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
}

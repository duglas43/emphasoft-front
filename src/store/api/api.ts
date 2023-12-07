import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@src/axios";
import { SignIn, AuthToken, User, CreateUser, UpdateUser } from "@src/@types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseQuery: "" }),
  tagTypes: [],
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthToken, SignIn>({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        data,
      }),
    }),

    getUsers: builder.query<User[], undefined>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),

    createUser: builder.mutation<User, CreateUser>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        data,
      }),
    }),

    getUser: builder.query<User, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<User, { id: number; data: UpdateUser }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data,
      }),
    }),

    patchUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
    }),

    deleteUser: builder.mutation<undefined, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useSignInMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = api;

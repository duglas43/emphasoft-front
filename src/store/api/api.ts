import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@src/axios";
import {
  SignIn,
  AuthToken,
  User,
  CreateUser,
  UpdateUser,
  API_TAG,
} from "@src/@types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseQuery: "/api/v1/" }),
  tagTypes: Object.values(API_TAG),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthToken, SignIn>({
      query: (data) => ({
        url: `login/`,
        method: "POST",
        data,
      }),
    }),

    getUsers: builder.query<User[], undefined>({
      query: () => ({
        url: `users/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: API_TAG.USER, id })),
              API_TAG.USER,
            ]
          : [API_TAG.USER],
    }),

    createUser: builder.mutation<User, CreateUser>({
      query: (data) => ({
        url: `users/`,
        method: "POST",
        data,
      }),
      invalidatesTags: [API_TAG.USER],
    }),

    getUser: builder.query<User, number>({
      query: (id) => ({
        url: `users/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: API_TAG.USER, id }],
    }),

    updateUser: builder.mutation<User, { id: number; data: UpdateUser }>({
      query: ({ id, data }) => ({
        url: `users/${id}/`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: API_TAG.USER, id }],
    }),

    patchUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: API_TAG.USER, id }],
    }),

    deleteUser: builder.mutation<undefined, number>({
      query: (id) => ({
        url: `users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAG.USER],
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

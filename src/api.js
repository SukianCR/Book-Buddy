import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().register.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/register",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["user"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["user"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["user"],
    }),
  }),
});
//         // body: credentials,

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.message = payload.message;
  state.user = payload.user;
};

const initialState = { user: {} };

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getMe.matchFulfilled, storeToken);
  },
});

export const { useRegisterMutation, useLoginMutation , useGetMeQuery } = api;

// export const { useLoginMutation } = api;

export default registerSlice.reducer;

export const getUser = (state) => state.register.user;

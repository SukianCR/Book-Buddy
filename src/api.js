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
      invalidateTags: ["User"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["books"],
    }),

    getBooks: builder.query({
      query: () => ({
        url: "/api/books",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["books"],
    }),

    getBook: builder.query({
      query: (bookId) => ({
        url: `/api/books/${bookId}`,
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["books"],
    }),

    getMeBooks: builder.query({
      query: () => ({
        url: "/api/reservations",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["books"],
    }),
  }),
});
//

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.message = payload.message;
};

const initialState = { user: {} };

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getMe.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getBooks.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getBook.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getMeBooks.matchFulfilled, storeToken);
    
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetBooksQuery,
  useGetBookQuery,
  useGetMeBooksQuery
} = api;

export const { setToken } = registerSlice.actions;
export default registerSlice.reducer;

export const getUser = (state) => state.register.user;

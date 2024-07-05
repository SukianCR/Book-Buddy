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

    takeBook: builder.mutation({
      query: (bookId) => ({
        url: `/api/books/${bookId}`,
        method: "PATCH",
        body: { available: true },
      }),
      invalidateTags: ["books"],
    }),

    returnBook: builder.mutation({
      query: (bookId) => ({
        url: `/api/reservations/${bookId}`,
        method: "DELETE",
      }),
      invalidateTags: ["books"],
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

    getMyBooks: builder.query({
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
      state.token = payload.token;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getMe.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getBooks.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getBook.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getMyBooks.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.takeBook.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.returnBook.matchFulfilled, storeToken);
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useTakeBookMutation,
  useReturnBookMutation,
  useGetMeQuery,
  useGetBooksQuery,
  useGetBookQuery,
  useGetMyBooksQuery,
} = api;

export const { setToken, setEmail } = registerSlice.actions;
export default registerSlice.reducer;

export const getUser = (state) => state.register.user;

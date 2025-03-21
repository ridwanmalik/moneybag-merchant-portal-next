import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const merchantSetupApi = createApi({
  reducerPath: "merchantSetupApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: builder => ({
    users: builder.query({
      query: params => ({
        url: `users`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data.users,
      transformErrorResponse: error => error,
      providesTags: ["Users"],
    }),
  }),
})

export const {
  useUsersQuery,
  // useCreateCustomerMutation,
  // useCustomerQuery,
  // useCustomersQuery,
} = merchantSetupApi

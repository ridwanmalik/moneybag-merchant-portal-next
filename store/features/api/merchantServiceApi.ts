import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const merchantServiceApi = createApi({
  reducerPath: "merchantServiceApi",
  baseQuery,
  tagTypes: ["Merchants"],
  endpoints: builder => ({
    merchants: builder.query({
      query: params => ({
        url: "merchants",
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["Merchants"],
    }),
    createBusinessDetails: builder.mutation({
      query: businessDetails => ({
        url: "merchants/business-details",
        method: "POST",
        body: businessDetails,
      }),
      invalidatesTags: ["Merchants"],
    }),
  }),
})

export const { useMerchantsQuery, useCreateBusinessDetailsMutation } = merchantServiceApi


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY,
};

const baseUrl = 'https://newsapi.org/v2/';
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

const baseQuery = fetchBaseQuery({ baseUrl });

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.error('API Error:', result.error);
  }
  return result;
};

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`everything?q=${encodeURIComponent(newsCategory)}&language=en&pageSize=${count}&sortBy=publishedAt`),

      keepUnusedDataFor: 500,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;


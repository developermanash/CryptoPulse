import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Ensure headers are created correctly
const cryptoApiHeaders = {
  'x-rapidapi-key':import.meta.env.VITE_CRYPTO_API_KEY?.trim(),
  'x-rapidapi-host':'coinranking1.p.rapidapi.com'
};



// Log headers to check if the key and host are set correctly
console.log("Headers:", cryptoApiHeaders);

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "291d1d0751msh5f43e86b6dade2fp1dece4jsn2c59c15a6a37"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSpecificSongs: builder.query({
      query: (term) => `/search?term=${term}`,
    }),
    getTracks: builder.query({ query: () => `/charts/track` }),

    getArtistDetails: builder.query({
      query: (artistId) => `/artists/get-top-songs?id=${artistId}`,
    }),
    getRelatedSongs: builder.query({
      query: (songid) => `/songs/list-recommendations?key=${songid}`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `/songs/get-details?key=${songid}`,
    }),
  }),
});

export const {
  useGetSpecificSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetTracksQuery,
} = shazamApi;

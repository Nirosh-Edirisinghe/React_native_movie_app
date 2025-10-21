export const TMDB_CONFIG ={
  BASE_URL : 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVEI_APIKEY,
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVEI_APIKEY}`
  }
}

export const fetchMovie = async({query}:{query:string}) =>{
  const endpoint = query
  ?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${TMDB_CONFIG.BASE_URL}/movie/popular?sort_by=popularity.desc`

  const response = await fetch(endpoint,{
    method:'GET',
    headers:TMDB_CONFIG.headers,
  })
  if(!response.ok){
    //@ts-ignore
    throw new Error('Failed to fetch movies',response.statusText);
  }
  const data = await response.json();
  return data.results;
}

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';

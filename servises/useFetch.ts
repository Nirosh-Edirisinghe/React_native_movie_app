// fetchMovie
// fetchMovieDetails

import { useEffect, useState } from "react";

// useFetchMovie

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  const fechData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      // @ts-ignore
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  }

  useEffect(()=>{
    if(autoFetch){
      fechData();
    }
  },[]);

  return {data, loading, error, refetch: fechData, reset};
}

export default useFetch
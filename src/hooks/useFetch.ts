import { useEffect, useState } from "react";

interface Response<T> {
  data: T | null;
  error: any | null;
  loading: boolean;
  refetch: () => void;
}

export function useFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  further = true
): Response<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(input, init);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (further) {
      fetchData();
    }
  }, [input]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return { data, error, loading, refetch };
}

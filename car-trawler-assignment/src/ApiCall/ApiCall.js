import { useState, useEffect } from "react";

export const useHttps = (url, dependencies) => {
  const [isloading, setIsLoading] = useState(false);
  const [fetchedData, setFetchData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setFetchData(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return [isloading, fetchedData];
};

import { useEffect, useState } from "react";

export default function useLocalStorage(key, value) {
  const [data, setData] = useState(() => {
    if (value) {
      if (
        (typeof value !== "object" && !Array.isArray(value)) ||
        (typeof value === "object" && Object.keys(value).length) ||
        (Array.isArray(value) && value.length)
      )
        return value;
    }
    let localValue = localStorage.getItem(key);
    if (localValue) {
      localValue = JSON.parse(localValue);
      return localValue;
    }
    return [];
  });

  const updateData = (fnOrVale) => {
    if (fnOrVale) {
      if (typeof fnOrVale === "function") {
        setData(fnOrVale(data));
      } else setData(fnOrVale);
    }
  };

  useEffect(() => {
    localStorage.setItem(key, data ? JSON.stringify(data) : "");
  }, [key, data]);

  return [data, updateData];
}

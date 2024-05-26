import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStates } from "../services/searchService";

export default function useGeneric() {
  const [states, setStates] = useState([]);
  const location = useLocation();

  const loadStates = async () => {
    try {
      const resStates = await getStates();
      setStates(() => [...resStates]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let state = location.state;
    if (!state?.states?.length) {
      loadStates();
    } else {
      setStates(() => [...state.states]);
    }
  }, []);
  return { states };
}

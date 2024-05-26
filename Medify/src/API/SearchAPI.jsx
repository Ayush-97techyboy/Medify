import api from "./API";

export const fetchStates = async () => {
  const res = await api.get("/states");
  return res.data;
};

export const fetchCities = async (stateName) => {
  const res = await api.get(`/cities/${stateName}`);
  return res.data;
};

export const fetchHospitals = async (state, city) => {
  const res = await api.get(`/data?state=${state}&city=${city}`);
  return res.data;
};

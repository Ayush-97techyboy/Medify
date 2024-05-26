import { fetchCities, fetchHospitals, fetchStates } from "../API/SearchAPI";

export const getStates = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const states = await fetchStates();
      resolve(states);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCities = (stateName) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!stateName) {
        throw new Error("State name required !");
      }
      const cities = await fetchCities(stateName);
      resolve(cities);
    } catch (error) {
      reject(error);
    }
  });
};

export const getHospitals = (state, city) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!state || !city) {
        throw new Error("State and city name required !");
      }
      const hospitals = await fetchHospitals(state, city);
      resolve(hospitals);
    } catch (error) {
      reject(error);
    }
  });
};

const BASE_URL = 'https://meddata-backend.onrender.com';

export const apiService = {
  async getStates() {
    const response = await fetch(`${BASE_URL}/states`);
    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }
    return response.json();
  },

  async getCities(state) {
    const response = await fetch(`${BASE_URL}/cities/${encodeURIComponent(state)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    return response.json();
  },

  async getMedicalCenters(state, city) {
    const response = await fetch(
      `${BASE_URL}/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch medical centers');
    }
    return response.json();
  },

  async getHospitals(state, city) {
    const response = await fetch(
      `${BASE_URL}/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch hospitals');
    }
    return response.json();
  },
};

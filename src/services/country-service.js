import axios from "axios";

const BASE_URL = "https://restcountries-v1.p.rapidapi.com";

export async function fetchCountries() {
  const response = await axios.get(`${BASE_URL}/all`, {
    headers: {
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": `${process.env.REACT_APP_RAPIDAPI_KEY}`
    }
  });
  return response.data;
}

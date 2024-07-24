import { ENV_VARS } from "../config/envVars.js";
import axios from 'axios';



export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
      };


      const response = await axios.get(url, options)

      if (response.status !== 200) {
        console.error('Failed to fetch data from TMDB' + response.data.statusText);

      }

      return response.data;
};
import { Environment } from "../../../environments"
import { Api } from "../axios"


const getAll = async () => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en&api_key=${Environment.API_KEY}`
    const response = await Api.get(url)

    if (response) {
      return response.data
    }
  } catch (error) {
    return error
  }
}

const getByRated = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?include_adult=false&language=en&api_key=${Environment.API_KEY}`
    const response = await Api.get(url)

    if (response) {
      return response.data
    }
  } catch (error) {
    return error
  }
}

const getByGenre = async (genreId: number) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en&api_key=${Environment.API_KEY}&with_genres=${genreId}`
    const response = await Api.get(url);

    if (response) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};


export const MovieServices = {
  getAll, getByRated, getByGenre
}






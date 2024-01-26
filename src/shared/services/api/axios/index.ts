import axios from "axios"
import { Environment } from "../../../environments"

const Api = axios.create({
  baseURL: `https://api.themoviedb.org/3/discover/movie?api_key=${Environment.API_KEY}`
  
})

export {Api}
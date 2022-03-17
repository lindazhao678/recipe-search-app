import axios from "axios";
import config from '../config.json';

export function getResults(q){
    const api = `${config.recipeRootURL}/?type=public&q=${q}&app_id=e69c3227&app_key=${config.recipeKey}`;
    return axios.get(api);
}

export function fetch(link){
    return axios.get(link);
}

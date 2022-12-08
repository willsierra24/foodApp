import axios from 'axios'

export function getRecipes() {
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getRecipesByName (name) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/recipes?name=" + name)
            
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        let info = await axios.get ('http://localhost:3001/diets',{})
        return dispatch({
            type: 'GET_DIETS',
            payload: info.data})
    }
}

export function postRecipe (payload) {
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/recipes", payload)
        return response
    }
}

export function filterRecipesByDiet(payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function sortByName(payload){
    return{
        type: 'SORT_BY_NAME',
        payload
    }
}

export function sortByScore(payload){
    return{
        type: 'SORT_BY_SCORE',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/recipes/" + id);
        return dispatch ({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}
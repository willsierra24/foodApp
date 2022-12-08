import React from "react";
import { useDispatch} from 'react-redux';
import {filterRecipesByDiet, sortByName, sortByScore} from '../../actions/index'

function Filter ({setCurrentPage, setOrder}) {
    
    const dispatch = useDispatch();

    function handleSortByName(e){
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortByRating(e){
        e.preventDefault()
        dispatch(sortByScore(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterDiet(e){
        dispatch(filterRecipesByDiet(e.target.value))
    }

return 	<div>
<select title='Order By Name' onChange={e => handleSortByName(e)}>
    <option hidden value="">Order By Name</option>
    <option value="Asc">Ascendant</option>
    <option value="Desc">Descendant</option>
</select>
<select onChange={e => handleSortByRating(e)}>
    <option hidden value="">Order By Health Score</option>
    <option value="ScoreAsc">Ascendant</option>
    <option value="ScoreDesc">Descendant</option>
</select>
<select onChange={e => handleFilterDiet(e)}>
    <option hidden value="">Filter By Diet</option>
    <option value="All">All</option>
    <option value="gluten free">Gluten free</option>
    <option value="dairy free">Dairy free</option>
    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
    <option value="vegan">Vegan</option>
    <option value="paleolithic">Paleolithic</option>
    <option value="primal">Primal</option>
    <option value="fodmap friendly">Fodmap friendly</option>
    <option value="whole 30">Whole 30</option>
    <option value="pescatarian">Pescatarian</option>
    <option value="ketogenic">Ketogenic</option>
</select>
</div>
}

export default Filter
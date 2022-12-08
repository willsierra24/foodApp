import React from 'react';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {getRecipes} from '../../actions/index'
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter'
import Pagination from '../Pagination/Pagination';

function Home() {
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes);
	const [currentPage, setCurrentPage] = useState(1);
	const [recipesPerPage] = useState(9);
	const indexOfLastRecipe = currentPage * recipesPerPage;
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
	const currentRecipes = allRecipes.slice(
		indexOfFirstRecipe,
		indexOfLastRecipe
	);

	const pagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getRecipes());
	}, [dispatch]);

	const [order, setOrder] = useState('')

	return (
		<div className='firstDiv'>
			<h1 className='logo'>Recipes Book</h1>
            <SearchBar/>
			<Filter
			setOrder = {setOrder}
			setCurrentPage = {setCurrentPage}
			/>
			<Link to={'/recipes'}><button className='create'>Post a Recipe</button></Link>
			<Pagination
			recipesPerPage={recipesPerPage}
			allRecipes={allRecipes.length}
			pagination={pagination}
			/>
			<div>
				{
					currentRecipes?.map((e) => {
						let diet = ""
						let dietDb = []
						if(e.Diets){
							e.Diets.forEach(e =>dietDb.push(e.name) )
						}
						
						let dietM = dietDb.forEach((g, index) => {index === e.Diets.length -1 ? diet += g + "." : diet += g + ", "})
						if(e.diets){
						e.diets.forEach((g, index) => {index === e.diets.length -1 ? diet += g + "." : diet += g + ", "}) 
						;}
						
						return (
							<div className='cards'>
								<Link to={'/home/' + e.id} className="text">
									<Card
										name={e.name}
										diet={dietM || diet}
										image={e.img}
									/>
								</Link>
							</div>
							
						);
					})}
					</div>
		</div>
	);
}

export default Home;

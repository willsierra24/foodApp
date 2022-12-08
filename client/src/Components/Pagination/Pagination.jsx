import React from "react";
import './Pagination.css'

export default function Pagination({ recipesPerPage, allRecipes, pagination}) {
	const pageNumbers = [];

	for (let i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<ul className='pagination'>
				{pageNumbers.map((e) => (
						<li className='item' key={e}>
							<button onClick={() => pagination(e)}>{e}</button>
						</li>
					))}
			</ul>
		</nav>
	);
}

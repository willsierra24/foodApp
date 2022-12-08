const initialState = {
	recipes: [],
	detail: [],
	allRecipes: [],
	diets: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_RECIPES':
			return {
				...state,
				recipes: action.payload,
				allRecipes: action.payload,
			};
		case 'GET_NAME_RECIPES':
			return {
				...state,
				recipes: action.payload,
			};
		case 'GET_DIETS':
			return {
				...state,
				diets: action.payload,
			};
		case 'POST_RECIPES':
			return {
				...state,
			};
		case 'FILTER_BY_DIET':
			const allRecipes = state.allRecipes;
			let recipesDb = [];
			allRecipes.forEach((e) =>
				e.diets[0]
					? e.diets.forEach((f) =>
							f === action.payload ? recipesDb.push(e) : ''
					  )
					: ''
			);
			const dietFiltered =
				action.payload === 'All'
					? allRecipes
					: allRecipes.filter((e) => e.diets.includes(action.payload));
			recipesDb = [...recipesDb, ...dietFiltered];
			return {
				...state,
				recipes: recipesDb,
			};
		case 'SORT_BY_NAME':
			const sortedByName =
				action.payload === 'Asc'
					? state.allRecipes.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (a.name < b.name) {
								return 1;
							}
							return 0;
					  })
					: state.allRecipes.sort(function (a, b) {
							if (a.name < b.name) {
								return -1;
							}
							if (a.name > b.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				recipes: sortedByName,
			};
		case 'SORT_BY_SCORE':
			const sortedByRating =
				action.payload === 'ScoreAsc'
					? state.allRecipes.sort((a, b) => a.healthScore - b.healthScore)
					: state.allRecipes.sort((a, b) => b.healthScore - a.healthScore);
			return {
				...state,
				recipes: sortedByRating,
			};
		case 'GET_DETAILS':
			return {
				...state,
				detail: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer;

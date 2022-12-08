const axios = require('axios');
const { Recipes, Diets } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getApiRecipes = async () => {
	const apiUrl = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);
	const resultApi = apiUrl.data.results.map((e) => {
		return {
			id: e.id,
			name: e.title,
			img: e.image,
			diets: e.diets,
			dishTypes: e.dishTypes,
			healthScore: e.healthScore,
			resume: e.summary,
		};
	}); 
	return resultApi;
};

const getDbRecipes = async () => {
	return await Recipes.findAll({
		include: {
			model: Diets,
			attributes: ['id', 'name'],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllRecipes = async () => {
	const apiData = await getApiRecipes();
	const dbData = await getDbRecipes();
	const allRecipes = [...apiData, ...dbData];
	return allRecipes;
};

const getRecipes = async (req, res) => {
	try {
		const { name } = req.query;
		if (name) {
			const allRecipes = await getAllRecipes();
			const allRecipesFiltered = await allRecipes.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase().replace('20', ' '))
			);
			if (allRecipesFiltered.length) {
				return res.status(200).json(allRecipesFiltered);
			} else return res.status(200).send("There isn't recipes with this name");
		}
		return res.status(200).json(await getAllRecipes());
	} catch (error) {
		return res.status(400).send(error);
	}
};

const getRecipesById = async (req, res) => {
	try {
		const { idRecipes } = req.params;
		if (idRecipes.length > 10) {
			const detailDb = await Recipes.findByPk(idRecipes, {
				include: {
					model: Diets,
					attributes: ['id', 'name'],
					through: {
						attributes: [],
					},
				},
			});
			return res.status(200).json(detailDb);
		}
		if (idRecipes.length < 10 && idRecipes.length > 1) {
			const detailApi = await axios.get(
				`https://api.spoonacular.com/recipes/${idRecipes}/information?apiKey=${API_KEY}`
			);
			const details = {
				name: detailApi.data.title,
				img: detailApi.data.image,
				dishTypes: detailApi.data.dishTypes,
				diets: detailApi.data.diets,
				resume: detailApi.data.summary,
				healthScore: detailApi.data.healthScore,
				stepByStep: detailApi.data.instructions,
			};
			return res.status(200).json(details);
		} else res.status(200).send('No existe ninguno');
	} catch (error) {
		res.status(400).send(error);
	}
};

const createRecipes = async (req, res) => {
	try {
		const { name, img, resume, healthScore, stepByStep, diets } = req.body;
		const newRecipe = await Recipes.create({
			name,
			img,
			resume,
			healthScore,
			stepByStep,
		});
		const dietsDb = await Diets.findAll({
			where: { name: diets },
		});
		newRecipe.addDiets(dietsDb);
		res.status(200).json({ success: 'created' });
	} catch (error) {
		return res.status(400).send(error);
	}
};

const getDiets = async (req, res) => {
	try {
		const apiUrl = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
		);
		const resultApi = apiUrl.data.results.map((e) => {
			return e.diets;
		});
		const apiDiets = [];
		await resultApi.forEach((el) =>
			el.forEach((e) => (apiDiets.includes(e) ? '' : apiDiets.push(e)))
		);
		apiDiets.forEach((e) => {
			Diets.findOrCreate({
				where: { name: e },
			});
		});
		const getDiets = await Diets.findAll();
		return res.status(200).send(getDiets);
	} catch (error) {
		return res.status(400).send(error);
	}
};

module.exports = { getRecipes, getRecipesById, createRecipes, getDiets };

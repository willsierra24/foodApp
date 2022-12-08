const { Router } = require('express');
const {getRecipes, getRecipesById, createRecipes, getDiets} = require('../controllers/recipeControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', getRecipes)

router.get('/recipes/:idRecipes', getRecipesById)

router.post('/recipes', createRecipes)

router.get('/diets', getDiets)

module.exports = router;
 
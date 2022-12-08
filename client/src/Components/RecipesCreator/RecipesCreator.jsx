import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from '../../helpers/validators';
import './RecipesCreator.css'


export default function RecipesCreator () {

    const dispatch = useDispatch();
    const history = useHistory()
	const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({})

	const [input, setInput] = useState({
		name: '',
		img: '',
		resume: '',
		healthScore: '', 
		stepByStep: '',
		diets: []
	});

    function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
	}

	function handleCheck(e) {
		if (e.target.checked) {
			setInput({
				...input,
				diets: [...input.diets, e.target.value],
			});
		}
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
		console.log(input);
	}

    function handleSubmit(e) {
		e.preventDefault();
		dispatch(postRecipe(input));
		alert('Recipe posted');
		setInput({
		name: '',
		img: '',
		resume: '',
		healthScore: '', 
		stepByStep: '',
		diets: []
		});
        history.push("/home")
	}

    useEffect(() => {
		dispatch(getDiets());
	}, []);

return (
    <div>
        <Link to="/home">
            <button className='back'>Volver</button>
        </Link>
        <h1 className='title'>Post a Recipe</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='forms'>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                />
                {errors.name? <p className='errors'>{errors.name}</p>: ""}
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="text"
                    value={input.img}
                    name="img"
                    onChange={(e) => handleChange(e)}
                />
                {errors.img? <p className='errors'>{errors.img}</p>: ""}
            </div>
            <div>
                <label>Resume:</label>
                <input
                    type="text"
                    value={input.resume}
                    name="resume"
                    onChange={(e) => handleChange(e)}
                />
                {errors.resume? <p className='errors'>{errors.resume}</p>: ""}
            </div>
            <div>
                <label>Health Score:</label>
                <input
                    type="number"
                    min="0" max="100"
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(e) => handleChange(e)}
                />
                {errors.healthScore? <p className='errors'>{errors.healthScore}</p>: ""}
            </div>
            <label className='step'>Step By Step:</label>
            <div className='steps'>
                
                <textarea
                    value={input.stepByStep}
                    name="stepByStep"
                    onChange={(e) => handleChange(e)}
                    cols="80"
                    rows="5"
                />
            </div>
            </div>
            <div>
                <label>Diets:</label>
                {diets.map((e) => (
                    <label>
                        <input
                            onChange={(e) => handleCheck(e)}
                            type="checkbox"
                            name={e.name}
                            value={e.name}
                        />
                        {e.name}
                    </label>
                ))}
                {errors.diets? <p className='errors'>{errors.diets}</p>: ""}
            </div>

                      <div>
            {Object.keys(errors).length !== 0 ? (
              <div>
                <button
                  disabled
                >
                  <p>Complete the form</p>
                </button>
              </div>
            ) : (
              <div >
                <button
                  type="submit"
                >
                  Create
                </button>
              </div>
            )}
          </div>  
            
            {/* <div>
                <button className='submit' type="submit">Post Recipe</button>
            </div> */}
        </form>
    </div>
);
}
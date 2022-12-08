import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions";
import './Details.css'

export default function Details (props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [])

    const myRecipe = useSelector ((state) => state.detail)
    
    return (
        <div >
            {
                myRecipe.name ?
                <div className="content">
                    <h1 className="title">{myRecipe.name}</h1>
                    <img className="img" src={myRecipe.img} alt={myRecipe.name} />

                    <div>
                    <p><b>Diets</b></p>
                    {myRecipe.diets? myRecipe.diets.map(e => <p className="diets">{e}</p> ) : myRecipe.Diets.map(e => <p className="diets">{e.name}</p> )}
                    </div>

                    <div>
                    {myRecipe.dishTypes? <p><b>DishType</b></p> : ""} 
                    {myRecipe.dishTypes? myRecipe.dishTypes.map((e) => <p>{e}</p>) : ""}
                    </div>

                    {myRecipe.diets?
                    <div>
                        <p className="text"><b>Resume </b></p>
                    <p className="text" dangerouslySetInnerHTML={{__html:myRecipe.resume}}/>
                    </div> : 
                    <div>
                        <p>Resume</p>
                    <p className="paragraph">{myRecipe.resume} </p>
                    </div>}



                    {myRecipe.diets? <div>
                    <p className="text"><b>Step By Step</b></p>
                    <p className="text" dangerouslySetInnerHTML={{__html:myRecipe.stepByStep}}/>
                    </div> :
                    <div>
                    <p><b>Step By Step</b></p>
                    <p>{myRecipe.stepByStep} </p>
                    </div>}

                </div> : <h1>Loading...</h1>
            }
            <Link to ='/home'>Go home</Link>
        </div>
    )
}
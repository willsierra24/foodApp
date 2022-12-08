import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
	return (
		<div className="information">
			<h1 className="titulo">Recipes Book</h1>
            <Link to ='/home'>
			<button className="button">Entrar</button>
            </Link>
		</div>
	);
}

export default LandingPage;

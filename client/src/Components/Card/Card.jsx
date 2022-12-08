import React from 'react';
import './Card.css';

export default function Card({ name, diet, image }) {
	return (
		<div className="card">
			<h3 className="title text">{name}</h3>
			<h5 h5 className="genres text">{diet}</h5>
			<img src={image} alt={name} width="250px" height='250px'/>
		</div>
	);
}

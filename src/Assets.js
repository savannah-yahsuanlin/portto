import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Assets = () => {
	const { assets } = useSelector(state => state)

	return (
		<div className="cards">
		{
		assets.map(asset => {
		return (
			<div className="card" key={asset.id}>
			<Link to={`/assets/${asset.id}`}>
			<div>
			<span>{asset.id}</span>
			<h2>{asset.collectionName }</h2>
			<img src={asset.image_url} alt={asset.name} />
			</div>
			</Link>
			</div>
		)
		})
		}
		</div>
	)
}


export default Assets;

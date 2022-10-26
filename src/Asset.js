import React  from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Asset = () => {
  const { id } = useParams();
	const { assets } = useSelector(state => state)
	const asset = assets.find(asset => asset.id === id*1)
  return (
		<div>
			<h1> <span>></span> <a href={`${asset.permalink}`} target="_blank">{asset.collectionName}</a></h1>
			<img src={asset.image_url}/>
			<h2>Name: {asset.name ? asset.name : 'Null'}</h2>
			<h2>Description: {asset.description}</h2>
			<h4><Link to='/assets'>Go Back</Link></h4>
		</div>
	);
};

export default Asset;

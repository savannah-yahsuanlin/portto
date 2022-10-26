import React, { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssets } from './store';
import Assets from "./Assets";
import Asset from "./Asset";

const App = () => {
  const { assets } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAssets())
  }, [])

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/assets">Assets({ assets.length })</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <div>Home</div> } />
        <Route path="/assets" element={ <Assets /> } />
        <Route path="/assets/:id" element={ <Asset /> } />
      </Routes>
    </div>
  );
};

export default App;

import axios from 'axios';
import React  from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [filterPlatformData, setFilterPlatformData] = useState([]);

  async function getDataFromApi(sortby = 'popularity') {

    let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
      headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68' },
      params: { 'sort-by': 'popularity' }
    });

    setFilterPlatformData(data);
  };

  useEffect(() => {
    getDataFromApi()

  }, [])

  return <>

    <div className="home-header">
      <div className="d-flex flex-column justify-content-center h-100 align-items-center">
        <h1 className='text-muted'>Find & track the best <span className='badge-text-color'>free-to-play </span>
          games!</h1>
        <p className='text-muted fa-1x'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <Link className='btn btn-outline-secondary' to='/all'>Browse Games</Link>
      </div>


    </div>
    <div className="container">
      <h2 className='text-muted pt-4 fw-bolder'> <i className="fa-solid fa-robot"></i> Personalized Recommendations</h2>

      <div className="row my-5">
        {filterPlatformData.slice(0, 3).map((game, index) =>
          <div key={index} className="col-md-4">

            <Link to={'/gamedetails/'+game.id}>
              <div className="item shadow-lg">
              <img src={game.thumbnail} className='w-100' alt="" />
              <div className='d-flex justify-content-between'>
                <h2 className='h5 text-white p-3'>{game.title}</h2>
                <span className='badge badge-bg m-3 text-white d-flex justify-content-center align-items-center'>FREE</span>
              </div>
            </div></Link>

          </div>
        )}

      </div>
    </div>
  </>
}

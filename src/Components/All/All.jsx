import React from 'react';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MediaContext } from '../Context/MediaContext';


export default function All() {
  let { apiData } = useContext(MediaContext);

  return <>

    <div className="container">
      <div className="row justify-content-center mt-5 mb-4 g-3">
        {apiData.map((game, index) =>
          <div key={index} className="col-md-3 ">
            <Link to={'/gamedetails/' + game.id}>
              <div className="item shadow-lg rounded-2">
                <img src={game.thumbnail} className='w-100 rounded-2' alt="" />
                <div className='d-flex justify-content-between'>
                  <h2 className='h5 text-white text-truncate p-3'>{game.title}</h2>
                  <span className='badge float-right badge-bg m-3 text-white d-flex justify-content-center align-items-center'>FREE</span>
                </div>
                <p className="text-muted ps-3 w-75 fa-bolder text-truncate">{game.short_description}</p>

                <div className="d-flex justify-content-between">
                  <i class="fas fa-plus-square ps-3 pb-3 text-muted"></i>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className='badge bg-secondary text-dark badge-genre me-3 mb-3'>{game.genre}</span>
                    {game.platform == "PC (Windows)" ? <i class="fa-brands fa-windows me-3 mb-3 text-muted"></i> : <i class="fa-solid fa-window-maximize me-3 mb-3 text-muted"></i>}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      {/* <div className="d-flex justify-content-center mb-5">
      <button className='btn btn-outline-secondary'> More Games <i class="fa-solid fa-angle-right"></i></button>

      </div> */}

    </div>
  </>
}


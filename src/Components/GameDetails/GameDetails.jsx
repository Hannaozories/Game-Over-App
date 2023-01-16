import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function GameDetails() {

    const { id } = useParams();
    let [gameDetails, setgameDetails] = useState(null);
    async function getGameDetails() {
        let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game',
            {
                params: { id: id },
                headers: {
                    'X-RapidAPI-Key': '5ea8195eaemshbb3ce46380802f2p11e990jsne0fdbaec0333',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
        setgameDetails(data)
    }

    useEffect(() => {
        getGameDetails()

    }, []);

    let settings = {
        dots: false,
        infinite: true,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return <>
        {gameDetails !== null ?
            <div className="container">
                <div className="row" >
                    <div className="col-md-4 mt-5 ">
                        <img src={gameDetails.thumbnail} className='w-100  rounded-2' alt="" />
                        <div className="d-flex justify-content-between">
                            <button className='btn btn-dark text-uppercase '>free</button>
                            <a href={gameDetails.game_url} target='_blank' className='btn badge-bg text-uppercase w-75 me-3 text-white'>play now <i className="fa-solid fa-right-from-bracket"></i></a>

                        </div>
                    </div>
                    <div className="col-md-8 mt-5">
                        <h3 className="h1 text-muted">{gameDetails.title}</h3>
                        <p className="text-muted game-p">About {gameDetails.title}<br />{gameDetails.description}</p>
                        {gameDetails.platform == 'Windows' ?   <>     <h4 className='text-muted'>Minimum System Requirements</h4>
                        <p className='text-muted'><span className='fw-bolder'>Graphics:</span> {gameDetails.minimum_system_requirements.graphics}</p>
                        <p className='text-muted'><span className='fw-bolder'>Memory:</span> {gameDetails.minimum_system_requirements.memory}</p>
                        <p className='text-muted'><span className='fw-bolder'>OS:</span> {gameDetails.minimum_system_requirements.os}</p>
                        <p className='text-muted'><span className='fw-bolder'>Processor:</span> {gameDetails.minimum_system_requirements.processor}</p>
                        <p className='text-muted'><span className='fw-bolder'>Storage:</span> {gameDetails.minimum_system_requirements.storage}</p></>:''}


                        <h3 className=" text-muted mt-4">{gameDetails.title} Screenshots</h3>
                        <Slider {...settings}>
                            {gameDetails.screenshots.map((game) =>
                                <div key={game.id}> <img src={game.image} className='w-100' alt="" /></div>)}
                        </Slider>

                        <h2 className='text-muted my-4'>Additional Information</h2>
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <h4 className='text-muted h6'>Title</h4>
                                <p className='text'>{gameDetails.title}</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className='text-muted h6'>Developer</h4>
                                <p className='text'>{gameDetails.developer}</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className='text-muted h6'>Publisher</h4>
                                <p className='text'>{gameDetails.publisher}</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className='text-muted h6'>Release Date</h4>
                                <p className='text'>{gameDetails.release_date}</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className='text-muted h6'>Genre</h4>
                                <p className='text'>{gameDetails.genre}</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className='text-muted h6'>Platform</h4>
                                <p className='text'>{gameDetails.platform}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div> : ''}

    </>
}

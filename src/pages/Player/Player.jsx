import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
const Player = () => {
   const  {id}=useParams()
   const navigate=useNavigate()
  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    type:"",
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE2NzU5MDI4N2U3M2MzYzg0OTIwZGM3ZGE5OTUxZCIsIm5iZiI6MTc3MTg0MTEzNi4zNjksInN1YiI6IjY5OWMyNjcwNWM0ZWRhNTRjZjU5MTJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10eM01BbuKPfqgJ6NSzmbH7Mowy1aBYYGcVkTFB2uYg'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res =>setApiData(res.results[0]))
      .catch(err => console.error(err));

  }, [id])



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>navigate('/')}/>
      <iframe width="90%" height="90%" src={`https://youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen>
      </iframe>
      <div className=' player-info'>
        <p>{apiData?.published_at?.slice(0,10)} </p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player

import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react';
import "../Home/Home.css"
import hero from '../../static/images/hero.png'
import villan from '../../static/images/villan.png'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {

  const [heroHealth,setHeroHealth] = useState(0);
  const [villanHealth,setVillanHealth] = useState(0);
  const [trueOrFalse,setTrueOrFalse] = useState(true);
  const [gamePlay,setGamePlay] = useState(true);

  const getHeroHealth = async () =>{
    const {data} = await axios.get("http://localhost:8080/api/health",{params:{
      heroOrVillan:"Hero"
    }})
    setHeroHealth(data)
  }

  const getVillanHealth = async () =>{
    const {data} = await axios.get("http://localhost:8080/api/health",{params:{
      heroOrVillan:"Villan"
    }})
    setVillanHealth(data)
  }

  const postOfHero = async () =>{
    await axios.post("http://localhost:8080/api/shoot",{},{params:{
      heroOrVillan:"Hero"
    }}).then((response)=>{
      console.log(response);
    })
    getVillanHealth();
  }

  const postOfVillan = async () =>{
    await axios.post("http://localhost:8080/api/shoot",{},{params:{
      heroOrVillan:"Villan"
    }}).then((response)=>{
      console.log(response);
    })
    getHeroHealth();
  }

  const setArmourOfVillan = async () =>{
    await axios.post("http://localhost:8080/api/armour",{},{params:{
      trueOrFalse:trueOrFalse
    }}).then((response)=>{
      console.log(response);
    })
    setTrueOrFalse(!trueOrFalse);
  }

  const resetGame = async () =>{
    await axios.post("http://localhost:8080/api/reset",{}).then((response)=>{
      console.log(response);
    })
    getHeroHealth();
    getVillanHealth();
    setGamePlay(true)
    setTrueOrFalse(false)
  }

  const getGamePlay = () =>{
    console.log(gamePlay)
    if(heroHealth<=20 || (villanHealth<=20)){
      setGamePlay(!gamePlay)
    }
  }

  useEffect(()=>{
    getHeroHealth();
    getVillanHealth();
  },[])


  return (
    <>
    <div className='main-container' data-testid="container">
      {!gamePlay && <i aria-disabled="true" data-testid="resetButton" class="fa-solid fa-arrows-rotate" onClick={()=>resetGame()} style={{fontSize:'4rem',cursor:'pointer',position:'absolute',left:'45%',top:'38%'}}></i>}
      <div data-testid="HeroContainer" className='HeroContainer'>
        <input data-testid="HeroHealth" type="range" min="0" max="100" value={heroHealth} readOnly/>
        <span style={{position:'absolute',left:'4.2rem',top:'19rem',fontWeight:'bolder'}}>{heroHealth>=0 ? heroHealth:0}</span>
        <img src={hero} alt='hero-image'/>
        {gamePlay && <i class="fa-solid fa-gun" data-testid='shootButtonHero' onClick={()=>{postOfHero(); getGamePlay()}} style={{fontSize:'5rem',cursor:'pointer'}}></i>}
      </div>
      <div data-testid="VillanContainer" className='VillanContainer'>
        <input data-testid="VillanHealth" className='villan-input' type="range" min="0" max="100" value={villanHealth} readOnly/>
        <span style={{position:'absolute',left:'72.2rem',top:'19rem',fontWeight:'bolder'}}>{villanHealth>=0 ? villanHealth:0}</span>
        <img src={villan} alt='villan-image'/>
        <div data-testid="villanPower" className='villanPower'>
        {gamePlay && <i class="fa-solid fa-gun fa-flip-horizontal" data-testid='shootButtonVillan' onClick={()=>{postOfVillan();getGamePlay()}} style={{fontSize:'5rem',cursor:'pointer'}}></i>}
        {gamePlay && <i data-testid="armourButton" class="fa-solid fa-shield-halved" onClick={()=>setArmourOfVillan()} style={{fontSize:'5rem',cursor:'pointer'}} ></i>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home

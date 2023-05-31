import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react';
import "../Home/Home.css"
import hero from '../../static/images/hero.png'
import villan from '../../static/images/villan.png'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {

  const [heroHealth,setHeroHealth] = useState(1);
  const [villanHealth,setVillanHealth] = useState(1);
  const [trueOrFalse,setTrueOrFalse] = useState(false);
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
    }})
    getVillanHealth();
  }

  const postOfVillan = async () =>{
    await axios.post("http://localhost:8080/api/shoot",{},{params:{
      heroOrVillan:"Villan"
    }})
    getHeroHealth();
  }

  const setArmourOfVillan = async () =>{
    await axios.post("http://localhost:8080/api/armour",{},{params:{
      trueOrFalse:trueOrFalse
    }})
    setTrueOrFalse(!trueOrFalse);
    console.log(trueOrFalse)
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


  useEffect(()=>{
    getHeroHealth();
    getVillanHealth();
  },[])

  useEffect(()=>{
    console.log(heroHealth)
    console.log(trueOrFalse)
    if(heroHealth<=0){
      setGamePlay(!gamePlay);
      setTrueOrFalse(false);
    }
  },[heroHealth])

  useEffect(()=>{
    console.log(villanHealth)
    console.log(trueOrFalse)
    if(villanHealth<=0){
      setGamePlay(!gamePlay);
      setTrueOrFalse(false);
    }
  },[villanHealth])


  return (
    <>
    <div className='main-container' data-testid="container">
      {!gamePlay && <i data-testid="resetButton" className="fa-solid fa-arrows-rotate" onClick={()=>resetGame()} style={{fontSize:'4rem',cursor:'pointer',position:'absolute',left:'45%',top:'38%'}}></i>}
      <div data-testid="HeroContainer" className='HeroContainer'>
        <input data-testid="HeroHealth" type="range" min="0" max="100" value={heroHealth} readOnly/>
        <span data-testid="HeroHealthValue" style={{position:'absolute',left:'4.2rem',top:'19rem',fontWeight:'bolder'}}>{heroHealth>=0 ? heroHealth:0}</span>
        <img src={hero} alt='hero-image'/>
        {gamePlay && <i className="fa-solid fa-gun" data-testid='shootButtonHero' onClick={()=>{postOfHero()}} style={{fontSize:'5rem',cursor:'pointer'}}></i>}
      </div>
      <div data-testid="VillanContainer" className='VillanContainer'>
        <input data-testid="VillanHealth" className='villan-input' type="range" min="0" max="100" value={villanHealth} readOnly/>
        <span data-testid="VillanHealthValue" style={{position:'absolute',left:'73.2rem',top:'19rem',fontWeight:'bolder'}}>{villanHealth>=0 ? villanHealth:0}</span>
        <img src={villan} alt='villan-image'/>
        <div data-testid="villanPower" className='villanPower'>
        {gamePlay && <i className="fa-solid fa-gun fa-flip-horizontal" data-testid='shootButtonVillan' onClick={()=>{postOfVillan()}} style={{fontSize:'5rem',cursor:'pointer'}}></i>}
        {gamePlay && <i data-testid="armourButton" className="fa-solid fa-shield-halved" onClick={()=>setArmourOfVillan()} style={{fontSize:'5rem',cursor:'pointer'}} ></i>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home

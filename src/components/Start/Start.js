import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Start/Start.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Start = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className='mainContainer'>
            <div className='Header'>
                <h1>Arsenal Assault</h1>
            </div>
            <div className='StartButton'>
                <i class="fa-solid fa-circle-play fa-2xl" data-testid="buttonClick" onClick={()=>navigate("/game")}></i>
            </div>
            <div data-testid="instruction-test" className='instruction'>
                <h1>instruction</h1>
                <div data-testid="instruction-content-test" className="instruction-content">
                    <span data-testid="instruction-each">The game consists of a hero and a villain.</span>
                    <span data-testid="instruction-each">The hero can shoot the villain, and the villain can shoot the hero.</span>
                    <span data-testid="instruction-each">When the hero shoots the villain, the villain's health is reduced by 20.</span>
                    <span data-testid="instruction-each">When the villain shoots the hero, the hero's health is reduced by 20.</span>
                    <span data-testid="instruction-each">The villain has armor that can be activated, reducing the health reduction to 10 when hit.</span>
                    <span data-testid="instruction-each">Both the hero and villain start with a health value of 100.</span>
                </div>
            </div>
        </div>

        </>
    )
}

export default Start

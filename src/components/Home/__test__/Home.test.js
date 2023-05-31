import {fireEvent, render,screen, waitFor} from '@testing-library/react';
import Home from '../Home';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const MockHome = () =>{
    return(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )
}

jest.mock('../../../__mocks__/axios');

it("should contain a main section in the screen",async ()=>{
    await act( async () => render(<MockHome/>));
    const mainSection = screen.getByTestId('container');
    expect(mainSection).toBeInTheDocument();
})

it("should display a hero image in the screen",async ()=>{
    await act( async () => render(<MockHome/>));
    const heroImage = screen.getByAltText('hero-image');
    expect(heroImage).toBeVisible();
})

it("should display a villan image in the screen",async ()=>{
    await act( async () => render(<MockHome/>));
    const villanImage = screen.getByAltText('villan-image');
    expect(villanImage).toBeVisible();
})


it("Should Contain Hero Section in the screen",async ()=>{
    await act( async () => render(<MockHome/>));
    const heroSection = screen.getByTestId("HeroContainer");
    screen.debug(heroSection)
    expect(heroSection).toBeInTheDocument();
})

it("Should Contain Hero Section in the screen",async ()=>{
    await act( async () => render(<MockHome/>));
    const villanSection = screen.getByTestId("VillanContainer");
    screen.debug(villanSection)
    expect(villanSection).toBeInTheDocument();
})

it("Should Contain Villan Power in the screen",async ()=>{
    await act( async () => render(<MockHome/>));
    const villanPower = screen.getByTestId("villanPower");
    screen.debug(villanPower)
    expect(villanPower).toBeInTheDocument();
})

it("Should show the health of the hero",async ()=>{
    await act( async () => render(<MockHome/>));
    const heroHealth = screen.getByTestId("HeroHealth");
    screen.debug(heroHealth);
    expect(heroHealth).toBeVisible();
})

it("Should show the health of the hero",async ()=>{
    await act( async () => render(<MockHome/>));
    const heroHealth = screen.getByTestId("HeroHealth");
    screen.debug(heroHealth);
    expect(heroHealth).toBeVisible();
})

it("Should show the health of the hero",async ()=>{
    await act( async () => render(<MockHome/>));
    const heroHealth = screen.getByTestId("VillanHealth");
    screen.debug(heroHealth);
    expect(heroHealth).toBeVisible();
})

it("Should have the shoot button for hero in the hero section",async ()=>{
    await act( async () => render(<MockHome/>));
    const shootButtonHero = screen.getByTestId("shootButtonHero");
    expect(shootButtonHero).toBeVisible();
})

it("Should have the shoot button for villan in the villan section",async ()=>{
    await act( async () => render(<MockHome/>));
    const shootButtonVillan = screen.getByTestId("shootButtonVillan"); 
    expect(shootButtonVillan).toBeVisible();
})

it("Should have armour button for villan in the villan section",async ()=>{
    await act( async () => render(<MockHome/>));
    const armourButtonVillan = screen.getByTestId("armourButton");
    expect(armourButtonVillan).toBeVisible();
})

it("should check the fetch api of getHealth Of Hero",async ()=>{
    await act( async () => render(<MockHome/>));
    const heroHealth = await screen.findByTestId("HeroHealthValue")  
    screen.debug(heroHealth);
    await waitFor(()=>{
        expect(heroHealth.innerHTML).toBe("100");
    })
})

it("should check the fetch api of getHealth of Villan",async ()=>{
    await act( async () => render(<MockHome/>));
    const villanHealth = await screen.findByTestId("VillanHealthValue")  
    screen.debug(villanHealth);
    await waitFor(()=>{
        expect(villanHealth.innerHTML).toBe("100");
    })
})

it("should check the post request of hero",async ()=>{
    await act( async () => render(<MockHome/>));
    const response = await axios.post("http://localhost:8080/api/shoot",{},{params:{
        heroOrVillan:"Hero"
    }});
    await waitFor(()=>{
        expect(response.data).toBe("Success Of Hero");
        expect(response.status).toBe(201);
    })
})

it("should check the post request of villan",async ()=>{
    await act( async () => render(<MockHome/>));
    const response = await axios.post("http://localhost:8080/api/shoot",{},{params:{
        heroOrVillan:"Villan"
    }});
    await waitFor(()=>{
        expect(response.data).toBe("Success Of Villan");
        expect(response.status).toBe(201);
    })
})

it("should check the post request of armour",async ()=>{
    await act( async () => render(<MockHome/>));
    const response = await axios.post("http://localhost:8080/api/armour",{});
    await waitFor(()=>{
        expect(response.data).toBe("Success Of Armour");
        expect(response.status).toBe(201);
    })
})

it("should check the post request of reset",async ()=>{
    await act( async () => render(<MockHome/>));
    const response = await axios.post("http://localhost:8080/api/reset",{});
    await waitFor(()=>{
        expect(response.data).toBe("Success Of Reset");
        expect(response.status).toBe(201);
    })
})
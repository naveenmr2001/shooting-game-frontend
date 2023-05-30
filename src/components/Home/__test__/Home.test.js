import {fireEvent, render,screen, waitFor} from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
    const heroHealth = await screen.findByTestId("HeroHealth")  
    screen.debug(heroHealth);
    await waitFor(()=>{
        expect(heroHealth.value).toBe("100");
    })
})

it("should check the fetch api of getHealth of Villan",async ()=>{
    await act( async () => render(<MockHome/>));
    const villanHealth = await screen.findByTestId("VillanHealth")  
    screen.debug(villanHealth);
    await waitFor(()=>{
        expect(villanHealth.value).toBe("100");
    })
})

it("should check the post request of hero",async ()=>{
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('http://localhost:8080/api/shoot').expectedStatusCode(201);
    await act( async () => render(<MockHome/>));
    expect(mockAdapter.history.get.length).toBe(1);
    const response = await axios.get('http://localhost:8080/api/shoot');
    expect(response.status).toBe(201);
})
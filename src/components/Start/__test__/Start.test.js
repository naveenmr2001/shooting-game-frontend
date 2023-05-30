import {fireEvent, render,screen} from '@testing-library/react';
import Start from '../Start';
import {createMemoryHistory} from 'history';
import { BrowserRouter,Router,createMemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router'


const MockStart = () =>{
    return(
        <BrowserRouter>
            <Start/>
        </BrowserRouter>
    )
}

const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

it("Should have render the heading of the shooting",()=>{
    render(<MockStart/>);
    const header = screen.getByRole("heading",{name:"Arsenal Assault"});
    expect(header).toBeVisible();
})

it("Should have button to start the game",()=>{
    render(<MockStart/>);
    const buttonStart = screen.getByTestId("buttonClick");
    expect(buttonStart).toBeVisible();
})

it("check the button navigate the page",async ()=>{
    const history = createMemoryHistory();
    render(<BrowserRouter history={history}><Start/></BrowserRouter>)
    const buttonStart = screen.getByTestId("buttonClick");
    await act(async ()=> userEvent.click(buttonStart))    
    expect(navigate).toHaveBeenCalledWith('/game');
})

it("should check the play button at the time of hover",async ()=>{
    render(<MockStart/>);
    const buttonPlay = screen.getByTestId("buttonClick");
    buttonPlay.addEventListener('mouseover', () => {
        buttonPlay.classList.add('hover-effect'); // Replace 'hover-effect' with the CSS class used for the hover effect
    });
    buttonPlay.addEventListener('mouseout', () => {
        buttonPlay.classList.remove('hover-effect');
    });
    await act(async ()=>fireEvent.mouseOver(buttonPlay));
    expect(buttonPlay.classList.contains('hover-effect')).toBe(true)
})

it("should check the instruction div is present or not",()=>{
    render(<MockStart/>);
    const instructionContainer = screen.getByTestId("instruction-test");
    expect(instructionContainer).toBeInTheDocument();
})

it("should check the instruction header inside the container",()=>{
    render(<MockStart/>);
    const instructionHeader = screen.getByRole("heading",{name:"instruction"});
    expect(instructionHeader).toBeVisible();
})

it("should contain the five instruction should present on the screen",()=>{
    render(<MockStart/>);
    const instructions = screen.getAllByTestId("instruction-each");
    instructions.forEach((eachElement)=>{
        expect(eachElement).toBeVisible();
    })
})
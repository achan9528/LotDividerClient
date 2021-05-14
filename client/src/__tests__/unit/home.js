import { logRoles, prettyDOM, render, screen } from '@testing-library/react';
import HomePage from '../../views/home'
import App from '../../App'
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router-dom';

describe('Home Page Test', () => {
    // beforeAll(() => {
    //     render(
    //         <HomePage></HomePage>
    //     );
    // })

    test('should render home page', () => {
        render(
            <HomePage></HomePage>
        );
        expect(screen.getByRole("heading", {name:/Welcome!/i})).toBeInTheDocument();
        
    })

    test('should have links to login and registration', () => {
        render(
            <HomePage></HomePage>
        );
        expect(screen.getByRole('link', {name:/login/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name:/register/i})).toBeInTheDocument();
    })

    test('should direct to login screen when login link clicked', ()=>{
        render(
            <HomePage></HomePage>
        );
        userEvent.click(screen.getByRole('link',{name:/login/i}));
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    })

    test('should direct to registration screen when registration link clicked', ()=>{
        render(
            <HomePage></HomePage>
        );
        userEvent.click(screen.getByRole('link', {name:/register/i}));
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    })
})
import { logRoles, prettyDOM, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../views/Login'

describe('Login Test', () => {
    test('should render email and password fields with button', ()=>{
        render(<Login></Login>);
        expect(screen.getByRole('textbox', {name:/email/i})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name:/password/i})).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    test('should redirect to dashboard upon successful login', ()=>{
        render(<Login></Login>);
        userEvent.type(screen.getByRole('textbox', {name:/email/i}), "test@test.com");
        userEvent.type(screen.getByRole('textbox', {name:/password/i}), "test1234@test.com");
        userEvent.click(screen.getByRole('button'));
        // expect(screen.getByRole('heading')).toBe('User Dashboard');
    })
})
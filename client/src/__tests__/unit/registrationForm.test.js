import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../../views/registration'

describe('Registration component', () =>{

    const mockSubmit = jest.fn();

    test('should render input boxes with blank values', () => {
        render(<RegistrationForm></RegistrationForm>);
        const fields = screen.getAllByRole('textbox');
        expect(fields.length).toBe(5);
        expect(screen.getByLabelText('Name').value).toBe("");
        expect(screen.getByLabelText('Alias').value).toBe("");
        expect(screen.getByLabelText('Email').value).toBe("");
        expect(screen.getByLabelText('Password').value).toBe("");
        expect(screen.getByLabelText('Confirm Password').value).toBe("");
    })
    
    test('sets value fields', () => {
        render(<RegistrationForm></RegistrationForm>);
        const emailField = screen.getByLabelText('Email');
        userEvent.type(emailField, 'test@test.com');
        expect(emailField).toHaveProperty('value','test@test.com')
    })

    // test('should disable submit button if fields missing', () => {
    //     const { getByLabelText, getByRole } = render(<RegistrationForm></RegistrationForm>);
    //     userEvent.type(getByLabelText('Name'), 'test');
    //     userEvent.type(getByLabelText('Email'), 'test@test.com');
    //     userEvent.type(getByLabelText('Password'), 'password');
    //     userEvent.type(getByLabelText('Confirm Password'), 'password');
    //     expect(getByRole('button').prop('disabled')).toBeTruthy();
    // })

    // test('should disable submit button if passwords do not match', () => {
    //     const { getByLabelText, getByRole } = render(<RegistrationForm></RegistrationForm>);
    //     userEvent.type(getByLabelText('Password'), 'password');
    //     userEvent.type(getByLabelText('Confirm Password'), 'pass');
    //     expect(getByRole('button').prop('disabled')).toBeTruthy();
    // })

    // test('should disable submit button if email is invalid', () => {
    //     const { getByLabelText, getByRole } = render(<RegistrationForm></RegistrationForm>);
    //     userEvent.type(getByLabelText('Email'), 'test');
    //     expect(getByRole('button').prop('disabled')).toBeTruthy();
    // })

    test('should print to the console on submission', () => {
        mockSubmit.mockImplementation(e => e.preventDefault());
        render(<RegistrationForm submitHandler={mockSubmit}></RegistrationForm>);
        const button = screen.getByRole('button');
        const email = screen.getByLabelText('Email');
        userEvent.type(email, 'test@test.com');
        userEvent.click(button);
        expect(mockSubmit).toBeCalled();
    })

})


import { render, screen } from '@testing-library/react';
import RegistrationForm from '../../views/registration'

test('renders registration form', () => {
    render(<RegistrationForm></RegistrationForm>);
    const fields = screen.getAllByRole('textbox');
    expect(fields.length).toBe(5)
})
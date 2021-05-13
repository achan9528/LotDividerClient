import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputGroup from '../../components/inputGroup'

describe('InputGroup component', () =>{

    const mockChangeHandler = jest.fn();
    const mockProps = {
        name: 'test',
        label: 'test',
    }

    test('should render input boxes with blank values', () => {
        const { getByLabelText } = render(<InputGroup 
            name={mockProps.name} 
            label={mockProps.label}
            stateFunction={mockChangeHandler}></InputGroup>);
        const inputBox = screen.getByLabelText(mockProps.name);
        expect(inputBox.value).toBe("");
        expect(inputBox).toHaveProperty('name', mockProps.name);
    })
    
    test('should call mock function, setting value field', () => {
        const { getByLabelText } = render(
            <InputGroup 
            name={mockProps.name} 
            label={mockProps.label}
            stateFunction={mockChangeHandler}></InputGroup>);
        userEvent.type(getByLabelText(mockProps.name), 'test@test.com');
        expect(mockChangeHandler).toBeCalled();
    })

})


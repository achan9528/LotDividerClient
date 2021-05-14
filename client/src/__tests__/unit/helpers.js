import { submitHandler } from '../../components/helpers'
import { createEvent, render, screen } from '@testing-library/react';

describe('Submit Handler Test', () => {

    test('should use fetch to post to url with given params', async () => {
        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockImplementation(() =>
                Promise.resolve({ json: () => Promise.resolve([]) })
            );
        render(<form data-testid='testForm'><button></button></form>);
        const form = screen.getByTestId('testForm')
        const mockEvent = createEvent.submit(form)

        const url = 'http://localhost:8000/api/welcome/';
        const data = {};

        const json = submitHandler(mockEvent, data, url)
        expect(fetchMock).toHaveBeenCalledWith(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    })
})


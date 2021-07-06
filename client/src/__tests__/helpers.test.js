import { logRoles, getRoles, render, screen, waitForElementToBeRemoved, waitFor, waitForElement, findByAltText } from '@testing-library/react'
import NewPortfolioForm from '../views/NewPortfolioForm/NewPortfolioForm'
import { PortfoliosView } from '../views/PortfoliosView/PortfoliosView'
import * as helpers from '../components/helpers'
import * as validators from '../components/validators'
import { useToken } from '../components/hooks/useToken'
import userEvent from '@testing-library/user-event'
import MultiStepFormAccountTable from '../components/MultiStepFormAccountTable/MultiStepFormAccountTable'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
const { Readable } = require("stream")



describe('createEntry', ()=>{

    test('should call fetch', ()=>{
        const fetchMock = jest.spyOn(global, 'fetch').mockImplementation((url,data)=>            
            new Promise ((resolve, reject)=>resolve({status:400}))
        )
        const e = document.createEvent('Event')
        const model = 'projects'
        const badPayload = {}
        const setSuccessfulCreate = jest.fn()
        const setMessages = jest.fn()
        const badToken = 'some_token'
        helpers.createEntry(
            e, 
            model,
            badPayload,
            setSuccessfulCreate,
            setMessages,
            badToken
        )
        expect(fetchMock).toHaveBeenCalled()
        // expect(setMessages).toHaveBeenCalled()
    })

    test('should call setSuccessfulCreate on success code', async ()=>{
        const fetchMock = jest.fn().mockImplementation((url,data)=>            
            new Promise((resolve, reject)=>resolve({status:200})
        ))
        const originalMock = global.fetch
        global.fetch = fetchMock

        const e = document.createEvent('Event')
        const model = 'projects'
        const badPayload = {}
        const setSuccessfulCreate = jest.fn()
        const setMessages = jest.fn()
        const badToken = 'some_token'
        await helpers.createEntry(
            e, 
            model,
            badPayload,
            setSuccessfulCreate,
            setMessages,
            badToken
        )
        global.fetch=originalMock
        expect(setSuccessfulCreate).toHaveBeenCalled()
    })

    test('should call setMessages on error code', async ()=>{
        const fetchMock = jest.fn().mockImplementation((url,data)=>            
            new Promise((resolve, reject)=>resolve({status:400})
        ))
        const originalMock = global.fetch
        global.fetch = fetchMock

        const e = document.createEvent('Event')
        const model = 'projects'
        const badPayload = {}
        const setSuccessfulCreate = jest.fn()
        const setMessages = jest.fn()
        const badToken = 'some_token'
        await helpers.createEntry(
            e, 
            model,
            badPayload,
            setSuccessfulCreate,
            setMessages,
            badToken
        )
        global.fetch=originalMock
        expect(setMessages).toHaveBeenCalled()
        expect(setSuccessfulCreate).not.toHaveBeenCalled()
    })
})

describe('validate function', ()=>{

    it('should call validators', ()=>{
        const fieldsAndInputs = {
            field1: 'input1',
            field2: 'input2'
        }
        const validator1 = jest.fn(x=>{
            return {
                valid: true,
                message: 'good to go'
            }
        })
        const validator2 = jest.fn(x=>{
            return {
                valid: true,
                message: 'good to go'
            }
        })
        let validators = {
            field1: [validator1],
            field2: [validator1, validator2]
        }
        let inputMessages = []
        const setInputMessages = jest.fn()
        helpers.validate(
            fieldsAndInputs,
            validators,
            setInputMessages
        )
        expect(validator1).toHaveBeenCalledTimes(2)
        expect(validator2).toHaveBeenCalledTimes(1)
        expect(validator1).toHaveBeenNthCalledWith(1,fieldsAndInputs.field1)
        expect(validator1).toHaveBeenNthCalledWith(2,fieldsAndInputs.field2)
    })

})

describe('minStringLength function', ()=>{

    let minLength = 3

    it('should pass with no mesage', ()=>{
        const input = "test"
        const response = validators.minStringLength(input, minLength)
        expect(response.valid).toBe(true)
        expect(response.hasOwnProperty('message')).toBe(false)
    })

    it('should fail with error mesage', ()=>{
        const input = "te"
        const response = validators.minStringLength(input, minLength)
        expect(response.valid).toBe(false)
        expect(response.message).toBe(`Must be at least ${minLength} characters`)
    })

    it('should fail if input is not string', ()=>{
        const input = 4
        const response = validators.minStringLength(input, minLength)
        expect(response.valid).toBe(false)
        expect(response.message).toBe('Input must be a string')
    })
})


describe('New Portfolio Form', ()=>{
    describe('first step', ()=>{
        it('should allow next step on valid input', ()=>{
            let { getByRole, getAllByRole, getRoles } = render(<NewPortfolioForm></NewPortfolioForm>)
            const inputField = getByRole('textbox')
            const nextButton = getByRole('button', {name: 'Next'})
            const heading = getByRole('heading').innerHTML
            userEvent.type(inputField, 'Test')
            userEvent.click(nextButton)
            expect(screen.getByRole('heading').innerHTML).not.toBe(heading)
        })
    
        it('should show error messages if validators not satisfied', ()=>{
            const { getByRole, getAllByRole, getRoles } = render(<NewPortfolioForm></NewPortfolioForm>)
            const inputField = getByRole('textbox')
            const nextButton = getByRole('button', {name: 'Next'})
            userEvent.type(inputField, 'te')
            userEvent.click(nextButton)
            expect(screen.getByRole('error-messages')).toBeInTheDocument()
        })

        it('should not double error messages on multiple clicks', ()=>{
            const { getByRole, getAllByRole, getRoles } = render(<NewPortfolioForm></NewPortfolioForm>)
            const inputField = getByRole('textbox')
            const nextButton = getByRole('button', {name: 'Next'})
            userEvent.type(inputField, 'te')
            userEvent.click(nextButton)
            expect(screen.getByRole('error-messages')).toBeInTheDocument()
            expect(screen.getByRole('error-messages').innerHTML).toBe("Must be at least 4 characters")
            userEvent.click(nextButton)
            expect(screen.getByRole('error-messages')).toBeInTheDocument()
            expect(screen.getByRole('error-messages').innerHTML).toBe("Must be at least 4 characters")
        })

        it('should not show error messages if user goes back from second step and show error-messages again', ()=>{
            // first step 
            let { getByRole, getAllByRole, getRoles } = render(<NewPortfolioForm></NewPortfolioForm>)
            let inputField = getByRole('textbox')
            const nextButton = getByRole('button', {name: 'Next'})
            const heading = getByRole('heading').innerHTML
            userEvent.type(inputField, 'Test')
            userEvent.click(nextButton)
            // second step (back to first screen)
            const backButton = screen.getByRole('button', {name: 'Previous'})
            userEvent.click(backButton)
            expect(screen.getByRole('error-messages').innerHTML).toBe("good to go")
            expect(screen.getByRole('heading').innerHTML).toBe(heading)
            inputField = screen.getByRole('textbox')
            userEvent.clear(inputField)
            userEvent.type(inputField, 'Te')
            userEvent.click(nextButton)
            expect(screen.getByRole('error-messages')).toBeInTheDocument()
            expect(screen.getByRole('error-messages').innerHTML).toBe("Must be at least 4 characters")
        })
    })

    describe('second step', ()=>{

        it('user should see new account name field on add account button', ()=>{
            // first step 
            render(<NewPortfolioForm></NewPortfolioForm>)
            let inputField = screen.getByRole('textbox')
            const nextButton = screen.getByRole('button', {name: 'Next'})
            userEvent.type(inputField, 'Test')
            userEvent.click(nextButton)
            // second step (back to first screen)
            const addAccountButton = screen.getByRole('button', {name: 'Add Account'})
            expect(screen.getAllByRole('row').length).toBe(1)
            userEvent.click(addAccountButton)
            expect(screen.getAllByRole('row').length).toBe(2)
            expect(screen.getAllByRole('textbox').length).toBe(1)
        })

        it('user should be allowed to create empty portfolio with no accounts, be redirected to portfolios list, and see success message ', async ()=>{
            // first step 
            render(
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <NewPortfolioForm></NewPortfolioForm>
                        </Route>
                        <Route exact path="/portfolios/">
                            <PortfoliosView></PortfoliosView>
                        </Route>
                    </Switch>
                </BrowserRouter>
            )
            let inputField = screen.getByRole('textbox')
            const nextButton = screen.getByRole('button', {name: 'Next'})
            let portfolioName = 'Test Portfolio'
            let heading = screen.getByRole('heading')
            userEvent.type(inputField, portfolioName)
            userEvent.click(nextButton)
            // second step (back to first screen)
            screen.debug()
            const submitButton = screen.getByRole('button', {name: 'Submit'})
            let fakeBody = JSON.stringify(
                {
                    results: [
                        {
                            portfolioName: 1,
                            portfolioName: portfolioName 
                        }
                    ], count: 20

                }
            )
            const blob = new Blob([fakeBody])
            const fakeResponse = new Response(blob)
            const mockFetch = jest.fn()
            mockFetch.mockReturnValueOnce(
                new Promise((resolve,reject)=>{
                    resolve({
                        status: 200
                    })
                })
            ).mockReturnValueOnce(
                new Promise((resolve, reject)=>{
                    console.log("second mock function call")
                    resolve(fakeResponse)
                })
            )
            const originalFetch = global.fetch
            global.fetch = mockFetch
            userEvent.click(submitButton)
            await waitForElementToBeRemoved(heading)
            expect(window.location.pathname).toBe('/portfolios/')
            expect(await screen.findByText(`Portfolio "${portfolioName}" successfully created!`,{}, {timeout: 2000})).toBeInTheDocument()
            global.fetch = originalFetch
        })
    })

})

describe('nextStep function', ()=>{
    it('should setInputMessages and setStep by 1 on valid inputs', ()=>{
        const e = document.createEvent('Event')
        const fieldsAndInputs = {
            field1: 'input1'
        }
        const validator1 = jest.fn(x=>{
            return {
                valid: true,
                message: "good to go"
            }
        })
        const validators = {
            field1: [validator1],
            field2: [validator1]
        }
        const inputMessages = {}
        const setInputMessages = jest.fn()
        const step = 0
        const setStep = jest.fn()
        helpers.nextStep(
            e,
            fieldsAndInputs,
            validators,
            setInputMessages,
            step,
            setStep
        )
        expect(setStep).toHaveBeenCalledWith(step+1)
    })
})

describe('validate', ()=>{
    it('should setInputMessages and return true given valid inputs and validators', ()=>{
        const fieldsAndInputs = {
            field1: 'input1',
            field2: 'input2'
        }
        const validator1 = jest.fn(x=>{
            return {
                valid: true,
                message: "good to go"
            }
        })
        const validators = {
            field1: [validator1],
            field2: [validator1]
        }
        const setInputMessages = jest.fn(x=>x)
        const result = helpers.validate(
            fieldsAndInputs,
            validators,
            setInputMessages
        )
        expect(result).toBeTruthy()
        expect(setInputMessages).toBeCalledWith(
            {
                field1: {
                    valid: true,
                    message: "good to go"
                },
                field2: {
                    valid: true,
                    message: "good to go"
                }
            }
        )
    })
})
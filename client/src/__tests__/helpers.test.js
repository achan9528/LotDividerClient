import { logRoles, getRoles, render, screen } from '@testing-library/react'
import NewPortfolioForm from '../views/NewPortfolioForm/NewPortfolioForm'
import * as helpers from '../components/helpers'
import * as validators from '../components/validators'
import userEvent from '@testing-library/user-event'
import MultiStepFormAccountTable from '../components/MultiStepFormAccountTable/MultiStepFormAccountTable'



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

    const field = 'someField'
    const userInput = 'someUserInput'
    let validators = []
    let inputMessages = []
    const setInputMessages = jest.fn()

    it('should call validators', ()=>{
        validators.push(
            jest.fn(input=>input)
        )
        helpers.validate(
            field,
            userInput,
            validators,
            inputMessages,
            setInputMessages
        )
        expect(validators[0]).toHaveBeenCalled()
        expect(validators[0]).toHaveBeenCalledWith(userInput)
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
            screen.debug()
        })
    
        it('should show error messages if validators not satisfied', ()=>{
            const { getByRole, getAllByRole, getRoles } = render(<NewPortfolioForm></NewPortfolioForm>)
            screen.debug()
            const inputField = getByRole('textbox')
            const nextButton = getByRole('button', {name: 'Next'})
            userEvent.type(inputField, 'te')
            userEvent.click(nextButton)
            expect(screen.getByRole('error-messages')).toBeInTheDocument()
        })

        it('should not double error messages on multiple clicks', ()=>{
            const { getByRole, getAllByRole, getRoles } = render(<NewPortfolioForm></NewPortfolioForm>)
            screen.debug()
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
            expect(screen.getByRole('error-messages').innerHTML).toBe("")
            expect(screen.getByRole('heading').innerHTML).toBe(heading)
            inputField = screen.getByRole('textbox')
            userEvent.clear(inputField)
            expect(inputField).toHaveAttribute('value', '')
            userEvent.type(inputField, 'Te')
            userEvent.click(nextButton)
            expect(screen.getByRole('error-messages')).toBeInTheDocument()
            expect(screen.getByRole('error-messages').innerHTML).toBe("Must be at least 4 characters")
        })
    })

    describe('second step', ()=>{
        beforeEach(()=>{
            render(<NewPortfolioForm></NewPortfolioForm>)
        })

        it('should require minimum 4 character account name', ()=>{
            let addAccountButton = screen.getByRole('button',{name:"Add Account"}))
            userEvent.click(addAccountButton)
            let inputField = screen.getByRole('textbox')
            userEvent.type(inputField, 'tes')
            expect(screen.getByRole('error-messages', {name:'error-messages-1'})).toBeInDocument()
            expect(screen.getByRole('error-messages', {name:'error-messages-1'})).toBeInDocument("Must be at least 4 characters")
        })
    })

})

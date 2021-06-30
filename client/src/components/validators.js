export const minStringLength = (input, minLength=4) => {
    if (typeof input != 'string'){
        return {
            valid: false,
            message: 'Input must be a string'
        }
    }
    if (input.length < minLength){
        return {
            valid: false,
            message: `Must be at least ${minLength} characters`
        }
    }
    return {
        valid: true
    }
}

export const portfolioNameValidators = [
    minStringLength
]

export const accountNameValidators = [
    minStringLength
]
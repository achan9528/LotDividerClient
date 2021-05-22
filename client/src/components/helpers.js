export const submitHandler = (e, data, url, setToken) => {

    // prevent default form submission
    e.preventDefault()
    console.log(data);
    // send AJAX call with fetch API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
    .then(data => {
        setToken(data);
    }).catch(err => {
        console.log(err);
    })
}

export const emailValidation = (email) => {
    
}
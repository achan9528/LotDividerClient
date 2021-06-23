import React from 'react';

export const authenticate = (e, method, payload, setMessages, setToken) => {
    // prevent default form submission
    e.preventDefault()
    // send AJAX call with fetch API
    const url = `http://${process.env.REACT_APP_API_URL}/api/rest-auth/${method}/`
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    fetch(url, data)
    .then(res => res.json())
    .then(data => {
        setToken(data);
    }).catch(err => {
        setMessages(err.json);
    })
}

export const fileHandler = (e, targetAccount, files, setFiles) => {
    let updatedFiles = files;
    updatedFiles[targetAccount] = {
        name: e.target.files[0].name,
        file: e.target.files[0],
    };
    setFiles([...updatedFiles])
}

export const createPortfolio = (e, data, setSuccessfulCreate, setMessages, token) => {
    e.preventDefault();
    const formData = aggregateFormData(data)
    createEntry(e, 'portfolios', formData, setSuccessfulCreate, setMessages, token, false)
}

export const aggregateFormData = (data) => {
    let formData = new FormData();
    formData.append('portfolioName', data.portfolioName);
    formData.append('accounts', data.accounts);
    formData.append('holdings', data.holdings);
    for (let i = 0; i < data.files.length; i++){
        if (data.files[i]){
            formData.append(`${data.accounts[i].name}__holdings`, data.files[i].file);
        }
    }
    return formData
}

export const getEntry = (model, modelID, setLoading, setEntry, setMessages, token) => {
    const url = `http://${process.env.REACT_APP_API_URL}/api/${model}/${modelID}/`
    const data = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    }
    fetch(url, data)
    .then(res=> res.json())
    .then(data=>{
        data.hasOwnProperty('status')
        ? setMessages(data)
        : setEntry(data)
    })
    .then(data=>setLoading(false))
    .catch(err=>{
        setMessages(err);
    })
}


export const getEntries = (model, setEntries, setLoading, setMessages, token) => {
    const url=`http://${process.env.REACT_APP_API_URL}/api/${model}/`
    const data = {
        headers: {
            'Authorization': `Token ${token}`
        }
    };
    fetch(url, data)
    .then(res => res.json())
    .then(data => {
        data.hasOwnProperty('status')
        ? setMessages(data)
        : setEntries(data)
    })
    .then(res => {
        setLoading(false)
    })
    .catch(err => setMessages(err))
}

export const createEntry = (e, model, payload, setSuccessfulCreate, setMessages, token, stringify=true) => {
    e.preventDefault();
    const url = `http://${process.env.REACT_APP_API_URL}/api/${model}/`
    let body;
    stringify
    ? body=JSON.stringify(payload)
    : body=payload
    const data = {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': "application/json"
        },
        body: body
    };
    fetch(url, data)
    .then(res=>{
        res.status === 200 || res.status === 201 || res.status === 204
        ? setSuccessfulCreate(true)
        : setMessages(res.statusText)
    })
    .catch(err=>setMessages(err));
}

export const deleteEntry = (e, model, modelID, setDeleted, setMessages, token) => {
    e.preventDefault()
    const url = `http://${process.env.REACT_APP_API_URL}/api/${model}/${modelID}/`
    const data = {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`
        }
    }
    fetch(url, data)
    .then(res=> {
        res.status === 204
        ? setDeleted(true)
        : setMessages(res.statusText)
    })
    .catch(err=>{console.log(err)})
}

export const editEntry = (e, model, modelID, updatedData, setSuccessfulUpdate, setMessages, token) => {
    e.preventDefault()
    const url = `http://${process.env.REACT_APP_API_URL}/api/${model}/${modelID}/`
    const data = {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    }
    fetch(url, data)
    .then(res => {
        if (res.status === 200 || res.status === 204){
            setSuccessfulUpdate(true)
        } else {
            setMessages({...res.json()})
        }
    })
    .catch(err => console.log(err));
}

export const batchEdit = (e, model, updatedEntries, setSuccessfulUpdate, setMessages, token) => {
    e.preventDefault()
    let url = `http://${process.env.REACT_APP_API_URL}/api/${model}/batch/`
    let data = {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEntries)
    }
    console.log(updatedEntries)
    fetch(url, data)
    .then(res => {
        if (res.status === 200){
            setSuccessfulUpdate(true)
        } else {
            let errorMessages = res.json()
            setMessages({...errorMessages})
        }
    })
    .catch(err => console.log(err))
}

export const getProposalSections =  (proposal, setHoldings, setDraftAccounts) =>{
    console.log(proposal)
    let holdings = {
        stocks: {},
        mutualFunds: {},
        bonds: {},
        etfs: {}
    };
    let draftAccounts = [];
    // for each draftAccoumt, go through the holdings and add the 
    // tax lots for each holding to a dictionary. Add this
    // dictionary to the master dictionary
    proposal.draftPortfolios.forEach((draftPortfolio)=>{
        draftPortfolio.draftAccounts.forEach((draftAccount)=>{
            let draftHoldings = draftAccount.draftHoldings
            draftAccounts.push(draftAccount.id)
            for (let i =0; i < draftHoldings.length; i++){
                let draftHolding  = draftHoldings[i]
                let productType = draftHolding.security.productType.name
                let ticker = draftHolding.security.ticker
                let draftAccountNumber = draftHolding.draftAccount
                let draftTaxLots = draftHolding.draftTaxLots
                if (productType==='stock'){
                    if (!holdings['stocks'].hasOwnProperty(ticker)){
                        holdings['stocks'][[ticker]] = {}
                    }
                    for (let j = 0; j < draftTaxLots.length; j++){
                        let referencedLot = draftTaxLots[j].referencedLot
                        if (!holdings['stocks'][ticker].hasOwnProperty(referencedLot)){
                            holdings['stocks'][ticker][[referencedLot]] = {}
                        }
                        holdings['stocks'][ticker][[referencedLot]][[draftAccountNumber]] = 
                            {
                                units: draftTaxLots[j].units,
                                marketValue: draftTaxLots[j].marketValue,
                                draftTaxLotID: draftTaxLots[j].id
                            }
                    }
                }
            }
            
        })
    })
    setHoldings({...holdings});
    setDraftAccounts([...draftAccounts])
}

export const draftTaxLotChangeHandler = (e, productType, ticker, taxLot, accountNumber, originalHoldings, setHoldings) => {
    console.log(originalHoldings)
    console.log(accountNumber)
    let updatedHoldings = originalHoldings
    updatedHoldings[[productType]][[ticker]][[taxLot]][[accountNumber]].units = e.target.value
    console.log(updatedHoldings)
    setHoldings({...updatedHoldings})
}

export const downloadProposal = (e, inputs, token) => {
    e.preventDefault();
    inputs.fileName === ''
    ? inputs.fileName = `Lot_Divider_Proposal_${inputs.proposalID}`
    : inputs.fileName = inputs.fileName

    let url = `http://${process.env.REACT_APP_API_URL}/api/proposals/${inputs.proposalID}/download/?fileFormat=${inputs.fileFormat}&fileName=${inputs.fileName}`
    // let data = {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Token ${token}`,
    //     },
    // }
    // e.target.submit()



    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.setRequestHeader('Authorization',`Token ${token}`)
    req.onload = function (event) {
        e.preventDefault();
        let blob = req.response;
        let fileName = inputs.fileName
        let link=document.createElement("a")
        e.target.append(link)
        link.href=window.URL.createObjectURL(blob);
        link.download=`${inputs.fileName}.${inputs.fileFormat}`;
        console.log(link)
        link.click();
        e.target.removeChild(link)
    };

    req.send();
}

export const handleModalClose = (e, setShow) => {
    setShow(false);
}

import { submitHandler } from '../components/helpers'
import InputGroup from '../components/inputGroup'
import { Button, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { Redirect } from 'react-router-dom'

const NewProjectForm = (props) => {
    const [step, setStep] = useState();
    const [projectName, setProjectName] = useState();
    const [owners, setOwners] = useState([]);
    const {token, setToken} = useToken();

    useEffect(()=>{
        setStep(0);
        console.log(token);
    }, [])

    const prevStep = () => {
        if (step > 0){
            setStep(step-1);
        }
    }

    const nextStep = () => {
        if (step < 3){
            setStep(step+1);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/projects/";
        const data = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: projectName,
                owners: owners,
            })
        };
        console.log(data);
        fetch(url, data)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err);
            console.log(projectName);
        });
        
    }

    let section;
    if (step == 0){
        section = <InputGroup 
        stateFunction={setProjectName}
        name="Project Name"
        label="Project name"></InputGroup>
    } else if (step==1){
        section = <h2>Step 2</h2>
    } else if (step==2){
        section = <InputGroup stateFunction={setProjectName}></InputGroup>
    }

    return(
        <Row className="justify-content-md-center">
            <form onSubmit={e=>submitHandler(e)}>
                <Row className="justify-content-md-center">
                    {section}
                </Row>
                <Button onClick={e=>prevStep()}>Previous</Button>
                <Button onClick={e=>nextStep()}>Next</Button>
                <Button type="submit">Submit</Button>
            </form>
        </Row>
        
    )
}

export default NewProjectForm
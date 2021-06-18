import { Button, Row, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { useHistory } from 'react-router-dom'

const NewProjectForm = (props) => {
    const [projectName, setProjectName] = useState();
    const [owners, setOwners] = useState([]);
    const {token} = useToken();
    let history = useHistory();

    useEffect(()=>{
        console.log(token);
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const url = "http://ec2-18-118-227-247.us-east-2.compute.amazonaws.com:8000/api/projects/";
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
            history.push('/dashboard')
        })
        .catch(err=>{
            console.log(err);
            console.log(projectName);
        });
        
        // const url = "http://ec2-18-118-227-247.us-east-2.compute.amazonaws.com:8000/api/users/";
        // const data = {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Token ${token}`,
        //     },
        // }
        // fetch(url, data)
        // .then(res => res.json())
        // .then(data => setUsers(data))
    }

    return(
        <Row className="justify-content-md-center">
            <Form onSubmit={e=>submitHandler(e)}>
                <Form.Group>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        onChange={e=>setProjectName(e.target.value)}
                        ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Owners</Form.Label>
                    <Form.Control
                        onChange={e=>setOwners(e.target.value)}
                        as='select' multiple>
                            {/* {
                                users.map((item,key)=>{
                                    <option value={item.id}>{item.alias}</option>
                                })
                            } */}
                        </Form.Control>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Row>
    )
}

export default NewProjectForm
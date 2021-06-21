import { Button, Row, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import useToken from '../../components/hooks/useToken'
import { createEntry } from '../../components/helpers'
import { Redirect } from 'react-router-dom'

const NewProjectForm = (props) => {
    const [projectName, setProjectName] = useState();
    const [owners, setOwners] = useState([]);
    const {token} = useToken();
    const [messages, setMessages] = useState();
    const [successfulCreate, setSuccessfulCreate] = useState();

    if (successfulCreate){
        return <Redirect to='/dashboard'></Redirect>
    }

    return(
        <Row className="justify-content-md-center">
            <Form onSubmit={e=>createEntry(
                e, 
                'projects', 
                {
                    name: projectName, 
                    owners: owners
                },
                setSuccessfulCreate,
                setMessages,
                token
            )}>
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
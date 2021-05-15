import { submitHandler } from '../components/helpers'
import InputGroup from '../components/inputGroup'
import { Button, Row, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { useHistory } from 'react-router-dom'

const NewProposalForm = (props) => {
    const [users, setUsers] = useState();
    const [proposalName, setProposalName] = useState();
    const [owners, setOwners] = useState([]);
    const {token, setToken} = useToken();
    let history = useHistory();

    useEffect(()=>{
        console.log(token);
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/proposals/";
        const data = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: proposalName,
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
        });
        
        // const url = "http://localhost:8000/api/users/";
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
                    <Form.Label>Proposal Name</Form.Label>
                    <Form.Control
                        onChange={e=>setProposalName(e.target.value)}
                        ></Form.Control>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Row>
    )
}

export default NewProposalForm
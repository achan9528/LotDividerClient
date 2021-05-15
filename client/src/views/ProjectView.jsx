import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

export const ProjectView = () =>{
    const [proposals, setProposals] = useState([])
    const { id } = useParams()
    const { token, setToken } = useToken()

    useEffect(()=>{
        const url = "http://localhost:8000/api/projects/" + id;
        const data = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res => {
            console.log(res);
            res.json()
        })
        .then(data => {
            if (data.proposals){
                setProposals(data.proposals)
            }
        })
        .catch(err => console.log(err));
    }, [])
    let tableData;
    if (proposals.length == 0){
        tableData = 
            <tr>
                <td>No Proposals</td>
                <td></td>
            </tr>
    } else {
        tableData = 
            proposals.map((item,key)=>{
                return (
                    <tr key={item.key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                )
            })
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>
            <Link to="/proposals/new/">  
                <Button>New Proposal</Button>
            </Link>
        </div>
    )
}

export default ProjectView;
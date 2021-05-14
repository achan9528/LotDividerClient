import { Row, Table, Button } from 'react-bootstrap'
import useToken from '../components/hooks/useToken'
import { useEffect, useState } from 'react'

const UserDashboard = () => {
    const { token, setToken } = useToken()
    const [ projects, setProjects ] = useState([])

    useEffect(() => {
        const url = 'http://localhost:8000/api/projects/';
        const data = {
            headers: {
                'Authorization': `Token ${token}`
            }
        };
        fetch(url, data)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProjects(data);
        }).catch(err => {
            return err;
        })
    }, [])

    let tableData;
    if (projects.length == 0){
        tableData = <tr><td>No projects</td><td></td></tr>
    } else {
        tableData = projects.map((item,key) => {
            return(
                <tr key={key}>
                    <td>{item.name}</td>
                    <td>{item.fractionalLotsAllowed}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Number</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>
        </div>
    )
}

export default UserDashboard;
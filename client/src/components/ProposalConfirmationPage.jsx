import {Table, Form} from 'react-bootstrap';

const ProposalConfirmationPage = (props)=>{

    return (
        <Form>
            <Form.Group>
                <h4>Proposal Name</h4>
                <Form.Control plaintext readOnly
                value={props.proposalName}></Form.Control>
            </Form.Group>
            <Form.Group>
                <h4>Account Used</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Number</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.account.id}</td>
                            <td>{props.account.number}</td>
                            <td>{props.account.name}</td>
                        </tr>
                    </tbody>
                </Table>
            </Form.Group>
            <Form.Group>
                <h4>Holdings Used</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Units Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(props.holdings).map((item,key)=>{
                                return (
                                    <tr>
                                        <td>{item}</td>
                                        <td>{props.holdings[item]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Form.Group>
            <Form.Group>
                <h4>Selection Details</h4>
                <Form.Control plaintext readOnly
                defaultValue={props.numberOfPortfolios}></Form.Control>
                <Form.Control plaintext readOnly
                defaultValue={props.selectionMethod}></Form.Control>
            </Form.Group>
        </Form>        
    )
}

export default ProposalConfirmationPage;
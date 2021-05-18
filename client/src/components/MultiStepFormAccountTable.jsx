import {Button, Table, Form} from 'react-bootstrap';

const MultiStepFormAccountTable = (props)=>{

    const addRow = (e) => {
        e.preventDefault();
        props.setAccounts([...props.accounts, {
            name: ""
        }]);
        props.setHoldings([...props.holdings, []])
    }

    const changeHandler = (e, key) =>{
        let tdata = props.accounts;
        tdata[key].name = e.target.value;
        props.setAccounts([...tdata]);
    }

    return (
        <Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {
                            props.headers.map((item,key)=>{
                                return (
                                    <th key={key}>{item}</th>
                                )
                            })
                        }
                        <th>Holdings</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.accounts.map((item,key)=>{
                            let holdingsColumn;
                            if (props.holdings[key].length==0 &&
                                props.files[key] == undefined){
                                holdingsColumn = 
                                <Button 
                                    variant="link"
                                    onClick={e=>props.toHoldingsStep(e, key)}>
                                    Add Holdings / Tax Lots
                                </Button>
                            }
                            else if (props.holdings[key].length > 0 &&
                                props.files[key] == ""){
                                holdingsColumn = 
                                <>
                                    Manually Entered
                                    <Button 
                                        variant="link"
                                        onClick={e=>props.toHoldingsStep(e, key)}>
                                        Add Holdings / Tax Lots
                                    </Button>
                                </>
                            } else if (props.files[key]){
                                holdingsColumn =
                                <>
                                    {props.files[key].name}
                                    <Button variant="link"  
                                    onClick={e=>props.toHoldingsStep(e, key)}> 
                                        (File Uploaded, Click to Edit Holdings)
                                    </Button>
                                </>
                            }
                            return(
                                <tr key={key}>
                                    <td>
                                        <Form.Group>
                                            <Form.Control
                                            onChange={(e)=>changeHandler(e, key)}
                                            value={item.name}></Form.Control>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        {holdingsColumn}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={e=>addRow(e)}>+</Button>
        </Form.Group>
        
    )
}

export default MultiStepFormAccountTable;
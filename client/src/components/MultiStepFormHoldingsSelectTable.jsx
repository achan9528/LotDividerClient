import { useEffect, useState } from 'react';
import {Button, Table, Form} from 'react-bootstrap';

const MultiStepFormHoldingsSelectTable = (props)=>{

    const [holdings, setHoldings] = useState([]);

    useEffect(()=>{
        
        let accountHoldings = props.holdings;
        console.log(props.holdings);
        for (let i = 0; i < accountHoldings.length; i++){
            let totalUnits = 0;
            for (let n = 0; n < accountHoldings[i].taxLots.length; n++){
                totalUnits += parseFloat(accountHoldings[i].taxLots[n].units);
            }
            accountHoldings[i].totalUnits = totalUnits
        }
        setHoldings([...accountHoldings]);
    }, [])

    return (
        <Form>
            <Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>CUSIP</th>
                            <th>Total Units</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            holdings.map((item,key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{item.security.ticker}</td>
                                        <td>{item.security.cusip}</td>
                                        <td>{item.totalUnits}</td>
                                        <td>
                                            <Form.Check
                                            type='checkbox'>
                                            </Form.Check>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Form.Group>
        </Form>
        
        
    )
}

export default MultiStepFormHoldingsSelectTable;
import React, { useEffect, useState } from 'react';
import { Table, Form} from 'react-bootstrap';

const MultiStepFormHoldingsSelectTable = (props)=>{

    const [holdings, setHoldings] = useState([]);

    useEffect(()=>{
        
        let accountHoldings = props.holdings;
        for (let i = 0; i < accountHoldings.length; i++){
            let totalUnits = 0;
            for (let n = 0; n < accountHoldings[i].taxLots.length; n++){
                totalUnits += parseFloat(accountHoldings[i].taxLots[n].units);
            }
            accountHoldings[i].totalUnits = totalUnits
        }
        setHoldings([...accountHoldings]);
    }, [props.holdings])

    const changeHandler = (e, item) => {
        let updatedTargetHoldings = props.targetHoldings;
        updatedTargetHoldings[[item.security.ticker]] = e.target.value;
        props.setTargetHoldings({...updatedTargetHoldings});
    }

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
                                            <Form.Control
                                            onChange={e=>changeHandler(e,item)}
                                            value={props.targetHoldings[[item.security.ticker]]}></Form.Control>
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
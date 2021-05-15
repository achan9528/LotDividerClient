import { submitHandler } from '../components/helpers'
import InputGroup from '../components/inputGroup'
import { Button, Row, Form, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { useHistory } from 'react-router-dom'

const NewPortfolioForm = (props) => {
    const [portfolioName, setPortfolioName] = useState("");
    const [tableData, setTableData] = useState([]);

    const addRow = (e) => {
        e.preventDefault();
        setTableData([...tableData, {
            ticker: "",
            cusip: "",
            taxLotNumber: "",
            units: "",
            acquisitionDate: "",
        }]);
    }

    return(
        <Row className="justify-content-md-center">
            <Form>
                <Form.Group>
                    <Form.Label>Portfolio Name</Form.Label>
                    <Form.Control
                        onChange={e=>setPortfolioName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>CUSIP</th>
                                <th>Tax Lot Number</th>
                                <th>Units</th>
                                <th>Acquisition Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((item,key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{item.ticker}</td>
                                            <td>{item.cusip}</td>
                                            <td>{item.taxLotNumber}</td>
                                            <td>{item.units}</td>
                                            <td>{item.acquisitionDate}</td>
                                        </tr>
                                    )
                                })
                            }
                            <Button onClick={e=>addRow(e)}>+</Button>
                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
        </Row>
    )
}

export default NewPortfolioForm
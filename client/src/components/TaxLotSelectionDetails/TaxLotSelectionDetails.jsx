import {Form, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import React from 'react';

const TaxLotSelectionDetails = (props)=>{

    return (
        <Form>
            <p>Please indicate number of portfolios and tax lot selection method</p>
            <InputGroup>
                <Form.Control
                placeholer="Number of Portfolios to Divide Holdings Into"
                onChange={e=>props.setNumberOfPortfolios(e.target.value)}
                value={props.numberOfPortfolios}
                ></Form.Control>
                <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={props.method}>
                    {
                        ['HIFO', 'FIFO'].map((item,key)=>{
                            return (
                                <Dropdown.Item
                                key={key}
                                onClick={e=>{props.setMethod(e.target.textContent)}}
                                >{item}</Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            </InputGroup>
        </Form>
    )
}
export default TaxLotSelectionDetails;
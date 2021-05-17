import { useEffect, useState } from 'react';
import {Form, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const TaxLotSelectionDetails = (props)=>{
    const [dropdownText, setDropdownText] = useState("Selection Method");

    const dropdownHandler = (e) => {
        setDropdownText(e.target.textContent);
    }

    return (
        <Form>
            <p>Please indicate number of portfolios and tax lot selection method</p>
            <InputGroup>
                <Form.Control
                placeholer="Number of Portfolios to Divide Holdings Into"
                ></Form.Control>
                <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={dropdownText}>
                    {
                        ['HIFO', 'FIFO'].map((item,key)=>{
                            return (
                                <Dropdown.Item
                                key={key}
                                onClick={e=>{dropdownHandler(e)}}
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
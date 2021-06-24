import { Form, Modal, Button } from 'react-bootstrap'
import { downloadProposal, handleModalClose } from '../helpers'
import { React, useState } from 'react'
import { useToken } from '../hooks/useToken'

export const DownloadProposalModal = (props) => {
    const [fileFormat, setFileFormat] = useState('xlsx')
    const [fileName, setFileName] = useState(`Lot_Divider_Proposal_${props.proposalID}`)
    const { token, setToken } = useToken()
    return (
        <Modal show={props.show} onHide={e => handleModalClose(e, props.setShow)} centered>
            <Form onSubmit={e => downloadProposal(
                e,
                {
                    fileName: fileName,
                    fileFormat: fileFormat,
                    proposalID: props.proposalID
                },
                token
            )}>
                <Modal.Header closeButton>
                    <Modal.Title>Download Proposal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>File Name</Form.Label>
                        <Form.Control 
                        placeholder="File Name"
                        onChange={e=>setFileName(e.target.value)}
                        value={fileName}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check 
                        defaultChecked 
                        inline 
                        type="radio" 
                        label=".xlsx"
                        onClick={e=>setFileFormat('xlsx')}
                        name="fileFormat"></Form.Check>
                        <Form.Check 
                        inline 
                        disabled
                        type="radio" 
                        label=".csv"
                        onClick={e=>setFileFormat('csv')}
                        name="fileFormat"></Form.Check>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={e => handleModalClose(e, props.setShow)}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                    onClick={e=>downloadProposal(
                        e,
                        {
                            fileName: fileName,
                            fileFormat: fileFormat,
                            proposalID: props.proposalID
                        },
                        token
                    )}>Download
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
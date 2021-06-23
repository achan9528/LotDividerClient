import { Form, Modal, Button } from 'react-bootstrap'
import { downloadProposal, handleModalClose } from '../helpers'
import { useState } from 'react'
import { useToken } from '../hooks/useToken'

export const DownloadProposalModal = (props) => {
    const [fileFormat, setFileFormat] = useState()
    const [fileName, setFileName] = useState()
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
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>File Path</Form.Label>
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
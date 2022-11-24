import {Button, Modal} from 'react-bootstrap'

import React from 'react'

interface ModalProps {
    title: string
    show: boolean
    setShow: (show: boolean) => void
    confirm: () => void
}

const CustomModal = ({title, show, setShow, confirm}: ModalProps) => {
    
    const handleClose = () => setShow(false);
    const confirmHandle = () => {
        setShow(false)
        confirm()
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
            <Modal.Title>Modal Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this {title}?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={confirmHandle}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CustomModal
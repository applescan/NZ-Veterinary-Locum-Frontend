import React from "react";
import { Modal } from "react-bootstrap";
import ButtonBlueOutlined from "./ButtonBlueOutlined";
import ButtonBlue from "./ButtonBlue";


const UserModal = (props) => {

    const { show, handleClose, handleShow, handleChanges, nameClose, nameOpen } = props

    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.text}</Modal.Body>
                <Modal.Footer>
                    <ButtonBlueOutlined onClick={handleClose} name={nameClose}>
                    </ButtonBlueOutlined>
                    <ButtonBlue onClick={handleChanges} name={nameOpen} size='sml'>
                    </ButtonBlue>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserModal
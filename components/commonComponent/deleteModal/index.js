import React from 'react'
import {Modal,Button} from "react-bootstrap"

function DeleteModal({deleteHandler,hideModal,showModal}) {
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="alert alert-danger">
                    Are you sure you want to delete this?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteHandler}>
                    Delete
                </Button>
            </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal
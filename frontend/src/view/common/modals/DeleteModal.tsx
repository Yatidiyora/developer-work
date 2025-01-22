import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { CommonDeleteModal } from '../../../common/types/interface/Deletemodal.interface';

const DeleteModal = (props: CommonDeleteModal) => {
    const {action, setAction, stateChange, actionTitle, modalHeading, modalSubHeading, renderFieldComponent, actionFun} = props;
    const handleClose = () => {
        setAction((preState) => ({...preState, [actionTitle]: false}));
    }
    const deleteFun = async () => {
        const deleteId = actionTitle + "Id";
        await actionFun(action[deleteId]);
        stateChange();
        setAction(undefined);
    }
  return (
    <div>
      <Modal show={action[actionTitle]} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalHeading} : {modalSubHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{renderFieldComponent}</div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <button type="button" className="btn btn-primary" onClick={deleteFun}>
            Yes
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            No
          </button>
        </>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default DeleteModal

import React from "react";
import styled from "@emotion/styled/macro";
import Modal from "../../components/Modal";

const TodoFormModal: React.FC = () => {
  return (
    <Modal>
      <ModalBody>
        <Card>
          <Date>2022-10-27</Date>
          <InputTodo placeholder="새로운 이벤트" />
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default TodoFormModal;

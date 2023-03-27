import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import { useState } from "react";
import Modal from "./Modal";

const ListItem = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <li className="list-item">
        <TickIcon />
        <div className="info-container">
          <p>{task.title}</p>
        </div>
        <ProgressBar />
        <div className="button-container">
          <button className="edit pulse" onClick={() => setOpenModal(true)}>
            EDIT
          </button>
          <button className="delete pulse">DELETE</button>
        </div>
      </li>
      {openModal ? <Modal mode={"edit"} setOpenModal={setOpenModal} task={task} /> : null}
    </>
  );
};

export default ListItem;

import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import { useState } from "react";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [openModal, setOpenModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status == "200") {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <button className="delete pulse" onClick={deleteItem}>
            DELETE
          </button>
        </div>
      </li>
      {openModal ? (
        <Modal
          mode={"edit"}
          setOpenModal={setOpenModal}
          task={task}
          getData={getData}
        />
      ) : null}
    </>
  );
};

export default ListItem;

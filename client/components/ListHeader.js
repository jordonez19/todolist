import Modal from "./Modal";
import { useState } from "react";

const ListHeader = ({ listName }) => {
  const [openModal, setOpenModal] = useState(false);
  const signOut = async () => {};

  return (
    <>
      <div className="listHeader">
        <h1> ⭐ {listName}</h1>
        <div className="button-container">
          <button className="create pulse" onClick={() => {setOpenModal(true)}}>
            Add New
          </button>
          <button className="out pulse" onClick={() => console.log("out")}>
            Sign Out
          </button>
        </div>
        {openModal ? (
          <Modal
            mode={'create'}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null}
      </div>
    </>
  );
};

export default ListHeader;

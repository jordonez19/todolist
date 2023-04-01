import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";
const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [openModal, setOpenModal] = useState(false);

  const signOut = async () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <>
      <div className="listHeader">
        <h1> ⭐ {listName} </h1>
        <div className="button-container">
          <button
            className="create pulse"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add New
          </button>
          <button className="out pulse" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
        {openModal ? (
          <Modal
            mode={"create"}
            openModal={openModal}
            setOpenModal={setOpenModal}
            getData={getData}
          />
        ) : null}
      </div>
    </>
  );
};

export default ListHeader;

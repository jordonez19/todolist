import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setOpenModal, getData, task }) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;

  const [form, setForm] = useState({
    user_email: editMode ? task.user_email : userEmail,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.status == "200") {
        setOpenModal(false);
        console.log("well done");
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.status == "200") {
        setOpenModal(false);
        console.log("well updated");
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Lets {mode} your task</h3>
            <button onClick={() => setOpenModal(false)}>X</button>
          </div>

          <form>
            <br />
            <label>Your task</label>
            <input
              name="title"
              type={"text"}
              maxLength={30}
              placeholder="Your task goes here!"
              value={form.title}
              onChange={handleChange}
              required
            />
            <label>Drag your current progress</label>
            <input
              name="progress"
              type={"range"}
              min={0}
              max={100}
              value={form.progress}
              onChange={handleChange}
              required
            />
            <input
              className={mode}
              type={"submit"}
              onClick={editMode ? editData : postData}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;

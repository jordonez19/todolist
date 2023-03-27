import { useState } from "react";

const Modal = ({ mode, setOpenModal, task }) => {
  const editMode = mode === "edit" ? true : false;
  console.log(task)
  const [form, setForm] = useState({
    user_email: editMode ? task.user_email : "",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date(),
  });

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
            <h3>Let's {mode} your task</h3>
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
            <input className={mode} type={"submit"} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;

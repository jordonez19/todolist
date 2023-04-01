const PORT = process.env.PORT ?? 8000;
const pool = require("./databases/pg");
const express = require("express");
const app = express();
const cors = require("cors");
var morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

//------------------------------------------------------------------------

//-------------get all todos-------------//
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos  WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.log("get todos erorr: ", error);
  }
});

//-------------create new task-------------//
app.post("/todos", async (req) => {
  try {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    const newTask = await pool.query(
      "INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1,$2,$3,$4,$5)",
      [id, user_email, title, progress, date]
    );
    res.json(newTask);
  } catch (error) {
    console.log(error);
  }
});

//-------------edit task-------------//
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;

    const editTask = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5",
      [user_email, title, progress, date, id]
    );
    res.json(editTask);
  } catch (error) {
    console.log(error);
  }
});

//-------------delete task-------------//
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM todos WHERE id = $1 ", [
      id,
    ]);
    res.json(deleteTask);
  } catch (error) {
    console.log(error);
  }
});

//------------------------------------------------------------------------
// ----------login && signup----------//
//-------------   auth   -------------//

//signUp
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES ($1,$2)`,
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (error) {
    console.log(error);
    if (error) {
      res.json({ detail: error.detail });
    }
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (!users.rows.length) return res.json({ detail: "User doesnt exist!" });

    const sucess = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (sucess) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

//------------------------------------------------------------------------

//port running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const PORT = process.env.PORT ?? 8000;
const pool = require("./databases/pg");
const express = require("express");
const app = express();
const cors = require("cors");
var morgan = require("morgan");
app.use(morgan("tiny"));
app.use(cors());

//get all todos
app.get("/todos/:userEmail", async (req, res) => {
  console.log("req req : ", req);
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

//port running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

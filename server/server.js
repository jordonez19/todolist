const PORT = process.env.PORT ?? 8000;
const pool = require('./databases/pg')
const express = require("express");
const app = express();

//get all todos
app.get('/todos', async (req, res)  => {
    try {
        const todos = await pool.query('SELECT * FROM todos');
        res.json(todos.rows)
    } catch (error) {
        console.log('get todos erorr: ', error)
    }
})





//port running
app.listen(PORT, () => {
  console.log("Server is runing  on port " + PORT);
});

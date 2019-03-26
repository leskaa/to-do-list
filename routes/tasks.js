const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // { id } is a destructuring assignment
    // It is the same as 'const id = req.params.id'
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    res.status(200).send(rows[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(200).send(`Task deleted with ID: ${id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { task } = req.body;
    await db.query('INSERT INTO tasks (task) VALUES ($1)', [task]);
    res.status(201).send(`Task added with title: ${task}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    await db.query('UPDATE tasks SET task = $1 WHERE id = $2', [task, id]);
    res.status(200).send(`Task motified with ID: ${id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

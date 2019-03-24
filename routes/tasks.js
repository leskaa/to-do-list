const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM tasks ORDER BY id ASC');
  res.send(rows);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params.id;
  const { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
  res.send(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
});

router.post('/', async (req, res) => {
  const { task } = req.body;
  const { insertId } = await db.query('INSERT INTO tasks (task) VALUES ($1)', [
    task
  ]);
  res.send(`Task added with ID: ${insertId}`);
});

import express from 'express';

const todosRouter = express.Router();

import * as todoController from '../controllers/todoController.js';

todosRouter.get('/todos', todoController.getAll);

todosRouter.get('/todos/:todoId', todoController.getOne);

todosRouter.post('/todos', todoController.add);

todosRouter.put('/todos/:todoId', todoController.update);

todosRouter.delete('/todos/:todoId', todoController.remove);

todosRouter.patch('/todos', (req, res) => {
  const { action } = req.query;

  if (action === 'delete') {
    todoController.removeMany(req, res);
    return;
  }

  if (action === 'update') {
    todoController.updateMany(req, res);
    return;
  }

  res.sendStatus(422);
});

export { todosRouter }

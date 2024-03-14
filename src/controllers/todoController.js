import * as todoService from '../services/todoService.js'

export const getAll = async (req, res) => {
  const todos = await todoService.getAll();

  res.send(
    todos.map(todoService.normalize)
  );
}

export const getOne = async(req, res) => {
  const { todoId } = req.params;

  const foundTodo = await todoService.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);

    return;
  }

  res.send(
    todoService.normalize(foundTodo),
  );
};

export const add = async(req, res) => {
  const { title } = req.body;

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const newTodo = await todoService.create(title);

  res.status(201);

  res.send(
    todoService.normalize(newTodo),
  );
};

export const remove = async(req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    res.sendStatus(400);

    return;
  }

  const foundTodo = await todoService.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);

    return;
  }

  await todoService.remove(todoId);
  res.sendStatus(204);
};

export const update = async(req, res) => {
  const { todoId } = req.params;
  const { title, completed } = req.body;

  const foundTodo = await todoService.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    res.sendStatus(422);

    return;
  }

  await todoService.update({
    id: todoId,
    title,
    completed
  });

  const updatedTodo = await todoService.getById(todoId);

  res.send(
    todoService.normalize(updatedTodo),
  );
};

export const removeMany = (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);
    return;
  }

  if (!ids.every((id) => todoService.getById(id))) {
    throw new Error()
  }

  todoService.removeMany(ids);

  res.sendStatus(204);
  return;
}

export const updateMany = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }
  const errors = [];
  const results = [];
  for (const {id, title, completed } of items) {
    const todo = todoService.getById(id)
    if (!todo) {
      errors.push({ id, title, completed, error: 'Not found'});
    } else {
      const result = todoService.update({ id, title, completed });
      results.push(result);
    }
  }
  
  res.send({ errors, results });
  return;
}

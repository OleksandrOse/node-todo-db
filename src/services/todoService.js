import { Todo } from '../models/Todo.js'
import { sequelize } from '../database/db.js';
import { Op } from 'sequelize';

export const normalize = ({ id, title, completed }) => {
  return {
    id,
    title,
    completed
  };
}

export async function getAll() {
  const result = await Todo.findAll({
    order: [[
      'createdAt', 'DESC'
    ]],
  });

  return result;
}

export function getById(todoId) {
  return Todo.findByPk(todoId);
}

export function create(title) {
  return Todo.create({
    title,
  });
}

export async function remove(todoId) {
  return Todo.destroy({
    where: { id: todoId },
  });
}

export async function update({
  id,
  title,
  completed
}) {
  return Todo.update({ title, completed }, {
    where: { id },
  });
}

export const removeMany = async(ids) => {
  await Todo.destroy({
    where: {
      id: {
        [Op.in]: ids,
      }
    }
  })
}

export const updateMany = async(todos) => {
  return await sequelize.transaction(async(t) => {
    await Todo.update({ title, completed }, {
      where: { id },
      transaction: t,
    });
  });
}

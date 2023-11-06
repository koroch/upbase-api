import { Request, Response } from "express";
import { instanceToPlain } from 'class-transformer';

import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUsersService";
import { container } from "tsyringe";
import DeleteUserService from "../services/DeleteUserService";
import UpdateUserService from "../services/UpdateUserService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, is_teacher } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      username,
      email,
      password,
      is_teacher
    });

    return response.json(instanceToPlain(user));
  }

  public async listTeachers(request: Request, response: Response): Promise<Response>{
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute(true);
    return response.json(instanceToPlain(users));
  }

  public async listStudents(request: Request, response: Response): Promise<Response>{
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute(false);
    return response.json(instanceToPlain(users));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email } = request.params;

    const deleteUser = container.resolve(DeleteUserService);
    const isDeleted = await deleteUser.execute({user_id, email});

    return response.json(instanceToPlain(isDeleted));
  }
  
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, username, email, password, is_teacher, old_password  } = request.body;

    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      user_id,
      name,
      username,
      email,
      password,
      is_teacher,
      old_password
    });

    return response.json(instanceToPlain(user));
  }
}

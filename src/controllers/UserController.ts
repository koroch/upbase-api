import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUsersService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, is_teacher } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      username,
      email,
      password,
      is_teacher
    });

    return response.json(user);
  }

  public async listTeachers(request: Request, response: Response): Promise<Response>{
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute(true);
    return response.json(users);
  }

  public async listStudents(request: Request, response: Response): Promise<Response>{
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute(false);
    return response.json(users);
  }
}

import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { container } from "tsyringe";
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(instanceToPlain({ user, token }));
  }
}

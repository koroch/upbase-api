import { injectable, inject } from "tsyringe";
import { hash } from 'bcryptjs';

import User from '../models/User';
import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "../errors/AppError";

interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    is_teacher: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({ name, username, email, password, is_teacher }: IRequest): Promise<User> {

    const checkEmailExists = await this.usersRepository.findByEmail(email);
    if (checkEmailExists) {
      throw new AppError('Email adress already used', 406);
    }

    const checkUsernameExists = await this.usersRepository.findByUsername(username);
    if (checkUsernameExists) {
      throw new AppError('Username already used', 406);
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      is_teacher
    });

    return user;
  }
}
export default CreateUserService;
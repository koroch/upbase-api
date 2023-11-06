import { injectable, inject } from "tsyringe";
import { hash, compare } from 'bcryptjs';

import User from '../models/User';
import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "../errors/AppError";

interface IRequest {
  user_id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  is_teacher: boolean;
  old_password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({ user_id, name, username, email, password, is_teacher, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if(!user){
      throw new AppError('User not found with this email', 404);
    }
    
    const userWithUpdatedUsername = await this.usersRepository.findByUsername(username);
    if(!userWithUpdatedUsername || userWithUpdatedUsername.id !== user_id){
      throw new AppError('User not logged in or without permission', 403);
    }

    user.name = name;
    user.username = username;
    user.email = email;
    user.is_teacher = is_teacher;

    if(password && !old_password){
      throw new AppError('You need to inform the old password to set a new password.');
    }

    if(password && old_password) {
      const checkOldPassword = await compare(
        old_password,
        user.password,
      );

      if(!checkOldPassword){
        throw new AppError('Old password does not match');
      }

      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }
}
export default UpdateUserService;
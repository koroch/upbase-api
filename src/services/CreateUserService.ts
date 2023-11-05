import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
    name: string;
    username: string;
    email: string;
    password: string;
    is_teacher: boolean;
}

class CreateUserService {
  public async execute({ name, username, email, password, is_teacher }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUsersExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUsersExists) {
      throw new Error('Email adress already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      is_teacher
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
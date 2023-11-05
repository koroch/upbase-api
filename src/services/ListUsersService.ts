import { getRepository } from 'typeorm';

import User from '../models/User';

interface IRequest {
  name: string;
  username: string;
  email: string;
  is_teacher: boolean;
}

class ListUsersService {
  public async execute(is_teacher: boolean): Promise<IRequest[]> {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();
    const usersFormat = users.map((item) => {
      let user = new User();
      user.name = item.name; 
      user.username = item.username; 
      user.email = item.email; 
      user.is_teacher = item.is_teacher;
      return user; 
    });

    const familiaLars = usersFormat.filter(function (item) {
        const result = item.is_teacher === is_teacher //se não for encontrado retorna -1
        return result;
    })

    return familiaLars;
  }
}
export default ListUsersService;
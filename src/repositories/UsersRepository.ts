import { getRepository, Repository, Not, DeleteResult } from 'typeorm';
import IUserRepository from '../repositories/IUsersRepository';

import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id);
    return user;
  }
  
  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: { email }
    });
    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: { username }
    });
    return user;
  }

  public async findAllUsers({except_user_id}: IFindAllUsersDTO): Promise<User[]>{
    let users: User[];
    if(except_user_id){
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        }
      });
    }else{
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User>{
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user);
  }
  
  public async delete(user: User): Promise<DeleteResult>{
    const isDeleted = await this.ormRepository.delete(user.id);
    return isDeleted;
  }
}

export default UsersRepository;
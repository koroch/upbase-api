import { DeleteResult } from "typeorm";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllUsersDTO from "../dtos/IFindAllUsersDTO";
import User from "../models/User";

export default interface IUsersRepository {
  findAllUsers(data: IFindAllUsersDTO): Promise<User[]>; 
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(user: User): Promise<DeleteResult>;
}
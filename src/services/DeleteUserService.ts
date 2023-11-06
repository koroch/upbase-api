import { injectable, inject } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "../errors/AppError";
import { DeleteResult } from "typeorm";

interface IRequest {
  user_id: string;
  email: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({user_id, email}: IRequest): Promise<DeleteResult> {
    const userConnected = await this.usersRepository.findById(user_id);
    if (!userConnected?.is_teacher) { //apenas professores podem deletar e precisa estar conectado
      throw new AppError("User isn't teacher", 403);
    }

    const checkEmailExists = await this.usersRepository.findByEmail(email);
    if (!checkEmailExists) {
      throw new AppError('The user of this email does not exist', 404);
    }


    const isDeleted = this.usersRepository.delete(checkEmailExists);

    return isDeleted;
  }
}
export default DeleteUserService;
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUniversallyUniqueIdentifierGeneratorRepository } from "../../repositories/IUniversallyUniqueIdentifierGeneratorRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
        private uuidGeneratorRepository: IUniversallyUniqueIdentifierGeneratorRepository,
    ){}
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
            throw new Error('User already exists');
        }

    data.id =  this.uuidGeneratorRepository.generate();

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
       to: {
        name: data.name,
        email: data.email,
       },
       from: {
        name: 'Equipe',
        email: 'equipe@app.com',
       },
       subject: 'Bem-vindo',
       body: `<p>Olá ${data.name}, sua conta foi criada com sucesso!</p>`,
    })
    }
}
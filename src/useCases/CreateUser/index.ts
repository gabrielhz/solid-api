import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { uuidv4UniversallyUniqueIdentifierGeneratorRepository } from "../../repositories/implementations/uuidv4UniversallyUniqueIdentifierGeneratorRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();
const uuidv4universallyUniqueIdentifierGeneratorRepository = new uuidv4UniversallyUniqueIdentifierGeneratorRepository();

const createUserUseCase = new CreateUserUseCase(
    postgresUsersRepository,
    mailtrapMailProvider,
    uuidv4universallyUniqueIdentifierGeneratorRepository
)

const createUserController = new CreateUserController(
    createUserUseCase,
)

export { createUserUseCase, createUserController } 
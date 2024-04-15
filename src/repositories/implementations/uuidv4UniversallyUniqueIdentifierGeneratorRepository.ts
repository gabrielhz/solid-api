import { uuid } from "uuidv4";
import { IUniversallyUniqueIdentifierGeneratorRepository } from "../IUniversallyUniqueIdentifierGeneratorRepository";

export class uuidv4UniversallyUniqueIdentifierGeneratorRepository implements IUniversallyUniqueIdentifierGeneratorRepository {
    generate(): string{
        const UUID = uuid();
        return UUID
    }
}
import { AppDataSource } from '@/data-source'
import { UserEntity } from '@/entity/users.entity'

export const UserRepository = AppDataSource.getRepository(UserEntity)

import { AppDataSource } from '../data-source'
import { UserEntity } from '../entity/users.entity'

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
  findByEmail(userEmail: string) {
    return this.findOneBy({
      email: userEmail,
    })
  },
})

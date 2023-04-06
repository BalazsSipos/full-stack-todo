import { AppDataSource } from '../data-source'
import { UserEntity } from '../entity/users.entity'

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
  findByEmail(userEmail: string) {
    console.log('findByEmail', userEmail)
    // const findOneBy = await this.findOneBy({
    //   email: userEmail,
    // })
    // console.log('findOneBy', findOneBy)
    return this.findOneBy({
      email: userEmail,
    })
  },
})

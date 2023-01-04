import { User } from "../../../user/models/User"

export const useUserList = (): User[] => {
    const user1: User = {
        id: '1',
        name: 'user1',
        email: 'email1@email.com',
        image: 'image1',
        numberOfTodos: 1
    }

    const user2: User = {
        id: '2',
        name: 'user2',
        email: 'email2@email.com',
        image: 'image2',
        numberOfTodos: 3
    }

    return [user1, user2];
}
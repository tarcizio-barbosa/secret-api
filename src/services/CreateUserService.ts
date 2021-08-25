import { prisma } from '../client';
import { hashSync } from 'bcryptjs';

interface UserRequest {
  userName: string;
  userEmail: string;
  userPassword: string;
}

class CreateUserService {
  async execute({ userName, userEmail, userPassword }: UserRequest) {
    if (!userEmail) {
      throw new Error('Please insert a valid e-mail.');
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        userEmail,
      },
    });

    if (userAlreadyExists) {
      throw new Error(
        'There is a unique constraint violation. A new user cannot be created with the same e-mail',
      );
    }

    const hashedPassword = hashSync(userPassword, 8);

    const user = await prisma.user.create({
      data: {
        userName,
        userEmail,
        userPassword: hashedPassword,
      },
    });

    return user;
  }
}

export { CreateUserService };

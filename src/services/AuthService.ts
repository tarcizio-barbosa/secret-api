import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../client';

interface UserAuthRequest {
  userEmail: string;
  userPassword: string;
}

class AuthService {
  async execute({ userEmail, userPassword }: UserAuthRequest) {
    const user = await prisma.user.findUnique({
      where: {
        userEmail,
      },
    });

    if (!user) {
      throw new Error('E-mail/Password incorrect.');
    }

    const passwordMatch = compareSync(userPassword, user.userPassword);

    if (!passwordMatch) {
      throw new Error('E-mail/Password incorrect.');
    }

    const token = sign(
      { email: user.userEmail },
      process.env.SECRET_KEY as string,
      { subject: user.id, expiresIn: '1d' },
    );

    return token;
  }
}

export { AuthService };

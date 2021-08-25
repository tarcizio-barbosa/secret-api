import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userName, userEmail, userPassword } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      userName,
      userEmail,
      userPassword,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };

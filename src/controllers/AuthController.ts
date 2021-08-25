import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

class AuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userEmail, userPassword } = request.body;

    const authService = new AuthService();

    const token = await authService.execute({ userEmail, userPassword });

    return response.status(200).json(token);
  }
}

export { AuthController };

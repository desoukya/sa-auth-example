import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

enum AuthTokenType {
  BEARER = 'Bearer',
}

type AuthToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: AuthTokenType;
}

type User = {
  email: string;
}

const passwords = Object.freeze({
  amrdesouky: 'helloGiuStudents!$'
});

 /**
 * Checks if the incoming request is for an authenticated user
 * @param req - Express Request Object
 * @param response - Express Response Object
 * @param next - Express Next Function
 * 
 * @returns next Function or Throws an Error if user is not authenticated
 */
  const isAuthenticatedUser = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  try {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
      throw new Error('Login first to access this resource.');
    }

    verify(token, String(process.env.JWT_SECRET));
    
    next();
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export default isAuthenticatedUser;

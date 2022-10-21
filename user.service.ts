import * as dotenv from "dotenv";
dotenv.config();
import authService from './auth.service'
import { UserDto, AuthToken, User, UserLookup } from './types';

const users: UserLookup = {
  amrdesouky: {
    id: '1',
    username: 'amrdesouky',
    name: 'Amr Desouky',
    password: 'helloGiuStudents!$',
    email: 'amr.desouky@giu-uni.de',
  }
};

class UserService {
  /**
   * Creates the JWT auth tokens
   * @param user
   * 
   * @returns AuthToken
   */
  login(user: UserDto): AuthToken {
    try {
      console.log('user', user)
      const userExists: User = users[user.username];
      console.log('userExists', userExists)
      if (!userExists) {
        throw new Error('user does not exist');
      }
      if (user.password !== userExists.password) {
        throw new Error('password does not match');
      }

      return authService.createAuthTokens(userExists);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Fetches User object
   * @param user
   * 
   * @returns User Object
   */
   getUser(user: UserDto): User {
    try {
      const userExists: User = users[user.username];
      if (!userExists) {
        throw new Error('user does not exist');
      }
      return userExists;
    } catch (e: any) {
      throw new Error(e);
    }
  }  
};

export default new UserService;
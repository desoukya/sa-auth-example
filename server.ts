import * as dotenv from "dotenv";
dotenv.config();

import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import authMiddleware from './middleware/auth.middleware';
import userService from './user.service';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * @return HTML to render /index page
 */
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error('Both Username & Password are required for login');
  }
  return res.json(userService.login(req.body));
});

// middleware to catch non-existing routes
app.use(authMiddleware);

/**
 * @return User object by username
 */
app.get('/user/:username', (req: Request, res: Response) => {
  const { username } = req.params;
  return res.json(userService.getUser({ username }))
});

/**
 * Starts the Express HTTP Server
 * @params {Number} - The web server port number
 */
app.listen(3000, () =>
  console.log('Auth app listening on port 3000'),
);
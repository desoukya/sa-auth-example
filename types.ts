export type UserDto = {
  username: string;
  password?: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
};

export type UserLookup = {
  [key: string]: User;
};

export enum AuthTokenType {
  BEARER = 'Bearer',
}

export type AuthToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: AuthTokenType;
}

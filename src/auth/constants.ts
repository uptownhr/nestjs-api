export const jwtConstants = {
  secret: 'superSecret'
};

export interface IAuthToken {
  _id: string;
  username: string;
}

export interface ICurrentUser {
  _id: string;
  username: string;
}

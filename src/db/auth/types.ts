export interface UserSession {
  user: {
    _id: string;
    name: string;
    email: string;
    pic: string;
    isAdmin: boolean;
  };
  token: string;
}

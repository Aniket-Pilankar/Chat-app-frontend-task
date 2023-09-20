export namespace API {
  export interface LoginRequest {
    user: {
      _id: string;
      name: string;
      email: string;
      pic: string;
      isAdmin: boolean;
    };
    token: string;
  }
}

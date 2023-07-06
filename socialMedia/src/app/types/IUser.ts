export interface IUser {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    profilePicture: {
      data: { data: [] };
      contentType: string;
    };
    following:string[];
    followers:string[];
    [key:string]:any;
  }
  
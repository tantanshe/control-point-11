export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ItemMutation {
  title: string;
  description: string;
  image: File | null;
  price: string;
  category: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  seller: { _id: string; displayName: string; phoneNumber: string};
}
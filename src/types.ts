// json-server v1 returns entity `id` fields as strings.
// `comment.dishId` is a number (it's a user-defined foreign key, not an auto-id).
export interface Dish {
  id: string;
  name: string;
  image: string;
  description: string;
  featured: boolean;
}

export interface Comment {
  id: string;
  dishId: number;
  rating: number;
  author: string;
  comment: string;
  date: string;
}

export interface Leader {
  id: string;
  name: string;
  image: string;
  designation: string;
  description: string;
  featured: boolean;
}

export interface Promotion {
  id: string;
  name: string;
  image: string;
  description: string;
  featured: boolean;
}

export interface Feedback {
  firstname: string;
  lastname: string;
  telnum: string;
  email: string;
  agree: boolean;
  contactType: string;
  message: string;
  date: string;
}

export interface AsyncState<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
}

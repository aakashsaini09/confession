export interface Confession {
  _id?: string;
  text: string;
  likes: number;
  dislikes: number;
  createdAt?: Date;
}

export interface Comment {
  _id?: string;
  confessionId: string;
  text: string;
  createdAt?: Date;
}

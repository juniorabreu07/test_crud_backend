export interface UserInterface {
  id: number;
  username: string;
  email: string;
  nombres: string;
  apellidos: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogout?: Date;
}
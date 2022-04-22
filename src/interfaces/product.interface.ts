export interface ProductInterface {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  logo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
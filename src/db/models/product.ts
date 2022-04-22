import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config';

interface ProductAttributes {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  logo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ProductInput extends Optional<ProductAttributes, 'id' | 'descripcion'> { }
export interface UserOuput extends Required<ProductAttributes> { }

class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
  public id!: number
  public nombre!: string
  public descripcion!: string
  public precio!: number
  public logo!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  precio: DataTypes.FLOAT,
  logo: DataTypes.STRING,
}, {
  sequelize: sequelizeConnection,
  paranoid: true
});

export default Product;
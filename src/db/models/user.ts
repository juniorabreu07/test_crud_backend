import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config';

interface UserAttributes {
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
export interface UsertInput extends Optional<UserAttributes, 'id' | 'password'> { }
export interface UserOuput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UsertInput> implements UserAttributes {
  public id!: number
  public username!: string
  public nombres!: string
  public apellidos!: string
  public email!: string
  public password!: string


  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly lastLogout!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  apellidos: DataTypes.STRING,
  password: DataTypes.STRING,
  nombres: DataTypes.STRING,
}, {
  sequelize: sequelizeConnection,
  paranoid: true
});

export default User;
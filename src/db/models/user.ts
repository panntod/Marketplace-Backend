import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Role from "./role";

interface UserAttributes {
  id?: number;
  name: string | null;
  email: string | null;
  password: string | null;
  roleID: number | null;
  accessToken: string | null;
  active?: boolean | null;
  verified: boolean | null;
  createdAt?: Date;
  updateAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleID!: number;
  public accessToken!: string;
  public active!: boolean;
  public verified!: boolean;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roleID: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accessToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: true,
  sequelize: connection,
  underscored: false
});

User.belongsTo(Role, { foreignKey: "roleID" })

export default User
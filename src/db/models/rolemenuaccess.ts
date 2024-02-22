import { DataTypes, Model, Optional} from 'sequelize'
import connection from '../../config/dbConnect'
import SubMenu from './submenu'
import Role from './role'

interface RoleMenuAccessAttributes {
  id?: number,
  roleID?: number | null,
  submenuID?: number | null,
  active?: boolean | null,

  createdAt?: Date,
  updatedAt? : Date
}

export interface RoleMenuAccessInput extends Optional<RoleMenuAccessAttributes, 'id'>{ }
export interface RoleMenuAccessOutput extends Required<RoleMenuAccessAttributes>{ }

class RoleMenuAccess extends Model<RoleMenuAccessAttributes, RoleMenuAccessInput> implements RoleMenuAccessAttributes {
  public id!: number;
  public roleID!: number;
  public submenuID!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

RoleMenuAccess.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  roleID: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  submenuID: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

RoleMenuAccess.belongsTo(SubMenu, {
  foreignKey: 'submenuID'
});
RoleMenuAccess.belongsTo(Role, {
  foreignKey: 'roleID'
});

export default RoleMenuAccess;
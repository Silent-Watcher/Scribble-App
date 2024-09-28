import { sequelize } from '$configs/db.config';
import { DataTypes } from 'sequelize';

export const userModel = sequelize.define('user', {
  displayName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

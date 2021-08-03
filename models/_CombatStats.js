/* Library & DB imports */
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

/* Establish Table as extension of Model class */
class CombatStats extends Model {}

CombatStats.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        HP: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ATK: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DEF: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'combat_stats',
    }
);

module.exports = CombatStats;

/**
 * id
 * HP
 * ATK
 * DEF
 */
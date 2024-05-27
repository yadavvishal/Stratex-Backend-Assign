const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Book = require('./Book')(sequelize, Sequelize.DataTypes);

User.hasMany(Book, { as: 'books' });
Book.belongsTo(User, {
    foreignKey: 'userId',
    as: 'seller'
});

sequelize.sync();

module.exports = { User, Book };

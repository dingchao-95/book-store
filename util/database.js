const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','Zequan@56',
                        {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
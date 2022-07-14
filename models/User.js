module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
            unique: true
        },
        location: {
            type: Sequelize.STRING,
        },
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
    });
    return Users;
};

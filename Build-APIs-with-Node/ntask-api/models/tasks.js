/** 
module.exports = app => {
    return {
        findAll: (params, callback) => {
            return callback([
                {title: "buy some shoes"},
                {title: "fix notebook"}
            ]);
        }
    };
};
*/
module.exports = (sequelize, Datatype) => {
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Tasks.belongsTo(models.Users);
            }
        }
    });
    return Tasks;
};


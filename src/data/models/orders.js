module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        userId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false 
        },
        state: {
            type: dataTypes.STRING(100),
            allowNull: false 
        },

    }
    let config = {
        tableName: "orders",
        timestamps: true
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as:"users",
            foreignKey: "userId"
        })
        Order.hasMany(models.Order_item, {
            as: "order_items",
            foreignKey: "orderId"
        })
    }

    return Order;
}
module.exports = (sequelize, dataTypes) => {
    let alias = "Product_images";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    let config = {
        tableName: "products_images",
        timestamps: false
    }

    const Product_images = sequelize.define(alias, cols, config)

    Product_images.associate = models => {
        Product_images.belongsTo(models.Product, {
            as: "products",
            foreignKey:"productId"
        })
    }

    return Product_images;
}
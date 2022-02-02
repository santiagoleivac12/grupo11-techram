module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(800),
        },
        specificationId: {
            type: dataTypes.STRING(300)
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        subcategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        images:{

        },
        stock: {

        },
        
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Subcategory, {
            as:"subcategories",
            foreignKey: "subcategoryId"
        })
        Product.hasMany(models.ProductImage, {
            as: "productImages",
            foreignKey: "productId"
        })
        Product.hasMany(models.Order_item, {
            as: "order_items",
            foreignKey: "productId"
        })
    }

    return Product;
}
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
        specificationsId: {
            type: dataTypes.STRING(11)
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(11)
        },
        subcategoryId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        images:{
           type: dataTypes.TEXT
        },
        stock: {
            type: dataTypes.INTEGER(11)
        },
        
    }
    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

/*     Product.associate = models => {
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
    } */

    return Product;
}
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
            type: dataTypes.STRING(800),
            allowNull: false
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
        stock: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
/*         description: {
            type: dataTypes.STRING(800),
            allowNull: false,
            autoIncrement: false,
        },
        conectivity: {
        type : dataTypes.STRING(360),
        autoIncrement: false
        },
        illumination : {
            type : dataTypes.STRING(60),
            autoIncrement: false
        } */
        
    }
    let config = {
        tableName: "products",
        timestamps: false
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
        Product.hasMany(models.Specification, {
            as: "specifications",
            foreignKey: "specificationsId"
        })
    }

    return Product;
}
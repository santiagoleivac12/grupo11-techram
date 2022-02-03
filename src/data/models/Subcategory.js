module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        categoryId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
    }
    let config = {
        tableName: "subcategories",
        timestamps: false
    }

    const Subcategory = sequelize.define(alias, cols, config)

    Subcategory.associate = models => {
        Subcategory.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        })
        Subcategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "subcategoryId"
        })
    }

    return Subcategory;
}
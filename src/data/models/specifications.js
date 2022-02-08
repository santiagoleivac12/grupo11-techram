module.exports = (sequelize, dataTypes) => {
    let alias = "specifications";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        genral: {
            type: dataTypes.STRING(60),
            allowNull: false,
            autoIncrement: false,
        },
        conectivity: {
        type : dataTypes.STRING(60),
        autoIncrement: false
        },
        characteristics: {
            type : dataTypes.STRING(60),
            autoIncrement: false
        },
        illumination : {
            type : dataTypes.STRING(60),
            autoIncrement: false
        }
      
    }
    
    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config)

    Category.associate = models => {
        Category.hasMany(models.Subcategory, {
            as: "subcategories",
            foreignKey: "categoryId"
        })
    }

    return Category;
}




















id
general
conectivity
characteristics
illumination
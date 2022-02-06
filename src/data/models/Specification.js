module.exports = (sequelize, dataTypes) => {
    let alias = "Specification";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        general: {
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
        tableName: "specifications",
        timestamps: false
    }

    const Specification = sequelize.define(alias, cols, config)

/*     Specification.associate = models => {
        Specification.hasMany(models.Product, {
            as: "products",
            foreignKey: "specificationsId"
        })
    } */

    return Specification;
}




















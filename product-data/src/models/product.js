'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.DECIMAL,
        sku: DataTypes.STRING,
        image: DataTypes.STRING,
        availability: DataTypes.BOOLEAN
    });

    return Product;
};
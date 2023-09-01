"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Request, {
                foreignKey: "requestId",
            })
            this.belongsTo(models.User, {
                foreignKey: "userId",
            })
        }
    }
    Review.init(
        {
            rating: { type: DataTypes.INTEGER, defaultValue: 3 },
            details: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Review",
        }
    )

    return Review
}

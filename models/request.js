"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Section = require("./section")(sequelize, DataTypes);
    const User = require("./user")(sequelize, DataTypes);

    class Request extends Model {
        get thumbnails() {
            return JSON.parse(this.getDataValue("thumbnailsText"));
        }

        set thumbnails(value) {
            this.setDataValue("thumbnailsText", JSON.stringify(value));
        }

        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "userId",
            });
            this.hasMany(models.Offer, {
                foreignKey: "requestId",
            });
            this.hasOne(models.Review, {
                foreignKey: "requestId",
            });
            this.belongsTo(models.Section, {
                foreignKey: "sectionId",
            });
        }
    }
    Request.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            thumbnailsText: {
                type: DataTypes.TEXT,
                defaultValue: "[]",
            },
            minPrice: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
            },
            maxPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            durationRange: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            locationLat: {
                type: DataTypes.FLOAT,
            },
            locationLong: {
                type: DataTypes.FLOAT,
            },
            status: {
                type: DataTypes.INTEGER, // 1, 2, 3
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: "Request",
        }
    );

    Request.getRequests = async ({
        query,
        status = 1,
        sectionId,
        locationLat,
        locationLong,
        page = 1,
        limit = 10,
    }) => {
        let options = { where: { status }, limit, offset: (page - 1) * limit };
        query && (options.where.title = { [Op.like]: `%${query}%` });
        sectionId && (options.where.sectionId = sectionId);
        let distanceField = sequelize.literal(
            `sqrt(pow(${locationLat} - "locationLat", 2) + pow(${locationLong} - "locationLong", 2))`
        );
        if (locationLat && locationLong) {
            options.attributes = {
                include: [[distanceField, "distance"]],
            };
            options.order = [["distance", "ASC"]];
        }
        return await Request.findAll(options);
    };

    Request.getRequestById = async requestId => {
        return await Request.findByPk(requestId, { include: [Section, User] });
    };

    Request.createRequest = async ({
        title,
        address,
        description,
        thumbnails,
        userId,
        sectionId,
        minPrice,
        maxPrice,
        durationRange,
        locationLat,
        locationLong,
    }) => {
        let data = { title, userId, sectionId, maxPrice };
        address && (data.address = address);
        description && (data.description = description);
        thumbnails && (data.thumbnails = thumbnails);
        minPrice && (data.minPrice = minPrice);
        durationRange && (data.durationRange = durationRange);
        locationLat && (data.locationLat = locationLat);
        locationLong && (data.locationLong = locationLong);
        return await Request.create(data);
    };

    Request.updateRequest = async (
        requestId,
        {
            title,
            address,
            description,
            thumbnails,
            sectionId,
            minPrice,
            maxPrice,
            durationRange,
            locationLat,
            locationLong,
        }
    ) => {
        let data = { title, sectionId, maxPrice };
        address && (data.address = address);
        description && (data.description = description);
        thumbnails && (data.thumbnails = thumbnails);
        minPrice && (data.minPrice = minPrice);
        durationRange && (data.durationRange = durationRange);
        locationLat && (data.locationLat = locationLat);
        locationLong && (data.locationLong = locationLong);
        return await Request.update(data, { where: { id: requestId } });
    };

    Request.deleteRequest = async requestId => {
        return await Request.destroy({ where: { id: requestId } });
    };

    return Request;
};

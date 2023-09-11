"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const User = require('./user')(sequelize, DataTypes);
    const Request = require('./request')(sequelize, DataTypes);

    class Offer extends Model {
        static associate(models) {
            this.belongsTo(models.Request, {
                foreignKey: "requestId",
            })
            this.belongsTo(models.User, {
                foreignKey: "userId",
            })
        }
    }
    Offer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            scheduledAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            lastOffered: {
                type: DataTypes.BOOLEAN,
                defaultValue: false, // false: provider, true: seeker
            },
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 1, // 1: Negotiating, 2: Confirmed, 0: Rejected
            },
            isPaid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Offer",
        }
    )

    Offer.getOfferById = async (offerId) => {
        return await Offer.findByPk(offerId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'avatar']
                },
                Request
            ]
        })
    }

    Offer.getConfirmedOfferByRequestId = async (requestId) => {
        return await Offer.findOne({ where: { status: 2, requestId } });
    }

    Offer.getOffers = async (userId, requestId, { status, lastOffered, isPaid, page = 1, limit = 10 }) => {
        let options = { where: {}, order: [['createdAt', 'DESC']], limit, offset: (page - 1) * limit };
        userId && (options.where.userId = userId);
        requestId && (options.where.requestId = requestId);
        status && (options.where.status = status);
        lastOffered && (options.where.lastOffered = lastOffered);
        isPaid && (options.where.isPaid = isPaid);
        return await Offer.findAll(options);
    }

    Offer.getReceivedOffers = async (userId, { status, lastOffered, isPaid, page = 1, limit = 10 }) => {
        let options = {
            where: {},
            include: {
                model: Request,
                where: { userId }
            },
            limit,
            offset: (page - 1) * limit
        };
        status && (options.where.status = status);
        lastOffered && (options.where.lastOffered = lastOffered);
        isPaid && (options.where.isPaid = isPaid);
        return await Offer.findAll(options);
    }

    Offer.createOffer = async (userId, requestId, { price, scheduledAt }) => {
        return await Offer.create({ requestId, userId, price, scheduledAt });
    }

    return Offer
}

const { sequelize } = require("../config");
const { Admin } = require("./admins");
const { Offer } = require("./offers");
const { Report } = require("./reports");
const { Request } = require("./requests");
const { Review } = require("./reviews");
const { Section } = require("./sections");
const { User } = require("./users");

User.belongsTo(Section);
Section.hasMany(User);

Request.belongsTo(User);
User.hasMany(Request);

Offer.belongsTo(Request);
Request.hasMany(Offer);

Offer.belongsTo(User);
User.hasMany(Offer);

Review.belongsTo(Request);
Request.hasOne(Review);

Review.belongsTo(User);
User.hasMany(Review);

Report.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Report.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

User.hasMany(Report, { as: 'sentReports', foreignKey: 'senderId' });
User.hasMany(Report, { as: 'receivedReports', foreignKey: 'receiverId' });

sequelize.sync();
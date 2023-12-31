const path = require("path")
const crypto = require("crypto")
const { diskStorage } = require("multer")

module.exports = new (function () {
  this.sitename = {
    en: "Ay Khedma",
    ar: "أي خدمة",
  }

  this.cors = {
    // origin: 'http://localhost:3000'
  }

  // this.secret =
  //   process.env.NODE_ENV === "production"
  //     ? crypto.randomBytes(20).toString("hex")
  //     : "ThisIsASecret"
  this.secret = "ThisIsASecret"

  this.uploads = {
    avatar: path.join(__dirname, "uploads", "avatars"),
    identity: path.join(__dirname, "uploads", "identities"),
    icon: path.join(__dirname, "uploads", "icons"),
    thumbnail: path.join(__dirname, "uploads", "thumbnails"),
  }

  this.uploadSettings = {
    storage: diskStorage({
      destination: (req, file, callback) =>
        callback(null, this.uploads[file.fieldname]),
      filename: (req, file, callback) =>
        callback(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '')}`),
    }),
  }

  this.port = process.env.PORT || 4000
})()

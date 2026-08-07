const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// Password and username will create automatically by passportLocalMongoose(plugin)...
userSchema.plugin(passportLocalMongoose.default);
module.exports = mongoose.model('User', userSchema);

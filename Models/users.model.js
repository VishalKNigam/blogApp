const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        enum: ["User", "Moderator"],
        default: "User"
    }    
})
const UserModel = mongoose.model("user", UserSchema);
module.exports = {UserModel};

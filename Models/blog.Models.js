const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    blogs: {
        type: String,
        required: true,

    }   
})
const BlogModel = mongoose.model("blog", BlogSchema);
module.exports = {BlogModel};

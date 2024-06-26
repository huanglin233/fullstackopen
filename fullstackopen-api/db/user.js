const { set } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    name: String,
    passwrodHash: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

userSchema,set('toJson', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwrodHash
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;

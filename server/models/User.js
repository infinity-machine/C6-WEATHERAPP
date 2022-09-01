const { Schema, SchemaTypes, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'YOU MUST PROVIDE AN EMAIL ADRESS'],
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
    },
    
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function () {
    const hashed_pass = await bcrypt.hash(this.password, 10);
    this.password = hashed_pass;
});

userSchema.methods.validatePass = async function (raw_pass) {
    const cooked_pass = await bcrypt.compare(raw_pass, this.password);
    return cooked_pass;
};

const User = model('User', userSchema);

module.exports = User
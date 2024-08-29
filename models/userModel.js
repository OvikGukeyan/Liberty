import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    email: {type: String, required: true, uniq: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    company: {type: String},
    address: {type: String, required: true},
    city: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
},
{
    timestamps: true
});

export default model('User', UserSchema);
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const contactSchema = new Schema(
    {
        _id: { type: String, _id: false },
        name: { type: String, require: true, minLength: 4, maxLength: 30 },
        email: { type: String, require: true, unique: true },
        phone: { type: String, require: true, unique: true },
        role: {
            type: String,
            require: true,
            enum: { values: ['customer', 'supplier', 'sponsor', 'other'] }
        },
        isAvailable: {
            type: Boolean,
            require: true
        }
    },
    { timestamps: true }
);

const contactModel = model('Contact', contactSchema);

export default contactModel;

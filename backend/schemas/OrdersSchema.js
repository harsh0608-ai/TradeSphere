const { Schema }= require('mongoose');

const OrdersSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports=OrdersSchema;
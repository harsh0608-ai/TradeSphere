const {Schema}=require('mongoose');

const HoldingSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    openPrice: Number,  // Previous day's opening price for day change calculation
});
module.exports=HoldingSchema;
const mongoose = require('mongoose');

const purchasesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }   
});

const Purchase = mongoose.model('Purchase', purchasesSchema);

module.exports = Purchase;
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const Goods = new Schema({
    type: String,
    brand: String,
    name: String,
    spec: String,
    purchasePrice: String,
    supplyPrice: String,
    recommendedPrice: String,
    taobaoPrice: String,
    remark: String,
    purchaseLocation: String
})

mongoose.model("Goods", Goods);
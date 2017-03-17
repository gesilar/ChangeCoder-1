const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PmoSchema = new mongoose.Schema({
        name: String, 
        company: String, 
        tel: String,
        person: String, 
        partname: String,
        type: String
});

mongoose.model('Pmo', PmoSchema);
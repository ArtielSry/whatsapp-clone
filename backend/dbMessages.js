import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

export default mongoose.model('messagecontents', whatsappSchema)
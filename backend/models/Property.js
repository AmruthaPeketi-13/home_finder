import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        type: { type: String, enum: ["buy", "rent", "book"], required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
            type: String,
            enum: ["pending", "approved", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Property", propertySchema);

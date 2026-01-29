import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  const property = await Property.create({
    ...req.body,
    owner: req.user._id,
  });
  res.json(property);
};

export const getApprovedProperties = async (req, res) => {
  const properties = await Property.find({ status: "approved" }).populate(
    "owner",
    "name email"
  );
  res.json(properties);
};

export const approveProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  property.status = "approved";
  await property.save();
  res.json(property);
};

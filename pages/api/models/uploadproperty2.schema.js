import mongoose from "mongoose";

// MAIN SCHEMA
const uploadProperty2 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  minprice: {
    type: Number,
  },
  maxprice: {
    type: Number,
  },
  realprice: {
    type: Number,
  },
  offerprice: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  propertyname: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  ownername: {
    type: String,
    required: true,
  },
  owneraddress: {
    type: String,
    required: true,
  },
  ownerphone: {
    type: String,
    required: true,
  },
  property: {
    type: String,
  },
  whychoose1: {
    type: String,
    required: true,
  },
  whychoose2: {
    type: String,
    required: true,
  },
  whychoose3: {
    type: String,
    required: true,
  },
  whychoose4: {
    type: String,
    required: true,
  },
  whychoose5: {
    type: String,
    required: true,
  },
  iframe: {
    type: String,
    // required: true
  },
  sqft: {
    type: Number,
  },
  ratepersqft: {
    type: Number,
  },
  rera: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
});

uploadProperty2.set("timestamps", true);

module.exports =
  mongoose.models.allpropertyiess ||
  mongoose.model("allpropertyiess", uploadProperty2);

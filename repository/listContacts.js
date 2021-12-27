import Contact from "../model/contact.js";

const listContacts = async () => {
  const total = await Contact.find().countDocuments();
  const result = await Contact.find();
  return { total, contacts: result };
};

export default listContacts;

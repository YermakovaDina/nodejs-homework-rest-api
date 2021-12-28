import listContacts from "./listContacts";
import getContactById from "./getContactById";
import removeContact from "./removeContact";
import addContact from "./addContact";
import updateContact from "./updateContact";

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// До того как разделила:
// import Contact from "../model/contact.js";

// const listContacts = async () => {
//   const total = await Contact.find().countDocuments();
//   const result = await Contact.find();
//   return { total, contacts: result };
// };

// const getContactById = async (contactId) => {
//   const result = await Contact.findById(contactId);
//   return result;
// };

// const removeContact = async (contactId) => {
//   const result = await Contact.findByIdAndRemove(contactId);
//   return result;
// };

// const addContact = async (body) => {
//   const result = await Contact.create(body);
//   return result;
// };

// const updateContact = async (contactId, body) => {
//   const result = await Contact.findByIdAndUpdate(
//     contactId,
//     { ...body },
//     { new: true }
//   );
//   return result;
// };

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

import Contact from "../model/contact.js";

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

export default removeContact;

import Contact from "../model/contact.js";

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};

export default getContactById;

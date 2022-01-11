import Contact from "../model/contact.js";

const listContacts = async (
  userId,
  { favorite = null, sortBy, sortByDesc, filter, limit = 20, page = 1 }
) => {
  let sortCriteria = null;
  let total = await Contact.find({ owner: userId }).countDocuments();
  let result = Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email phone age role subscription",
  });
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split("|").join(" ")); // 'name age'
  }
  if (favorite) {
    result.find({ favorite: `${favorite}` });
    total = await Contact.find({
      owner: userId,
      favorite: `${favorite}`,
    }).countDocuments();
  }
  let size = 0;
  if (total - (page - 1) * limit > limit) {
    size = limit;
  } else if (
    total - (page - 1) * limit < limit &&
    total - (page - 1) * limit >= 1
  ) {
    size = total - (page - 1) * limit;
  }
  result = await result
    .skip(Number((page - 1) * limit))
    .limit(Number(limit))
    .sort(sortCriteria);
  return { total, size, contacts: result };
};

export default listContacts;

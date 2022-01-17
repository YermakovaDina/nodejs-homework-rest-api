import { Router } from "express";
import guard from "../../../middlewares/guard";

import {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../../controllers/contacts/index.js";

import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "./validation.js";

const router = new Router();

router.get("/", [guard, validateQuery], getContacts);

router.get("/:id", [guard, validateId], getContactById);

router.post("/", [guard, validateCreate], addContact);

router.delete("/:id", [guard, validateId], removeContact);

router.put("/:id", [guard, validateId, validateUpdate], updateContact);

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContact
);

export default router;

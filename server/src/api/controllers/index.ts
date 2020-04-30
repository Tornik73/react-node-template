import { Router } from "express";
import auth from "./auth/auth.route";
import users from "./users/user.route";
import books from "./books/book.route";
import CHATS from "./chat/chat.route";

const router: Router = Router();
router.use("/env", (req, res) => {
  res.json(process.env);
});
router.use("/", auth);
router.use("/users", users);
router.use("/books", books);
router.use("/chat", CHATS);

export default router;

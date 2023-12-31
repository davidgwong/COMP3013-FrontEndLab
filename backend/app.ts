import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  editPost,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    if (!!user) {
      next();
    } else res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(401).json({ error });
  }
}

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", ensureAuthenticated, async (req, res) => {
  // Sleep delay goes here
  sleep(500).then(() => {
    return res.json(posts);
  });
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", ensureAuthenticated, (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((obj) => obj.id === id);
  const token = req.headers.authorization?.split(" ")[1];

  let canEdit = false;

  if (post) {
    if (token) {
      const decoded = jwt.decode(token, { json: true });
      if (decoded && decoded.id == post.userId) canEdit = true;
    }
    const author = findUserById(post.userId).email.split("@")[0];
    const output = {
      author: author,
      userId: post.userId,
      title: post.title,
      category: post.category,
      content: post.content,
      image: post.image,
      canEdit: canEdit,
      id: post.id,
    };
    return res.json(output);
  }
  return res.json(post);
});

app.post("/api/posts/:id", ensureAuthenticated, (req, res) => {
  const incomingEdits = req.body;
  editPost(incomingEdits);
  res.status(200).json({ success: true });
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", ensureAuthenticated, (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));

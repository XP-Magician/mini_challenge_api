const validateBody = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ message: "You forgot sending credentials," }).end();
  } else {
    next();
  }
};

const authUser = (req, res, next) => {
  const { username, password } = req.body;
};

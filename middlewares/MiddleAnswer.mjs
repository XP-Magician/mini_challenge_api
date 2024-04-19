// Dependencies
import CONSTANTS from path.join('..','config','constants.mjs');

// Endpoints
export const checkAnswerStructure = (req, res, next) => {
  const { number_of_groups, answer } = req.body;
  if (number_of_groups && answer) next();
  else
    return res.status(400).json({
      message: "Missing required fields for answering, check your entries.",
    });
};

export const validateAnswer = (req, res, next) => {
  //Add +1 to rate storage according to IP
  const { number_of_groups, answer } = req.body;
  if (number_of_groups !== CONSTANTS.NUMBER_OF_GROUPS) {
    req.x_message = { message: "incorrect number of groups." };
    next();
  }
  if (answer !== CONSTANTS.CORRECT_ANSWER) {
    req.x_message = { message: "incorrect answer." };
    next();
  }
  req.x_message = { message: "correct answer!" };
  next();
};

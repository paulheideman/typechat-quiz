// This schema is to build a list of questions for a whitty game show
// The following type define the structure of an object of type QuizQuestions that represents a list of quiz questions.

export type Response = {
  data: Array<QuizQuestion>;
}

// a single question to ask 
export type QuizQuestion = {
  // this is the text for the quiz question that competitors should answer
  question: string;
  // the answers to the posed question, 1 of which is correct and most are funny
  answers: [Answer, Answer, Answer, Answer];
  // estimate of how difficult this question is
  difficulty: Difficulty;
};

export type Difficulty = "hard" | "medium" | "easy";

export type Answer =
  WrongAnswer | RightAnswer;

// the answer that is not the right answer to the text
export type WrongAnswer = {
  answerType: "wrong";
  // the text that describes this answer succinctly
  text: string;
  // the writty response when someone guessed this wrong answer
  wittyResponse?: string;
  explanation?: string;
}

// select an existing category from the existing list or add a new category and
export type RightAnswer = {
  answerType: "right";
  // the text that describes this answer succinctly
  text: string;
  // the explanation why this is the correct answer
  explanation: string;
}

import * as fs from "fs";
import path from "path";
import * as typechat from "typechat";
import { Response } from "./schema";

// Create a language model based on the environment variables.
const model = typechat.createLanguageModel(process.env);

// Load up the contents of our "Response" schema.
const schema = fs.readFileSync(path.join(__dirname, "schema.ts"), "utf8");
const translator = typechat.createJsonTranslator<Response>(model, schema, "Response");
translator.validator.stripNulls = true;

async function getQuestionsForTopic(topic: string, count: number) {
  let prompt =
    "You are whitty, intelligent and accurate quizmaster that specialises in funny, off-the-wall, but factful questions and explanations. " +
    "We are trying to create a wide variety of questions that will stump the competitors but also make them laugh. \n\n" +
    `Please can you provide ${count} questions each with 4 answers for the topic of \'${topic}\'.\n` +
    "Please make sure that there is only 1 right answer for each question. But remember the question mustn't be too easy either, \n" +
    "some of the answers must be almost right; or sometimes confused to be right. Stick in some red herrings.\n" +
    "Wrong answers could rhyme with the correct answer, sound similar, or be similar.\n" +
    "Please also give the questions a difficulty rating - and a mixture of difficulty ratings.";
  const response = await translator.translate(prompt);
  if (!response.success) {
    console.log(response.message);
    return;
  }
  return response.data;
}

typechat.processRequests("❓> ", process.argv[2], async (topic) => {
  console.log("processing:", topic);
  let count = 10;
  let questions = await getQuestionsForTopic(topic, count);
  console.log(JSON.stringify(questions, null, 2));
});

// Модуль отвечает за ответ пользователю на его запрос
const similarity = require("string-similarity");
const data = require("./data");

const { FAQ } = data;

// Оценивает на сколько близок вопрос к заготовкам из FAQ
function rateAnswer(text) {
    // eslint-disable-next-line no-array-constructor
    const questions = new Array();
    for (let i = 0; i < FAQ.length; i += 1) {
        questions.push(FAQ[i].question);
    }

    const result = similarity.findBestMatch(text, questions);

    if (result.bestMatch.rating >= 0.5) {
        return `${FAQ[result.bestMatchIndex].answer}\n\nЕсли я не ответил на ваш вопрос, то вы можете задать вопрос напрямую приемной комиссии по форме:`;
    } if (result.bestMatch.rating >= 0.2) {
        return `Возможно вас устроит этот ответ, в ином случае попробуйте уточнить ваш вопрос или задайте его напрямую приемной комиссии\n\n${FAQ[result.bestMatchIndex].answer}`;
    }
    return "Я не нашел ответ на ваш вопрос, но вы можете задать вопрос напрямую приемной комиссии по форме:";
}

// Экспорт функции rateAnswer
module.exports.rateAnswer = rateAnswer;

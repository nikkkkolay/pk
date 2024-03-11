// Модуль отвечает за ответ пользователю на его запрос
const similarity = require("string-similarity");
const data = require("./data");
// const { formKb } = require("./keyboard");

const { FAQ } = data;

// Оценивает на сколько близок вопрос к заготовкам из FAQ
function rateAnswer(text) {
    // eslint-disable-next-line no-array-constructor
    const questions = new Array();
    for (let i = 0; i < FAQ.length; i += 1) {
        questions.push(FAQ[i].question);
    }

    // Текст который дал пользователем может быть стикером - что крашит бота
    if (!(typeof text === "string")) {
        return "Я не нашел ответ на ваш вопрос, но вы можете задать вопрос напрямую приемной комиссии по форме:";
    }

    const result = similarity.findBestMatch(text, questions);

    if (result.bestMatch.rating >= 0.5) {
        return `${FAQ[result.bestMatchIndex].answer}\n\nЕсли я не ответил на ваш вопрос, то вы можете задать вопрос напрямую приемной комиссии по форме:`;
    } if (result.bestMatch.rating >= 0.2) {
        return `Возможно вас устроит этот ответ, в ином случае попробуйте уточнить ваш вопрос или задайте его напрямую приемной комиссии\n\n${FAQ[result.bestMatchIndex].answer}`;
    }
    return "Я не нашел ответ на ваш вопрос, но вы можете задать вопрос напрямую приемной комиссии по форме:";
}
// Возвращает адрес выбранного пользователем офиса МАУ
function returnAddress(text) {
    let formatedText = "";
    switch (text) {
    case "bachelorOffice1":
        formatedText = `${data.bachelorContact[0]}• Адрес: 183010, Мурманск, пр\\. Кирова, д\\.1, корпус Л, каб 112\n${data.bachelorContact[1]}`;
        break;
    case "bachelorOffice2":
        formatedText = `${data.bachelorContact[0]}• Адрес: 183010, Мурманск, пр\\. Кап\\. Егорова, д\\. 16, каб\\. 116\n${data.bachelorContact[1]}`;
        break;
    case "bachelorOffice3":
        formatedText = `${data.bachelorContact[2]}• Адрес: 184209, Апатиты, ул\\. Лесная, д\\. 29\n${data.bachelorContact[3]}`;
        break;
    case "vocationalOffice1":
        formatedText = `${data.vocationalContact[0]}• Адрес: 183010, Мурманск, пр\\. Шмидта, д\\. 19, каб\\. 103\n${data.vocationalContact[1]}`;
        break;
    case "vocationalOffice2":
        formatedText = `${data.vocationalContact[2]}• Адрес: 183038, Мурманск, пр\\. Ленина, д\\. 57, каб\\. 107\n${data.vocationalContact[3]}`;
        break;
    case "vocationalOffice3":
        formatedText = `${data.vocationalContact[4]}• Адрес: 184651, Полярный, ул\\. Лунина, д\\. 5\n${data.vocationalContact[5]}`;
        break;
    case "vocationalOffice4":
        formatedText = `${data.vocationalContact[6]}• Адрес: 184250, Кировск, ул\\. 50 лет Октября, д\\. 2, корпус 1, каб\\. 1116\n${data.vocationalContact[7]}`;
        break;
    default:
        formatedText = "Я не знаю такого офиса";
        break;
    }
    return formatedText;
}

// Экспорт функции rateAnswer
module.exports.rateAnswer = rateAnswer;
module.exports.returnAddress = returnAddress;

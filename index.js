// Telegram-бот, выводящий полезную информацию через варианты меню: "Тест на профориентацию", "Полезная информация", "FAQ", "Калькулятор ЕГЭ".
// Главный файл, с которого и начинается запуск бота

const { Telegraf, Scenes, session } = require("telegraf");
const kb = require("./keyboard");
const rate = require("./messageAnalys");
const preExamScene = require("./scenes");

// Обработка токена бота. Если токена нет - кидает ошибку, завершает программу
// Токен берется из файла `.env` в формате "BOT_TOKEN = <token>"
require("dotenv").config();

// Обработка ошибки, если не существует токена бота
const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error("\"BOT_TOKEN\" env var is required!");
const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([preExamScene]);
bot.use(session());
bot.use(stage.middleware());

// Начальное сообщение, которое печатает бот, если нажать на кнопку "Start"
bot.start(async (ctx) => {
    await ctx.reply(
        `Hello ${ctx.update.message.from.first_name}!\nЯ могу проконсультировать тебя по любому вопросу. Просто спроси!`,
        kb.mainKb
    );
});

//
// HEARS
//
// Секция прсвященная вводу/выводу на запросы
bot.hears("FAQ", async (ctx) => {
    // Кнопка FAQ ниже поля ввода текста
    await ctx.reply(
        "Просто напишите мне ваш вопрос и я постараюсь найти на него ответ или задайте его напрямую приемной комиссии по форме",
        kb.formKb
    );
});
bot.hears("Полезная информация", async (ctx) => {
    // Полезная информация, кнопки для полезной информации берутся из keyboard.js
    await ctx.reply("Выберите интересующую вас тему", kb.helpKb);
});
bot.hears("Тест на профориентацию", async (ctx) => {
    // Тест на профориетнацию
    // TODO: сделать имплементацию
    await ctx.reply("Тест на профориентацию в разработке");
});
bot.hears("Калькулятор ЕГЭ", async (ctx) => {
    // TODO: плохо работает, нужно будет сделать систему с удалением уже выбранного экзамена из списка
    // Т.к. сейчас можно выбрать первым экзаменом "Математика" и вторым экзаменом "Математика"
    // await ctx.reply("Укажите ваши баллы за экзамен по русскому языку (только число, например: 40)");
    await ctx.scene.enter("preExamWizard");
});
bot.hears("Что ещё важно", async (ctx) => {
    await ctx.reply(
        "Здесь вы найдете все об условиях проживания и стипендиях, а также о мероприятиях поддержки и дополнительных возможностях",
        kb.extraKb
    );
});

//
// ACTION
//
// Обработка нажатия кнопок и показываемого текста при взаимодействии с меню
bot.action("Declaration", async (ctx) => {
    await ctx.editMessageText("Выберите уровень образования", kb.declarationKb);
});
bot.action("Consert", async (ctx) => {
    await ctx.editMessageText("Выберите уровень образования", kb.consertKb);
});
bot.action("Back to help", async (ctx) => {
    await ctx.editMessageText("Выберите интересующую вас тему", kb.helpKb);
});

//
// ON
//
// С вводом текста оценивает на какой из существующих вариантов стоит предложить как автодополнение
bot.on("message", async (ctx) => {
    const result = rate.rateAnswer(ctx.message.text);
    await ctx.replyWithMarkdownV2(
        // Для экранирования зарезервированных Markdown символов
        result
            .replace(/\-/g, "\\-")
            .replace(/\./g, "\\."),
        kb.formKb
    );
});

// Запуск бота
bot.launch();

// Завершение процесса npm и работы бота
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

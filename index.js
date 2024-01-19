const{Telegraf, Scenes, session} = require('telegraf')
const kb = require("./keyboard");
const rate = require("./messageAnalys");

require('dotenv').config()

const preExamScene = require('./scenes')



const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(BOT_TOKEN);

const stage = new Scenes.Stage([
  preExamScene
])
bot.use(session())
bot.use(stage.middleware())

bot.start(async ctx => {
  await ctx.reply(`Hello ${ctx.update.message.from.first_name}!\nЯ могу проконсультировать тебя по любому вопросу. Просто спроси!`,   
  kb.mainKb)
});

bot.hears("FAQ", async ctx => {
  await ctx.reply('Просто напишите мне ваш вопрос и я постараюсь найти на него ответ или задайте его напрямую приемной комиссии по форме',
  kb.formKb)
});
bot.hears("Полезная информация", async ctx => {
  await ctx.reply('Выберите интересующую вас тему',
  kb.helpKb)
});
bot.hears("Тест на профориентацию", async ctx => {
  await ctx.reply('Тест на профориентацию в разработке');
});
bot.hears("Калькулятор ЕГЭ", async ctx => {
  //await ctx.reply('Укажите ваши баллы за экзамен по русскому языку (только число, например: 40)');
  await ctx.scene.enter('preExamWizard');
})

bot.action('Declaration', async ctx => {
  await ctx.editMessageText('Выберите уровень образования', kb.declarationKb)
});
bot.action('Consert', async ctx => {
  await ctx.editMessageText('Выберите уровень образования', kb.consertKb)
});
bot.action('Back to help', async ctx => {
  await ctx.editMessageText('Выберите интересующую вас тему', kb.helpKb)
});

bot.on("message", async ctx => {
  result = rate.rateAnswer(ctx.message.text);
  await ctx.reply(result, kb.formKb)
});

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'));
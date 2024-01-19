const {Markup, Composer, Scenes, Context} = require('telegraf')
const kb = require("./keyboard");
const sqlite3 = require('sqlite3');
const startStep = new Composer()
startStep.on("text", async ctx => {
    try{
        ctx.wizard.state.data = {}
        await ctx.reply("Какие экзамены по выбору, которые вы сдавали/будете сдавать ", kb.examsKb)
        return ctx.wizard.next()
    }catch (e) {
        await ctx.reply('Произошла ошибка')
        return ctx.scene.leave()
    }
})

const examStep1 = new Composer()
examStep1.action(/exam:(.+)/, async ctx => {
    try{
        ctx.wizard.state.data.exam1= String(ctx.callbackQuery.data).split(':')[1];
        await ctx.editMessageText(`Укажите баллы за экзамен: ${ctx.wizard.state.data.exam1}`);
        return ctx.wizard.next();
    }catch (e) {
        await ctx.reply('Произошла ошибка')
        ctx.scene.leave();
    }
})

const examScoreStep1 = new Composer()
examScoreStep1.on("text", async ctx => {
    try{
        ctx.wizard.state.data.examScore1= Number(ctx.message.text);
        await ctx.deleteMessage()
        await ctx.reply(`Укажите второй экзамен по выбору`, kb.examsKb);
        return ctx.wizard.next();
    }catch (e) {
        await ctx.reply('Произошла ошибка')
        ctx.scene.leave();
    }
})

const examStep2 = new Composer()
examStep2.action(/exam:(.+)/, async ctx => {
    
    try{
        ctx.wizard.state.data.exam2= String(ctx.callbackQuery.data).split(':')[1];
        await ctx.deleteMessage()
        await ctx.reply(`Укажите баллы за экзамен: ${ctx.wizard.state.data.exam2}`);
        return ctx.wizard.next();
    }catch (e) {
        await ctx.reply('Произошла ошибка')
        ctx.scene.leave();
    }
})

const examScoreStep2 = new Composer()
examScoreStep2.on("text", async ctx => {
    try{
        let db = new sqlite3.Database('./exams.db' , (err) => {
            if(err)
            {
                console.log("Error Occurred - " + err.message);
            }
            else
            {
                console.log("DataBase Connected");
            }
        });
        ctx.wizard.state.data.examScore2= Number(ctx.message.text);
        await ctx.deleteMessage()
        await ctx.reply(`Вот направления, на которые вы можете поступить:`);
        
    
        await db.each(`SELECT Направление 
                            FROM StudyProg 
                            INNER JOIN Subjects as S on StudyProg.ЕГЭ_1 = S.id 
                            INNER JOIN Subjects as Sb on StudyProg.ЕГЭ_2 =Sb.id
                            INNER JOIN Subjects as Sbj on StudyProg.ЕГЭ_3 =Sbj.id  
                            WHERE ((S.Предмет = ${ctx.wizard.state.data.exam1} and S.Баллы <= ${ctx.wizard.state.data.examScore1}) and ((Sb.Предмет = ${ctx.wizard.state.data.exam2} and Sb.Баллы <= ${ctx.wizard.state.data.examScore2}) or (Sbj.Предмет = ${ctx.wizard.state.data.exam2} and Sbj.Баллы <= ${ctx.wizard.state.data.examScore2}))) 
                                or ((S.Предмет = ${ctx.wizard.state.data.exam2} and S.Баллы <= ${ctx.wizard.state.data.examScore2}) and ((Sb.Предмет = ${ctx.wizard.state.data.exam1} and Sb.Баллы <= ${ctx.wizard.state.data.examScore1}) or (Sbj.Предмет = ${ctx.wizard.state.data.exam1} and Sbj.Баллы <= ${ctx.wizard.state.data.examScore1})))
                            ORDER BY ЕГЭ_1;`, (err, row) => {
                                ctx.reply(row.Направление)
    
                            });
        ctx.scene.leave();
    }catch (e) {
        await ctx.reply('Произошла ошибка')
        ctx.scene.leave();
    }
})

const preExamScene = new Scenes.WizardScene('preExamWizard', startStep, examStep1, examScoreStep1, examStep2, examScoreStep2)

module.exports = preExamScene
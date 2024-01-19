const{Markup} = require('telegraf');

const priemUrl = "https://www.masu.edu.ru/abit/reception/";
const timeUrl = "https://www.masu.edu.ru/abit/rules/application/"
const otherDocUrl = "https://www.masu.edu.ru/abit/admission/apply/"

const declarationKb = Markup.inlineKeyboard ([
  [
    Markup.button.url( "Бакалавриат и специалитет", "https://www.masu.edu.ru/upload/iblock/baf/5e4gwvoan7c3e46fb8lomy6s97myrwot/%D0%91%D0%BB%D0%B0%D0%BD%D0%BA%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BD%D0%B0%20%D0%B1%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D0%B8%D0%B0%D1%82%20%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%82%D0%B5%D1%82.doc")
  ],
  [
    Markup.button.url("Магистратура", "https://www.masu.edu.ru/upload/iblock/18c/gpzyizrek88rllpv2q4u9lwn1n6k4xqu/%D0%91%D0%BB%D0%B0%D0%BD%D0%BA%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%20%D0%BC%D0%B0%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D1%83%D1%80%D1%83%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9.doc")
  ],
  [
      Markup.button.url("Аспирантура", "https://www.masu.edu.ru/upload/iblock/292/nllq7ompskmr1ndcmeh1oee4760powkw/%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%20%D0%BE%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B8%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%20%D0%9C%D0%90%D0%93%D0%A3%20(%D0%B0%D1%81%D0%BF%D0%B8%D1%80%D0%B0%D0%BD%D1%82%D1%83%D1%80%D0%B0).doc")
  ],
  [
     Markup.button.url("Среднее Профессиональное Образование", "https://www.masu.edu.ru/upload/iblock/4ca/yh97z6hlfbyqf809gy50uiic4kwjb58l/zayavlenie-o-prieme-spo.pdf")
  ],
  [
    Markup.button.callback("Назад", "Back to help")
  ]
]);

const consertKb = Markup.inlineKeyboard([
  [
    Markup.button.url("Бакалавриат, специалитет, магистратура", "https://www.masu.edu.ru/upload/iblock/5d1/pto9140kxmogqh5ibmqyoivvynlas2tf/%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%20%D0%9C%D0%90%D0%93%D0%A3%20(1).doc")
  ],
  [
    Markup.button.url("Аспирантура", "https://www.masu.edu.ru/upload/iblock/292/nllq7ompskmr1ndcmeh1oee4760powkw/%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%20%D0%BE%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B8%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%20%D0%9C%D0%90%D0%93%D0%A3%20(%D0%B0%D1%81%D0%BF%D0%B8%D1%80%D0%B0%D0%BD%D1%82%D1%83%D1%80%D0%B0).doc")
  ],
  [
    Markup.button.callback("Назад", "Back to help")
  ]
]);

const formKb = Markup.inlineKeyboard([
  Markup.button.webApp("Заполнить форму", priemUrl)
]);

const helpKb = Markup.inlineKeyboard([
  [
    Markup.button.webApp("Сроки и правила подачи заявлений", timeUrl)
  ],
  [
    Markup.button.callback("Заявление на поступление", "Declaration")
  ],
  [ 
    Markup.button.callback("Согласие на зачисление", "Consert")
  ],
  [
      Markup.button.webApp("Другие документы", otherDocUrl)
  ]
]);

const examsKb = Markup.inlineKeyboard([
  [
    Markup.button.callback("Математика", "exam:'Математика'"), 
    Markup.button.callback("ИКТ", "exam:'ИКТ'")
  ],
  [
    Markup.button.callback("Физика", "exam:'Физика'"), 
    Markup.button.callback("География", "exam:'География'")
  ],
  [
    Markup.button.callback("Биология", "exam:'Биология'"), 
    Markup.button.callback("Химия", "exam:'Химия'")
  ],
  [
    Markup.button.callback("Обществознание", "exam:'Обществознание'"), 
    Markup.button.callback("Литература", "exam:'Литература'")
  ],
  [
    Markup.button.callback("История", "exam:'История'"), 
    Markup.button.callback("Иностранный язык", "exam:'Иностранный язык'")
  ],
]);

const mainKb = Markup.keyboard([
  [
    Markup.button.text("FAQ")
  ],
  [  
    Markup.button.text("Полезная информация")
  ],
  [ 
    Markup.button.text("Тест на профориентацию")
  ],
  [  
    Markup.button.text("Калькулятор ЕГЭ")
  ]
]);

module.exports.mainKb = mainKb;
module.exports.formKb = formKb;
module.exports.helpKb = helpKb;
module.exports.declarationKb = declarationKb;
module.exports.consertKb = consertKb;
module.exports.examsKb = examsKb;
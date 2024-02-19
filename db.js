// Модуль отвечает за функционал вычисления какие направления подходят по результатам ЕГЭ для "Калькулятор ЕГЭ"
const sqlite3 = require("sqlite3");
const fs = require("fs");

// Базовая проверка существует ли база данных и есть ли к ней доступ
// В случае когда нет доступа или самой БД - выбрасывает в ошибку
function checkDb() {
    fs.access("./exams.db", fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            // eslint-disable-next-line no-shadow
            const db = new sqlite3.Database("./exams.db", (err) => {
                if (err) {
                    console.log(`Error Occurred - ${err.message}`);
                    db.exec(`CREATE TABLE Subjects (
                    id int NOT NULL PRIMARY KEY,
                    Предмет varchar(12) NOT NULL UNIQUE,
                    Баллы int DEFAULT 0
                );`);
                } else {
                    console.log("DataBase Connected");
                }
                db.close();
            });
        } else {
            console.log("DataBase already exist");
        }
    });
}

// Принимает на вход 2 экзамена и их соответствующие результаты
// На выходе возвращает строки направлений для которых проходят введенные балы ЕГЭ
function fetchStudyProg(exam1, exam2, exam1Score, exam2Score) {
    const db = new sqlite3.Database("./exams.db");
    const rows = db.each(`SELECT Направление 
                        FROM StudyProg 
                        INNER JOIN Subjects as S on StudyProg.ЕГЭ_1 = S.id 
                        INNER JOIN Subjects as Sb on StudyProg.ЕГЭ_2 =Sb.id
                        INNER JOIN Subjects as Sbj on StudyProg.ЕГЭ_3 =Sbj.id  
                        WHERE ((S.Предмет = ${exam1} and S.Баллы <= ${exam1Score}) and ((Sb.Предмет = ${exam2} and Sb.Баллы <= ${exam2Score}) or (Sbj.Предмет = ${exam2} and Sbj.Баллы <= ${exam2Score}))) 
                            or ((S.Предмет = ${exam2} and S.Баллы <= ${exam2Score}) and ((Sb.Предмет = ${exam1} and Sb.Баллы <= ${exam1Score}) or (Sbj.Предмет = ${exam1} and Sbj.Баллы <= ${exam1Score})))
                        ORDER BY ЕГЭ_1;`);
    return rows;
    // cursor = db.each(`SELECT Баллы
    //                     FROM Subjects
    //                     WHERE Предмет = 'Русский язык';`)
    // let rusExamScore = NUMBER(cursor.all)
}

// Экспорт функций в другие модули 
module.exports.checkDb = checkDb;
module.exports.fetchStudyProg = fetchStudyProg;

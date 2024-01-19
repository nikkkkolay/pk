const sqlite3 = require('sqlite3');
const fs = require('fs')

function checkDb(){
    fs.access('./exams.db', fs.F_OK, (err) => {
        if (err) {
            console.error(err)
            let db = new sqlite3.Database('./exams.db' , (err) => {
            if(err)
            {
                console.log("Error Occurred - " + err.message);
                db.exec(`CREATE TABLE Subjects (
                    id int NOT NULL PRIMARY KEY,
                    Предмет varchar(12) NOT NULL UNIQUE,
                    Баллы int DEFAULT 0
                );`)
            }
            else
            {
                console.log("DataBase Connected");
            }
            db.close();
        })
        }else{
            console.log('DataBase already exist')
        }
      })
};

function fetch_study_prog(exam1, exam2, exam1_score, exam2_score){
    let db = new sqlite3.Database('./exams.db')
    let rows = db.each(`SELECT Направление 
                        FROM StudyProg 
                        INNER JOIN Subjects as S on StudyProg.ЕГЭ_1 = S.id 
                        INNER JOIN Subjects as Sb on StudyProg.ЕГЭ_2 =Sb.id
                        INNER JOIN Subjects as Sbj on StudyProg.ЕГЭ_3 =Sbj.id  
                        WHERE ((S.Предмет = ${exam1} and S.Баллы <= ${exam1_score}) and ((Sb.Предмет = ${exam2} and Sb.Баллы <= ${exam2_score}) or (Sbj.Предмет = ${exam2} and Sbj.Баллы <= ${exam2_score}))) 
                            or ((S.Предмет = ${exam2} and S.Баллы <= ${exam2_score}) and ((Sb.Предмет = ${exam1} and Sb.Баллы <= ${exam1_score}) or (Sbj.Предмет = ${exam1} and Sbj.Баллы <= ${exam1_score})))
                        ORDER BY ЕГЭ_1;`);
    return rows;
    // cursor = db.each(`SELECT Баллы
    //                     FROM Subjects
    //                     WHERE Предмет = 'Русский язык';`)
    // let rusExamScore = NUMBER(cursor.all)
}

module.exports.checkDb = checkDb
module.exports.fetch_study_prog = fetch_study_prog
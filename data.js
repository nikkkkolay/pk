// Используется как авто-заполнение. Когда пользователь печатает вопрос - берется индекс самого подходящего вопроса и выводится ответ этого же индекса
// Вопросы берутся отсюда: https://www.mauniver.ru/abit/faq/
// TODO: написать parse tool чтобы не пришлось при малейшем обновлении копировать-вставлять данные в файл
const FAQ = [
    {
        question:
            "Можно ли поступить в вуз по результатам ЕГЭ 2017 года (2018, 2019 и т.д)?",
        answer: "Согласно новому Закону «Об образовании в Российской Федерации» срок действия результатов ЕГЭ увеличен до 4 лет. То есть срок действия результатов (свидетельства) ЕГЭ, полученных в 2013 году, истекает 31 декабря 2017 года, а срок действия результатов (свидетельства), полученных в 2014, — 31 декабря 2018 года, соответственно, и так далее.",
    },
    {
        question: "Математика: профильная или базовая?",
        answer:
            "Для поступления в вуз необходима профильная математика, если этот экзамен соответствует направлению подготовки/специальности. Например, чтобы поступить на Прикладную математику и информатику необходимо сдать профильную математику."
            + "Уточнение: если на выбранное направление в ЕГЭ не требуется математика, то она учитываться не будет даже профильная, то есть сдавать можно базовую. А если в требуемых ЕГЭ математика есть, то потребуется профильная",
    },
    {
        question: "Обязательно ли сдавать ЕГЭ, если есть диплом колледжа?",
        answer: "Лица, имеющие среднее профессиональное образование сдают вступительные испытания на базе МАГУ в период с 16 по 25 июля.",
    },
    {
        question:
            "Начисляются ли дополнительные баллы за итоговое сочинение при приеме на обучение?",
        answer: "За итоговое сочинение добавляется 1 балл к сумме всех баллов по результатам ЕГЭ.",
    },
    {
        question: "Предоставляется ли общежитие первокурсникам?",
        answer: "Места предоставляются студентам очной формы обучения, как бюджетникам, так и тем, кто учится на местах с оплатой стоимости обучения, при наличии таковых.",
    },
    {
        question: "Сколько заявлений можно подать?",
        answer: "Вы можете подать одно заявление на бюджет и одно на внебюджет, в которых будут включены 5 направления подготовки.",
    },
    {
        question: "Каким образом необходимо подавать документы в 2023 году?",
        answer: "Документы на поступление принимаются онлайн через Личный кабинет абитуриента на официальном сайте Мурманского государственного университета и через Cуперсервис \"Поступление в вуз онлайн\" посредством федеральной государственной информационной системы \"Единый портал государственных и муниципальных услуг (функций)\" (далее - ЕПГУ). В случае, если заявление заполнено корректно, Вам придет сообщение, что документы приняты в обработку или перезвонит технический секретарь.",
    },
    {
        question:
            "Можно ли подать заявление о согласии на зачислении сразу же при подаче документов?",
        answer: "Технически возможно, но не совсем целесообразно. По причине того, что данное заявление является вашим волеизъявлением по факту зачисления, раньше публикации конкурсных списков делать этого не имеет смысла.        ",
    },
    {
        question:
            "Есть ли разница во времени подачи документов, т.е. будут ли большие шансы поступить, если принести документы в первый день приема к открытию приемной комиссии?",
        answer: "Нет, разницы никакой нет, так как главную роль в Вашем поступлении играют Ваши результаты ЕГЭ.",
    },
    {
        question: "Где можно узнать об аккредитации и лицензии МАГУ?",
        answer: "На официальном сайте Мурманского арктического государственного университета в разделе «Документы МАГУ».",
    },
    {
        question: "Влияют ли оценки в аттестате на поступление?",
        answer: "Не влияют, так как рейтинг основывается только на результатах ЕГЭ абитуриентов.",
    },
    {
        question:
            "Можно ли поступить на заочную форму по направлению подготовки «40.03.01 Юриспруденция» после школы или колледжа?        ",
        answer: "Нет, так как на заочную форму по направлению подготовки «40.03.01 Юриспруденция» обучение допускается при получении лицами второго или последующего высшего образования (Приказ Минобрнауки РФ № 1511 от 1 декабря 2016 года.) В МАГУ идет набор на очно-заочную форму обучения по данному направлению.        ",
    },
    {
        question: "Как узнать проходной балл?",
        answer: "Проходные баллы по всем направлениям подготовки подсчитываются только по окончанию приема. Можно ориентироваться на статистику предыдущих лет, которая представлена в разделе «Итоги приемной кампании».        ",
    },
    {
        question: "Какая медицинская справка нужна для поступления в МАГУ?",
        answer: "Медицинский документ установленного образца. Ранее, это форма справки 086у. Срок ее действия — 1 год.",
    },
    {
        question:
            " Можно ли сдавать в качестве иностранного языка какой-то язык, кроме английского?",
        answer: "Да, можно. В качестве вступительного испытания по иностранному языку вы можете сдать любой из иностранных языков на выбор: английский, немецкий, французский.        ",
    },
    {
        question:
            "Можно ли подать документы, если абитуриент не знает своих баллов ЕГЭ?",
        answer: "Отсутствие результатов ЕГЭ никак не препятствует подаче документов.",
    },
    {
        question: "Будет ли в 2021 году вторая волна зачисления?",
        answer: "В этом году зачисление по основному конкурсу будет происходить в один этап.",
    },
    {
        question: "Что значит степень бакалавра?",
        answer: "Это первая академическая ступень в трехуровневой структуре высшего образования. Степень «бакалавр» — это базовое высшее образование. Нормативный срок обучения составляет 4 года для очной и 4 года 8 месяцев заочной формы обучения. Диплом бакалавра дает право на работу по направлению и (или) поступление в магистратуру. Квалификацию «бакалавр» признают не только российские работодатели. Эта степень включена в международную классификацию, она понятна за рубежом. Зачастую иностранные фирмы приглашают бакалавров, даже не оговаривая направления их подготовки.        ",
    },
    {
        question:
            "Что делать, если документ об образовании на иностранном языке?",
        answer: "Для подачи документов в МАГУ, Вам следует перевести Ваш документ об образовании на русский язык и нотариально заверить. В некоторых случаях необходимо сделать нострификацию документа об образовании, это необходимо уточнить в Приемной комиссии.        ",
    },
    {
        question:
            "Можно ли поступить на бюджет, если уже получил первое высшее образование на платной основе?",
        answer: "Гражданам Российской Федерации гарантируется получение на конкурсной основе бесплатного среднего профессионального, высшего профессионального и послевузовского профессионального образования в государственных и муниципальных образовательных организациях, если образование данного уровня гражданин получает впервые.    Второе высшее образование такого же уровня возможно только на платной основе.    ",
    },
    {
        question:
            "Когда нужно предоставить оригинал документа об образовании, если поступаешь по целевому направлению или в переделах квоты?",
        answer: "Оригинал аттестата необходимо предоставить вместе с заявлением о согласии на зачисление до 4 августа 2021 года.",
    },
    {
        question:
            "Можно ли изменить что-то в своем заявлении после подачи документов?",
        answer: "Любые изменения можно внести до 29 июля.",
    },
    {
        question:
            "Можно ли поступать в магистратуру по специальности, не связанной со специальностью бакалавра?",
        answer: "Да, можно. Направление, по которому проходило обучение в бакалавриате, не влияет на право учиться по любому другому направлению в магистратуре. Для участия в конкурсе необходимо успешно пройти внутренние испытания профильной направленности по выбранному направлению.        ",
    },
    {
        question:
            "Можно ли поступить в магистратуру на бюджетные места, имея диплом специалиста?",
        answer: "Лица, поступающие с дипломом «дипломированного специалиста», могут претендовать на бюджетные места. Лица, получившие диплом «специалиста по специальности», могут поступать только на места с оплатой стоимости обучения. ",
    },
];

module.exports.FAQ = FAQ;

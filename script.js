"use strict";

/*
=========================================================
RAai AI ACADEMY
FULL FRONTEND
=========================================================

Features:
- Large academy dashboard
- 12 courses
- 36+ lessons
- 45 minute lesson engine
- Female / male teacher
- Russian speech synthesis
- Russian voice commands
- Camera
- MediaPipe Face Mesh attention tracking
- 3 second attention warning
- Fast attention voice warning
- Break / resume commands
- Progress / XP
- LocalStorage
=========================================================
*/


/* =====================================================
   STORAGE
===================================================== */

const USER_KEY = "RAAI_ACADEMY_USER_V4";
const PROGRESS_KEY = "RAAI_ACADEMY_PROGRESS_V4";

const DEFAULT_PROGRESS = {
    completedLessons: [],
    xp: 0
};

let savedUser = null;

let progress = {
    ...DEFAULT_PROGRESS
};

try {

    savedUser = JSON.parse(
        localStorage.getItem(USER_KEY) || "null"
    );

    const storedProgress = JSON.parse(
        localStorage.getItem(PROGRESS_KEY) || "null"
    );

    if (storedProgress) {

        progress = {
            ...DEFAULT_PROGRESS,
            ...storedProgress
        };

    }

} catch (error) {

    console.warn(
        "LocalStorage read error:",
        error
    );

}


/* =====================================================
   COURSE DATA
===================================================== */

const courses = [

    {
        id: "python",
        category: "programming",
        icon: "🐍",
        color: "#5b7cff",
        title: "Python с нуля",
        description:
            "Полный путь от первых строк кода до небольшого проекта.",
        level: "Начальный",

        lessons: [
            "Что такое Python и как думает программист",
            "Переменные, типы данных и ввод информации",
            "Условия, циклы и логика программы"
        ]
    },

    {
        id: "javascript",
        category: "programming",
        icon: "JS",
        color: "#f4d03f",
        title: "JavaScript",
        description:
            "Основы современного JavaScript для создания интерактивных сайтов.",
        level: "Начальный",

        lessons: [
            "JavaScript и первые команды",
            "Переменные, функции и условия",
            "DOM и интерактивная страница"
        ]
    },

    {
        id: "htmlcss",
        category: "web",
        icon: "🌐",
        color: "#ff7043",
        title: "HTML & CSS",
        description:
            "Научитесь создавать красивые современные веб-страницы.",
        level: "Начальный",

        lessons: [
            "HTML: структура сайта",
            "CSS: цвета, размеры и блоки",
            "Адаптивный современный дизайн"
        ]
    },

    {
        id: "frontend",
        category: "web",
        icon: "💻",
        color: "#20d9ff",
        title: "Frontend-разработка",
        description:
            "Создание полноценного интерфейса сайта от идеи до результата.",
        level: "Средний",

        lessons: [
            "Как устроен современный frontend",
            "Компоненты и пользовательский интерфейс",
            "Создание полноценной страницы"
        ]
    },

    {
        id: "backend",
        category: "programming",
        icon: "⚙️",
        color: "#9b5cff",
        title: "Backend-разработка",
        description:
            "Серверная часть приложений, API и работа с данными.",
        level: "Средний",

        lessons: [
            "Что такое backend",
            "API и серверная логика",
            "Создание простого API"
        ]
    },

    {
        id: "git",
        category: "programming",
        icon: "🔀",
        color: "#ff7058",
        title: "Git & GitHub",
        description:
            "Версионирование проектов и профессиональная работа с GitHub.",
        level: "Начальный",

        lessons: [
            "Git: зачем он нужен",
            "Commit, branch и merge",
            "GitHub и публикация проекта"
        ]
    },

    {
        id: "sql",
        category: "data",
        icon: "🗄️",
        color: "#34d399",
        title: "SQL и базы данных",
        description:
            "Таблицы, запросы, связи и основы работы с базами данных.",
        level: "Средний",

        lessons: [
            "Как работают базы данных",
            "SELECT, INSERT, UPDATE, DELETE",
            "Связи между таблицами"
        ]
    },

    {
        id: "ai",
        category: "data",
        icon: "🤖",
        color: "#a855f7",
        title: "AI и нейросети",
        description:
            "Основы искусственного интеллекта, моделей и промптов.",
        level: "Начальный",

        lessons: [
            "Что такое искусственный интеллект",
            "Как работают нейросети",
            "Как правильно работать с AI"
        ]
    },

    {
        id: "cyber",
        category: "programming",
        icon: "🛡️",
        color: "#22c55e",
        title: "Кибербезопасность",
        description:
            "Базовые принципы защиты аккаунтов, данных и приложений.",
        level: "Начальный",

        lessons: [
            "Основы цифровой безопасности",
            "Пароли, фишинг и защита аккаунтов",
            "Безопасность веб-приложений"
        ]
    },

    {
        id: "uiux",
        category: "design",
        icon: "🎨",
        color: "#ec4899",
        title: "UI/UX дизайн",
        description:
            "Создавайте понятные, красивые и удобные интерфейсы.",
        level: "Начальный",

        lessons: [
            "Основы UX-мышления",
            "UI: цвет, типографика и композиция",
            "Проектирование интерфейса"
        ]
    },

    {
        id: "react",
        category: "web",
        icon: "⚛️",
        color: "#61dafb",
        title: "React",
        description:
            "Компонентный подход и создание современных веб-приложений.",
        level: "Средний",

        lessons: [
            "React и компоненты",
            "State и события",
            "Создание React-приложения"
        ]
    },

    {
        id: "node",
        category: "programming",
        icon: "🟢",
        color: "#68a063",
        title: "Node.js",
        description:
            "JavaScript на сервере, модули, API и backend-приложения.",
        level: "Средний",

        lessons: [
            "Node.js и серверный JavaScript",
            "Модули и npm",
            "Создание API на Node.js"
        ]
    }

];


/* =====================================================
   PYTHON FULL 45-MINUTE CONTENT
===================================================== */

const pythonBlocks = [

    {
        title: "Добро пожаловать в Python",
        subtitle: "Начинаем с самого главного",

        explain:
            "Добро пожаловать на урок Python. Сегодня мы пройдём большой путь от самого понятия программирования до создания собственного небольшого проекта. Не переживайте, если вы раньше никогда не программировали. Я буду объяснять всё простыми словами. Python — это язык программирования, который позволяет давать компьютеру понятные инструкции. Сегодня наша задача — понять логику программирования, а не просто запомнить команды.",

        practice:
            "Подумайте: где вы встречаетесь с программами каждый день? Например, в телефоне, браузере, играх, банках и социальных сетях. Все эти программы состоят из инструкций, которые компьютер выполняет последовательно.",

        answer:
            "Отлично. Главное сейчас понять идею: программа — это набор инструкций. Python позволяет записывать эти инструкции в удобной для человека форме.",

        example:
            "Например, команда print может вывести текст на экран. Представьте, что вы говорите компьютеру: покажи пользователю сообщение. Это уже ваша первая программная инструкция."
    },

    {
        title: "print и input",
        subtitle: "Общение программы с человеком",

        explain:
            "Теперь познакомимся с двумя важными идеями. Первая — вывод информации, то есть команда print. Вторая — получение информации от пользователя через input. Программа может не только что-то показывать, но и спрашивать пользователя. Например, программа может спросить имя, получить ответ и затем поприветствовать человека.",

        practice:
            "Представьте программу регистрации. Она спрашивает: как вас зовут? Пользователь вводит имя. Затем программа должна сказать: привет и имя пользователя.",

        answer:
            "Именно так строится взаимодействие программы с человеком. Input получает информацию, а print показывает результат.",

        example:
            "Пример логики: сначала программа получает имя пользователя, затем формирует приветствие и выводит его на экран."
    },

    {
        title: "Переменные",
        subtitle: "Как программа хранит информацию",

        explain:
            "Переменная — это имя, под которым программа хранит какое-то значение. Представьте коробку с названием. В одной коробке лежит имя, в другой возраст, в третьей сумма денег. В Python переменную можно создать очень просто. Например, name может хранить имя человека. Затем мы можем использовать это имя много раз.",

        practice:
            "Подумайте о трёх переменных для профиля пользователя. Нам понадобится имя, возраст и город.",

        answer:
            "Отлично. Например, name хранит имя, age хранит возраст, а city хранит город. Переменные позволяют не писать одно и то же значение вручную каждый раз.",

        example:
            "Представьте: name равно Abdulaziz. После этого программа может использовать name в приветствии, профиле и других частях приложения."
    },

    {
        title: "Типы данных",
        subtitle: "Числа, текст и логические значения",

        explain:
            "Данные бывают разных типов. Текст называется строкой. Целые числа — это integer. Десятичные числа — float. Также есть логический тип boolean, который имеет два значения: True и False. Понимание типов данных очень важно, потому что компьютер должен понимать, что именно хранится в переменной.",

        practice:
            "Определите, какого типа должны быть следующие данные: имя человека, возраст, цена товара и ответ на вопрос да или нет.",

        answer:
            "Имя — строка. Возраст — целое число. Цена может быть десятичным числом. Ответ да или нет — boolean.",

        example:
            "Например, имя можно представить как текст, возраст как число, а наличие товара как True или False."
    },

    {
        title: "Математика в Python",
        subtitle: "Операторы и вычисления",

        explain:
            "Python отлично работает с математикой. Мы можем складывать, вычитать, умножать и делить числа. Также есть операции получения остатка от деления и возведения в степень. Эти операции используются в калькуляторах, играх, финансовых программах и огромном количестве других приложений.",

        practice:
            "Представьте интернет-магазин. Товар стоит 100 единиц, а пользователь покупает три товара. Как программа должна посчитать общую стоимость?",

        answer:
            "Нужно умножить цену одного товара на количество. Python выполнит это вычисление мгновенно.",

        example:
            "Если цена равна 100, а количество равно 3, итог будет 300. Такие простые операции являются строительными блоками больших программ."
    },

    {
        title: "Строки",
        subtitle: "Работа с текстом",

        explain:
            "Строки используются практически везде. Имена, сообщения, адреса, логины, описания товаров — всё это текст. В Python строки можно объединять, получать их длину, искать внутри них символы и изменять регистр.",

        practice:
            "Представьте форму регистрации. Пользователь вводит имя маленькими буквами. Программа должна показать его красиво, например с заглавной буквы.",

        answer:
            "Это можно сделать с помощью методов строк. Python предоставляет много готовых инструментов для работы с текстом.",

        example:
            "Строки можно объединять. Например, имя и фамилию можно соединить в одно полное имя."
    },

    {
        title: "Условия if",
        subtitle: "Программа принимает решения",

        explain:
            "Теперь начинается настоящая логика. Условие if позволяет программе принимать решения. Если условие истинно, выполняется один блок кода. Если нет — можно выполнить другой блок через else. Это основа авторизации, игр, проверок и практически любой интерактивной программы.",

        practice:
            "Представьте вход в систему. Если пароль правильный, пользователь должен получить доступ. Если неправильный — программа должна показать ошибку.",

        answer:
            "Именно здесь используется условие. Программа сравнивает данные и выбирает нужный путь.",

        example:
            "Логика очень простая: если пароль совпадает — вход разрешён, иначе показываем сообщение об ошибке."
    },

    {
        title: "Циклы for",
        subtitle: "Повторяем действия",

        explain:
            "Циклы позволяют повторять действие много раз без копирования одного и того же кода. Цикл for особенно удобен, когда мы хотим пройти по списку элементов. Например, вывести имена всех студентов курса.",

        practice:
            "Представьте список из пяти учеников. Вместо пяти одинаковых команд мы можем использовать один цикл.",

        answer:
            "Цикл берёт каждый элемент списка по очереди и выполняет для него одну и ту же инструкцию.",

        example:
            "Это особенно полезно для списков товаров, пользователей, сообщений, результатов и других коллекций."
    },

    {
        title: "Циклы while",
        subtitle: "Повторение до выполнения условия",

        explain:
            "Цикл while работает немного иначе. Он продолжает выполняться, пока определённое условие остаётся истинным. Это удобно, когда мы заранее не знаем точное количество повторений.",

        practice:
            "Представьте игру, которая продолжается, пока у игрока есть здоровье. Пока здоровье больше нуля, игра продолжается.",

        answer:
            "Это хороший пример для while. Условие проверяется снова и снова.",

        example:
            "В больших программах while используется для циклов игры, ожидания события или повторного ввода данных."
    },

    {
        title: "Списки",
        subtitle: "Храним много значений",

        explain:
            "Список позволяет хранить несколько значений внутри одной структуры. Например, список курсов, товаров или пользователей. Это одна из самых важных структур данных для начинающего Python-разработчика.",

        practice:
            "Представьте список из трёх курсов. Нам нужно сохранить их вместе, чтобы потом пройти по ним циклом.",

        answer:
            "Для этого отлично подходит список. Мы можем добавлять элементы, удалять их и получать конкретные позиции.",

        example:
            "Списки позволяют программе работать не с одним значением, а с целой коллекцией."
    },

    {
        title: "Словари",
        subtitle: "Данные в формате ключ и значение",

        explain:
            "Словарь хранит пары ключ-значение. Это очень удобно для объектов. Например, профиль пользователя может содержать имя, возраст и город. Каждый параметр имеет своё название.",

        practice:
            "Представьте профиль ученика. Какие данные мы могли бы туда положить?",

        answer:
            "Имя, возраст, уровень, количество XP, выбранный курс и другие параметры.",

        example:
            "Словарь похож на анкету: слева название поля, справа значение этого поля."
    },

    {
        title: "Функции",
        subtitle: "Создаём собственные команды",

        explain:
            "Функция — это блок кода, который мы можем запускать много раз. Вместо того чтобы повторять одинаковые инструкции, мы создаём собственную команду. Это делает программы аккуратнее и удобнее.",

        practice:
            "Представьте функцию приветствия. Она должна принимать имя пользователя и возвращать приветствие.",

        answer:
            "После создания функции мы можем вызвать её для разных пользователей.",

        example:
            "Функции лежат в основе хорошо организованных программ. Большие проекты состоят из множества небольших функций."
    },

    {
        title: "Ошибки и debugging",
        subtitle: "Учимся находить проблемы",

        explain:
            "Ошибки в программировании — это нормально. Даже профессиональные разработчики постоянно исправляют ошибки. Важно не бояться ошибок, а научиться читать сообщение программы и находить место, где возникла проблема.",

        practice:
            "Если программа внезапно остановилась, первым делом нужно прочитать сообщение об ошибке, проверить строку и понять, что ожидала программа.",

        answer:
            "Debugging — это процесс поиска и исправления ошибок. Спокойный анализ ошибки часто решает проблему быстрее, чем попытки менять всё подряд.",

        example:
            "Хорошая привычка — проверять код маленькими частями и постепенно находить место проблемы."
    },

    {
        title: "Файлы и данные",
        subtitle: "Сохраняем информацию",

        explain:
            "Программа может работать не только с памятью компьютера, но и с файлами. Это позволяет сохранять информацию между запусками программы. Например, можно сохранить настройки пользователя, список задач или результаты.",

        practice:
            "Представьте приложение заметок. Если закрыть приложение, заметки должны остаться. Значит, данные нужно сохранить.",

        answer:
            "Для этого используются файлы или базы данных. Python предоставляет удобные инструменты для работы с файлами.",

        example:
            "Простой текстовый файл может хранить небольшую информацию, а база данных подходит для больших приложений."
    },

    {
        title: "Мини-проект",
        subtitle: "Собираем знания вместе",

        explain:
            "Теперь объединим знания. Представим маленькое приложение ученика. Оно может спросить имя, сохранить его, проверить возраст, показать приветствие и вывести информацию о выбранном курсе. Здесь мы используем переменные, условия, строки, функции и другие изученные элементы.",

        practice:
            "Представьте структуру такого приложения: сначала приветствие, затем данные пользователя, затем проверка и итоговый результат.",

        answer:
            "Именно так строятся реальные проекты: большая задача разбивается на маленькие части, а затем эти части соединяются.",

        example:
            "Мини-проект можно постепенно расширять: добавить меню, несколько курсов, сохранение данных и статистику."
    },

    {
        title: "Повторение и финальный вызов",
        subtitle: "Проверяем, что вы запомнили",

        explain:
            "Мы прошли большой путь. Вы познакомились с Python, выводом и вводом данных, переменными, типами, математикой, строками, условиями, циклами, списками, словарями, функциями, ошибками и файлами. Главное — не пытайтесь запомнить всё сразу. Практика закрепляет знания.",

        practice:
            "Финальное задание: представьте небольшую программу профиля пользователя. Какие переменные, условия и функции вам понадобятся?",

        answer:
            "Отличный ответ: имя и другие данные можно хранить в переменных или словаре, условия использовать для проверок, а функции — для повторяющихся действий.",

        example:
            "Следующий шаг — самостоятельно написать маленький проект. Именно практика превращает просмотр урока в настоящее знание."
    }

];


/* =====================================================
   GENERIC LESSON BUILDER
===================================================== */

function createGenericBlocks(
    course,
    lessonTitle
) {

    const concepts = [

        `Что такое ${lessonTitle}`,
        `Основные понятия: ${lessonTitle}`,
        `Практика с ${lessonTitle}`,
        `Типичные ошибки`,
        `Реальный пример`,
        `Создание небольшой задачи`,
        `Разбор решения`,
        `Как улучшить результат`,
        `Полезные приёмы`,
        `Работа над мини-задачей`,
        `Повторение основных идей`,
        `Вопросы и проверка`,
        `Практический сценарий`,
        `Мини-проект`,
        `Финальное повторение`

    ];

    return concepts.map(
        (title, index) => {

            const previous =
                index === 0
                    ? "Начнём с самого главного."
                    : `Мы уже прошли предыдущие этапы курса ${course.title}. Теперь двигаемся дальше.`;

            return {

                title,

                subtitle:
                    `Блок ${index + 1} из 15`,

                explain:
                    `Сейчас мы изучаем тему «${title}» в рамках курса «${course.title}». ${previous} Я буду объяснять материал постепенно и простыми словами. Ваша задача — не просто слушать, а понимать логику. Если что-то непонятно, вы можете в любой момент сказать «Объясни ещё раз». Мы не будем торопиться: полноценный урок рассчитан на 45 минут.`,

                practice:
                    `Практическая часть. Представьте реальную ситуацию, в которой используется ${lessonTitle}. Подумайте, какие действия нужно выполнить по порядку и какие данные могут понадобиться.`,

                answer:
                    `Хорошо. Главное здесь — разделить большую задачу на небольшие шаги. Именно такой подход используют разработчики в реальных проектах.`,

                example:
                    `Пример из практики: разработчик сначала определяет цель, затем данные, затем логику, а после этого проверяет результат. Такой подход поможет вам уверенно работать с темой «${lessonTitle}».`

            };

        }
    );

}


/* =====================================================
   STATE
===================================================== */

const state = {

    currentPage: "home",

    selectedTeacher:
        savedUser?.teacher || "female",

    currentCourse: null,

    currentLesson: null,

    lessonBlocks: [],

    lessonBlockIndex: 0,

    lessonRunning: false,

    lessonPaused: false,

    remainingSeconds: 45 * 60,

    lessonInterval: null,

    blockTimeout: null,

    blockStageTimeout: null,

    speechQueue: [],

    speaking: false,

    recognition: null,

    recognitionStarted: false,

    cameraStream: null,

    faceMesh: null,

    faceCamera: null,

    attentionStarted: false,

    lookingAwaySince: null,

    attentionWarningAt: 0,

    attentionWarningSpeaking: false,

    breakActive: false,

    voices: [],

    voiceReady: false

};


/* =====================================================
   DOM
===================================================== */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    Array.from(
        document.querySelectorAll(selector)
    );

const welcomeModal =
    $("#welcomeModal");

const startForm =
    $("#startForm");

const nicknameInput =
    $("#nicknameInput");

const app =
    $("#app");

const lessonScreen =
    $("#lessonScreen");


/* =====================================================
   USER
===================================================== */

function saveUser() {

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(savedUser)
    );

}


function initials(name) {

    const clean =
        String(name || "Ученик")
            .trim();

    if (!clean) {
        return "У";
    }

    return clean
        .split(/\s+/)
        .slice(0, 2)
        .map(
            part =>
                part[0].toUpperCase()
        )
        .join("");

}


function applyUserUI() {

    if (!savedUser) {
        return;
    }

    const name =
        savedUser.name ||
        "Ученик";

    const initial =
        initials(name);

    $("#sideUserName").textContent =
        name;

    $("#topUserName").textContent =
        name;

    $("#studentNameLesson").textContent =
        name;

    $("#sideAvatar").textContent =
        initial;

    $("#topAvatar").textContent =
        initial;

}


function openAcademy() {

    welcomeModal.classList.add(
        "hidden"
    );

    app.classList.remove(
        "hidden"
    );

    applyUserUI();

    renderAll();

    loadVoices();

    initSpeechRecognition();

}


function showWelcome() {

    app.classList.add(
        "hidden"
    );

    welcomeModal.classList.remove(
        "hidden"
    );

    nicknameInput.value =
        savedUser?.name || "";

    selectTeacher(
        savedUser?.teacher || "female"
    );

}


/* =====================================================
   TEACHER SELECTION
===================================================== */

function selectTeacher(type) {

    state.selectedTeacher =
        type;

    $$(".teacher-choice")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.teacher === type
                );

            }
        );

}


$$(".teacher-choice")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    selectTeacher(
                        button.dataset.teacher
                    );

                    previewVoice(
                        button.dataset.teacher
                    );

                }
            );

        }
    );


/* =====================================================
   START FORM
===================================================== */

startForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            nicknameInput.value
                .trim();

        if (!name) {

            nicknameInput.focus();

            nicknameInput.animate(
                [
                    {
                        transform:
                            "translateX(0)"
                    },
                    {
                        transform:
                            "translateX(-6px)"
                    },
                    {
                        transform:
                            "translateX(6px)"
                    },
                    {
                        transform:
                            "translateX(0)"
                    }
                ],
                {
                    duration: 260
                }
            );

            return;

        }

        savedUser = {

            name,

            teacher:
                state.selectedTeacher

        };

        saveUser();

        openAcademy();

    }
);


/* =====================================================
   NAVIGATION
===================================================== */

$$(".nav-item")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    switchPage(
                        button.dataset.page
                    );

                }
            );

        }
    );


function switchPage(page) {

    state.currentPage =
        page;

    $$(".page")
        .forEach(
            item => {

                item.classList.remove(
                    "active-page"
                );

            }
        );

    const target =
        $(`#page-${page}`);

    if (target) {

        target.classList.add(
            "active-page"
        );

    }

    $$(".nav-item")
        .forEach(
            item => {

                item.classList.toggle(
                    "active",
                    item.dataset.page === page
                );

            }
        );

    const names = {

        home: "Главная",
        courses: "Курсы",
        progress: "Мой прогресс",
        teachers: "Преподаватели"

    };

    $("#breadcrumbText").textContent =
        names[page] || "Главная";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   COURSE CARDS
===================================================== */

function courseProgress(courseId) {

    const course =
        courses.find(
            c =>
                c.id === courseId
        );

    if (!course) {
        return 0;
    }

    const completed =
        progress.completedLessons
            .filter(
                id =>
                    id.startsWith(
                        courseId + "::"
                    )
            )
            .length;

    return Math.round(
        (
            completed /
            course.lessons.length
        ) * 100
    );

}


function renderCourseCard(course) {

    const percent =
        courseProgress(
            course.id
        );

    return `

        <article
            class="course-card"
            data-category="${course.category}"
            style="--course-bg:${course.color}18;"
        >

            <div class="course-top">

                <div
                    class="course-icon"
                    style="color:${course.color};"
                >
                    ${course.icon}
                </div>

                <span class="course-level">
                    ${course.level}
                </span>

            </div>

            <h3>
                ${course.title}
            </h3>

            <p>
                ${course.description}
            </p>

            <div class="course-meta">

                <span>
                    📚 ${course.lessons.length} урока
                </span>

                <span>
                    ⏱ 45 мин
                </span>

            </div>

            <div class="course-bottom">

                <div class="course-progress-mini">

                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="width:${percent}%"
                        ></div>

                    </div>

                    <span>
                        ${percent}% завершено
                    </span>

                </div>

                <button
                    class="course-open"
                    data-course="${course.id}"
                >
                    Открыть →
                </button>

            </div>

        </article>

    `;

}


function renderHomeCourses() {

    $("#homeCourses").innerHTML =
        courses
            .slice(0, 6)
            .map(
                renderCourseCard
            )
            .join("");

    attachCourseButtons(
        "#homeCourses"
    );

}


function renderAllCourses() {

    $("#allCourses").innerHTML =
        courses
            .map(
                renderCourseCard
            )
            .join("");

    attachCourseButtons(
        "#allCourses"
    );

}


function attachCourseButtons(
    containerSelector
) {

    $$(
        `${containerSelector} .course-open`
    )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openCourse(
                            button.dataset.course
                        );

                    }
                );

            }
        );

}


/* =====================================================
   OPEN COURSE
===================================================== */

function openCourse(courseId) {

    const course =
        courses.find(
            item =>
                item.id === courseId
        );

    if (!course) {
        return;
    }

    switchPage(
        "courses"
    );

    const old =
        document.querySelector(
            ".course-detail-panel"
        );

    if (old) {
        old.remove();
    }

    const panel =
        document.createElement(
            "div"
        );

    panel.className =
        "course-detail-panel";

    panel.style.cssText = `
        margin-top:25px;
        padding:25px;
        border:1px solid rgba(255,255,255,.08);
        border-radius:22px;
        background:rgba(255,255,255,.025);
    `;

    panel.innerHTML = `

        <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:20px;
            margin-bottom:20px;
        ">

            <div>

                <span class="section-kicker">
                    ${course.icon} КУРС
                </span>

                <h2 style="margin-top:8px;">
                    ${course.title}
                </h2>

                <p style="
                    color:#737d91;
                    margin-top:7px;
                    font-size:11px;
                ">
                    ${course.description}
                </p>

            </div>

        </div>

        <div style="
            display:grid;
            gap:10px;
        ">

            ${course.lessons.map(
                (lesson, index) => {

                    const lessonId =
                        `${course.id}::${index}`;

                    const done =
                        progress.completedLessons
                            .includes(
                                lessonId
                            );

                    return `

                        <button
                            class="lesson-select-button"
                            data-course="${course.id}"
                            data-lesson="${index}"
                            style="
                                display:flex;
                                align-items:center;
                                gap:15px;
                                width:100%;
                                padding:16px;
                                border:1px solid rgba(255,255,255,.07);
                                border-radius:15px;
                                color:white;
                                background:rgba(255,255,255,.025);
                                text-align:left;
                            "
                        >

                            <span style="
                                width:36px;
                                height:36px;
                                display:grid;
                                place-items:center;
                                border-radius:10px;
                                background:
                                    ${
                                        done
                                            ? "rgba(67,231,167,.12)"
                                            : "rgba(91,124,255,.10)"
                                    };
                                color:
                                    ${
                                        done
                                            ? "#43e7a7"
                                            : "#5b7cff"
                                    };
                                font-weight:900;
                            ">
                                ${
                                    done
                                        ? "✓"
                                        : index + 1
                                }
                            </span>

                            <span style="
                                flex:1;
                            ">

                                <strong style="
                                    display:block;
                                    font-size:11px;
                                ">
                                    ${lesson}
                                </strong>

                                <small style="
                                    display:block;
                                    margin-top:4px;
                                    color:#687287;
                                    font-size:8px;
                                ">
                                    Полный урок · 45 минут · AI-преподаватель
                                </small>

                            </span>

                            <span style="
                                color:#20d9ff;
                                font-size:9px;
                            ">
                                ${
                                    done
                                        ? "Пройден"
                                        : "Начать →"
                                }
                            </span>

                        </button>

                    `;

                }
            ).join("")}

        </div>
    `;

    $("#allCourses")
        .after(panel);

    panel
        .querySelectorAll(
            ".lesson-select-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        startLesson(
                            button.dataset.course,
                            Number(
                                button.dataset.lesson
                            )
                        );

                    }
                );

            }
        );

    panel.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =====================================================
   FILTER
===================================================== */

$$(".category-tab")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    $$(".category-tab")
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );

                    button.classList.add(
                        "active"
                    );

                    const filter =
                        button.dataset.filter;

                    $$("#allCourses .course-card")
                        .forEach(
                            card => {

                                const show =
                                    filter === "all" ||
                                    card.dataset.category === filter;

                                card.style.display =
                                    show
                                        ? ""
                                        : "none";

                            }
                        );

                }
            );

        }
    );


/* =====================================================
   PROGRESS
===================================================== */

function totalLessons() {

    return courses.reduce(
        (sum, course) =>
            sum +
            course.lessons.length,
        0
    );

}


function overallPercent() {

    return Math.round(
        (
            progress.completedLessons.length /
            totalLessons()
        ) * 100
    );

}


function updateProgressUI() {

    const percent =
        overallPercent();

    $("#sideProgressText")
        .textContent =
        `${percent}%`;

    $("#sideProgressBar")
        .style.width =
        `${percent}%`;

    $("#homeCompleted")
        .textContent =
        progress.completedLessons.length;

    const level =
        Math.max(
            1,
            Math.floor(
                progress.xp / 100
            ) + 1
        );

    $("#homeLevel")
        .textContent =
        level;

    $("#progressLevel")
        .textContent =
        level;

    $("#bigProgressPercent")
        .textContent =
        `${percent}%`;

    $("#xpBar")
        .style.width =
        `${progress.xp % 100}%`;

    $("#xpText")
        .textContent =
        `${progress.xp % 100} / 100 XP`;

    const pythonPercent =
        courseProgress(
            "python"
        );

    $("#pythonProgress")
        .style.width =
        `${pythonPercent}%`;

    $("#pythonProgressText")
        .textContent =
        `${pythonPercent}% завершено`;

}


function renderProgress() {

    const list =
        $("#progressCourses");

    list.innerHTML =
        courses.map(
            course => {

                const percent =
                    courseProgress(
                        course.id
                    );

                return `

                    <div class="progress-row">

                        <div class="progress-row-icon">
                            ${course.icon}
                        </div>

                        <div class="progress-row-info">

                            <strong>
                                ${course.title}
                            </strong>

                            <span>
                                ${course.lessons.length} урока ·
                                ${percent}% завершено
                            </span>

                        </div>

                        <div class="progress-row-bar">

                            <div class="progress-track">

                                <div
                                    class="progress-fill"
                                    style="width:${percent}%"
                                ></div>

                            </div>

                        </div>

                        <div class="progress-row-percent">
                            ${percent}%
                        </div>

                    </div>

                `;

            }
        ).join("");

}


function saveProgress() {

    localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(progress)
    );

    updateProgressUI();

    renderProgress();

}


/* =====================================================
   RENDER
===================================================== */

function renderAll() {

    renderHomeCourses();

    renderAllCourses();

    renderProgress();

    updateProgressUI();

}


/* =====================================================
   BUTTONS
===================================================== */

$("#continueButton")
    .addEventListener(
        "click",
        () => {

            startLesson(
                "python",
                0
            );

        }
    );


$("#exploreButton")
    .addEventListener(
        "click",
        () =>
            switchPage(
                "courses"
            )
    );


$("#allCoursesButton")
    .addEventListener(
        "click",
        () =>
            switchPage(
                "courses"
            )
    );


$("#popularCoursesButton")
    .addEventListener(
        "click",
        () =>
            switchPage(
                "courses"
            )
    );


$(".continue-start")
    .addEventListener(
        "click",
        () => {

            startLesson(
                "python",
                0
            );

        }
    );


$("#changeUserButton")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Сменить имя пользователя?"
                )
            ) {

                localStorage.removeItem(
                    USER_KEY
                );

                savedUser = null;

                stopLessonCompletely();

                showWelcome();

            }

        }
    );


$("#mobileMenuButton")
    .addEventListener(
        "click",
        () => {

            $(".sidebar")
                .classList.toggle(
                    "open"
                );

        }
    );


$$(".choose-teacher")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.teacher;

                    state.selectedTeacher =
                        type;

                    if (savedUser) {

                        savedUser.teacher =
                            type;

                        saveUser();

                    }

                    selectTeacher(
                        type
                    );

                    previewVoice(
                        type
                    );

                    speak(
                        type === "female"
                            ? "Хорошо. Теперь вашим преподавателем буду я."
                            : "Отлично. Я буду вашим преподавателем."
                    );

                }
            );

        }
    );


/* =====================================================
   SPEECH SYNTHESIS
===================================================== */

function loadVoices() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }

    const update =
        () => {

            state.voices =
                speechSynthesis.getVoices();

            state.voiceReady =
                state.voices.length > 0;

        };

    update();

    speechSynthesis.onvoiceschanged =
        update;

}

loadVoices();


function getRussianVoice(type) {

    const voices =
        state.voices.length
            ? state.voices
            : speechSynthesis.getVoices();

    const russian =
        voices.filter(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith("ru")
        );

    if (!russian.length) {

        return (
            voices[0] ||
            null
        );

    }

    const names =
        russian.map(
            voice =>
                voice.name.toLowerCase()
        );

    const femaleWords = [

        "milena",
        "alena",
        "anna",
        "irina",
        "elena",
        "yelena",
        "female",
        "жен",
        "google русский"

    ];

    const maleWords = [

        "yuri",
        "mikhail",
        "maxim",
        "dmitry",
        "male",
        "муж"

    ];

    const words =
        type === "female"
            ? femaleWords
            : maleWords;

    for (
        let i = 0;
        i < russian.length;
        i++
    ) {

        if (
            words.some(
                word =>
                    names[i].includes(
                        word
                    )
            )
        ) {

            return russian[i];

        }

    }

    return russian[0];

}


/* =====================================================
   NORMAL SPEECH
===================================================== */

function speak(
    text,
    options = {}
) {

    return new Promise(
        resolve => {

            if (
                !("speechSynthesis" in window) ||
                !text
            ) {

                resolve();

                return;

            }

            speechSynthesis.cancel();

            const utterance =
                new SpeechSynthesisUtterance(
                    text
                );

            utterance.lang =
                "ru-RU";

            const type =
                options.teacher ||
                state.selectedTeacher;

            const voice =
                getRussianVoice(
                    type
                );

            if (voice) {

                utterance.voice =
                    voice;

            }

            utterance.rate =
                options.rate ||
                (
                    type === "female"
                        ? .93
                        : .91
                );

            utterance.pitch =
                options.pitch ||
                (
                    type === "female"
                        ? 1.04
                        : .88
                );

            utterance.volume =
                1;

            state.speaking =
                true;

            $("#speakingIndicator")
                ?.classList.add(
                    "active"
                );

            $("#teacherSpeechStatus")
                .textContent =
                "Преподаватель говорит...";

            utterance.onend =
                () => {

                    state.speaking =
                        false;

                    $("#speakingIndicator")
                        ?.classList.remove(
                            "active"
                        );

                    $("#teacherSpeechStatus")
                        .textContent =
                        "Слушаю вас...";

                    resolve();

                };

            utterance.onerror =
                () => {

                    state.speaking =
                        false;

                    $("#speakingIndicator")
                        ?.classList.remove(
                            "active"
                        );

                    resolve();

                };

            speechSynthesis.speak(
                utterance
            );

            /*
              Chrome иногда оставляет speech synthesis
              в suspended состоянии. Resume() помогает
              начать воспроизведение быстрее.
            */

            try {

                speechSynthesis.resume();

            } catch {}

        }
    );

}


/* =====================================================
   FAST ATTENTION SPEECH
===================================================== */

/*
=========================================================
ВАЖНО

Это отдельная функция для предупреждения внимания.

Она НЕ ждёт обычный speech queue.

Когда пользователь смотрит в сторону 3 секунды:

1. Текущая речь отменяется.
2. SpeechSynthesis немедленно resume().
3. Новая короткая фраза запускается сразу.
4. warning имеет повышенный приоритет.
=========================================================
*/

function speakAttentionWarning(
    text
) {

    return new Promise(
        resolve => {

            if (
                !("speechSynthesis" in window) ||
                !text
            ) {

                resolve();

                return;

            }

            state.attentionWarningSpeaking =
                true;

            /*
              Немедленно отменяем текущую речь.
            */

            try {

                speechSynthesis.cancel();

            } catch {}

            /*
              Создаём warning сразу,
              без дополнительных timeout.
            */

            const utterance =
                new SpeechSynthesisUtterance(
                    text
                );

            utterance.lang =
                "ru-RU";

            const voice =
                getRussianVoice(
                    state.selectedTeacher
                );

            if (voice) {

                utterance.voice =
                    voice;

            }

            /*
              Warning должен начинаться быстро.
            */

            utterance.rate =
                1.05;

            utterance.pitch =
                state.selectedTeacher === "female"
                    ? 1.03
                    : .90;

            utterance.volume =
                1;

            state.speaking =
                true;

            $("#speakingIndicator")
                ?.classList.add(
                    "active"
                );

            $("#teacherSpeechStatus")
                .textContent =
                "Внимание преподавателя...";

            utterance.onend =
                () => {

                    state.speaking =
                        false;

                    state.attentionWarningSpeaking =
                        false;

                    $("#speakingIndicator")
                        ?.classList.remove(
                            "active"
                        );

                    $("#teacherSpeechStatus")
                        .textContent =
                        "Слушаю вас...";

                    resolve();

                };

            utterance.onerror =
                () => {

                    state.speaking =
                        false;

                    state.attentionWarningSpeaking =
                        false;

                    $("#speakingIndicator")
                        ?.classList.remove(
                            "active"
                        );

                    resolve();

                };

            /*
              Самое важное:
              speak() вызывается сразу.
            */

            try {

                speechSynthesis.speak(
                    utterance
                );

            } catch (error) {

                console.warn(
                    "Attention speech error:",
                    error
                );

                state.speaking =
                    false;

                state.attentionWarningSpeaking =
                    false;

                resolve();

                return;

            }

            /*
              В некоторых версиях Chrome
              resume() значительно уменьшает
              задержку запуска голоса.
            */

            try {

                speechSynthesis.resume();

            } catch {}

        }
    );

}


/* =====================================================
   VOICE PREVIEW
===================================================== */

function previewVoice(type) {

    speak(
        type === "female"
            ? "Здравствуйте. Я Анна, ваш AI-преподаватель."
            : "Здравствуйте. Я Александр, ваш AI-преподаватель.",
        {
            teacher: type
        }
    );

}


/* =====================================================
   VOICE RECOGNITION
===================================================== */

function initSpeechRecognition() {

    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {

        console.warn(
            "Speech Recognition не поддерживается."
        );

        return;

    }

    const recognition =
        new Recognition();

    state.recognition =
        recognition;

    recognition.lang =
        "ru-RU";

    recognition.continuous =
        true;

    recognition.interimResults =
        false;

    recognition.maxAlternatives =
        1;

    recognition.onstart =
        () => {

            state.recognitionStarted =
                true;

        };

    recognition.onresult =
        event => {

            const last =
                event.results[
                    event.results.length - 1
                ];

            if (
                !last ||
                !last[0]
            ) {

                return;

            }

            const text =
                last[0].transcript
                    .toLowerCase()
                    .trim();

            if (text) {

                console.log(
                    "Voice:",
                    text
                );

                processVoiceCommand(
                    text
                );

            }

        };

    recognition.onerror =
        event => {

            console.log(
                "Recognition:",
                event.error
            );

            state.recognitionStarted =
                false;

        };

    recognition.onend =
        () => {

            state.recognitionStarted =
                false;

            if (
                !lessonScreen.classList.contains(
                    "hidden"
                )
            ) {

                setTimeout(
                    startRecognition,
                    500
                );

            }

        };

    document.addEventListener(
        "pointerdown",
        () => {

            if (
                !state.recognitionStarted &&
                state.recognition
            ) {

                startRecognition();

            }

        },
        {
            passive: true
        }
    );

}


function startRecognition() {

    if (
        !state.recognition
    ) {

        return;

    }

    /*
      Attention warning paytida recognition
      ishlashi mumkin. Bu oldingi behaviourni
      buzmaslik uchun to'liq bloklanmaydi.
    */

    try {

        state.recognition.start();

    } catch (error) {}

}


/* =====================================================
   COMMAND PARSER
===================================================== */

function normalizeCommand(text) {

    return text
        .toLowerCase()
        .replace(
            /[!?.,]/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


async function processVoiceCommand(
    rawText
) {

    if (
        !lessonScreen ||
        lessonScreen.classList.contains(
            "hidden"
        )
    ) {

        return;

    }

    const text =
        normalizeCommand(
            rawText
        );

    /*
      Oddiy dars nutqi paytida buyruqlar
      oldingidek bloklanadi.

      Attention warning esa qisqa ustuvor
      warning sifatida ishlaydi.
    */

    if (
        state.speaking &&
        !state.attentionWarningSpeaking
    ) {

        return;

    }


    /* WATER / BREAK */

    if (
        text.includes(
            "пойду попью воды"
        ) ||
        text.includes(
            "я пойду попью воды"
        ) ||
        text.includes(
            "пойду за водой"
        ) ||
        text.includes(
            "хочу воды"
        ) ||
        text.includes(
            "хочу попить воды"
        ) ||
        text.includes(
            "хочу попить"
        ) ||
        text.includes(
            "хочу пить"
        ) ||
        text.includes(
            "можно воды"
        )
    ) {

        await startBreak();

        return;

    }


    /* RETURN */

    if (
        text.includes(
            "я вернулся"
        ) ||
        text.includes(
            "я вернулась"
        ) ||
        text.includes(
            "я снова здесь"
        ) ||
        text.includes(
            "продолжаем"
        ) ||
        text.includes(
            "я готов"
        ) ||
        text.includes(
            "я готова"
        )
    ) {

        await resumeLessonByVoice();

        return;

    }


    /* REPEAT */

    if (
        text.includes(
            "объясни ещё раз"
        ) ||
        text.includes(
            "объясни еще раз"
        ) ||
        text.includes(
            "повтори"
        ) ||
        text.includes(
            "не понял"
        ) ||
        text.includes(
            "не поняла"
        ) ||
        text.includes(
            "ещё раз"
        ) ||
        text.includes(
            "еще раз"
        )
    ) {

        await repeatCurrentBlock();

        return;

    }


    /* EXAMPLE */

    if (
        text.includes(
            "покажи пример"
        ) ||
        text.includes(
            "давай пример"
        ) ||
        text.includes(
            "можно пример"
        ) ||
        text.includes(
            "приведи пример"
        )
    ) {

        await giveExample();

        return;

    }


    /* START */

    if (
        text.includes(
            "начнём урок"
        ) ||
        text.includes(
            "начнем урок"
        ) ||
        text.includes(
            "начинаем урок"
        ) ||
        text.includes(
            "давай начнём урок"
        ) ||
        text.includes(
            "давай начнем урок"
        ) ||
        text.includes(
            "стартуем урок"
        )
    ) {

        if (
            !state.lessonRunning
        ) {

            startLessonEngine();

        }

        return;

    }


    /* PAUSE */

    if (
        text === "пауза" ||
        text.includes(
            "сделай паузу"
        ) ||
        text.includes(
            "останови урок"
        )
    ) {

        pauseLesson();

        await speak(
            "Хорошо. Урок поставлен на паузу. Когда будете готовы, скажите «Продолжаем»."
        );

        return;

    }


    /* FINISH */

    if (
        text.includes(
            "заверши урок"
        ) ||
        text.includes(
            "закончим урок"
        ) ||
        text.includes(
            "хватит на сегодня"
        )
    ) {

        await speak(
            "Хорошо. Останавливаем урок."
        );

        finishLesson(
            false
        );

        return;

    }

}


/* =====================================================
   BREAK
===================================================== */

async function startBreak() {

    if (
        state.breakActive
    ) {

        return;

    }

    state.breakActive =
        true;

    pauseLesson();

    $("#breakOverlay")
        .classList.remove(
            "hidden"
        );

    await speak(
        "Хорошо. Конечно, можете пойти попить воды. Я поставила урок на паузу. Когда вернётесь, скажите «Я вернулся»."
    );

}


async function resumeLessonByVoice() {

    if (
        !state.breakActive &&
        !state.lessonPaused
    ) {

        await speak(
            "Отлично. Продолжаем урок."
        );

        return;

    }

    state.breakActive =
        false;

    $("#breakOverlay")
        .classList.add(
            "hidden"
        );

    await speak(
        "Хорошо, с возвращением. Продолжаем урок."
    );

    resumeLesson();

}


/* =====================================================
   LESSON START
===================================================== */

function getBlocksForCourse(
    course,
    lessonIndex
) {

    if (
        course.id === "python"
    ) {

        return pythonBlocks;

    }

    return createGenericBlocks(
        course,
        course.lessons[
            lessonIndex
        ]
    );

}


async function startLesson(
    courseId,
    lessonIndex
) {

    const course =
        courses.find(
            c =>
                c.id === courseId
        );

    if (!course) {

        return;

    }

    state.currentCourse =
        course;

    state.currentLesson =
        lessonIndex;

    state.lessonBlocks =
        getBlocksForCourse(
            course,
            lessonIndex
        );

    state.lessonBlockIndex =
        0;

    state.remainingSeconds =
        45 * 60;

    state.lessonRunning =
        false;

    state.lessonPaused =
        false;

    state.breakActive =
        false;

    state.lookingAwaySince =
        null;

    state.attentionWarningAt =
        0;

    state.attentionWarningSpeaking =
        false;

    lessonScreen
        .classList.remove(
            "hidden"
        );

    $("#lessonCourseName")
        .textContent =
        course.title;

    $("#studentNameLesson")
        .textContent =
        savedUser?.name ||
        "Ученик";

    updateTeacherLessonUI();

    updateLessonTimer();

    updateLessonProgress();

    $("#breakOverlay")
        .classList.add(
            "hidden"
        );

    $("#completeOverlay")
        .classList.add(
            "hidden"
        );

    startCamera();

    initAttentionTracking();

    startRecognition();

    await speak(
        `Здравствуйте, ${savedUser?.name || "ученик"}. Это полноценный 45-минутный урок курса «${course.title}». Я буду объяснять материал постепенно. Если хотите попить воды, просто скажите «Я пойду попью воды». Если что-то непонятно — скажите «Объясни ещё раз». Когда будете готовы, скажите «Начинаем урок».`,
        {
            rate: .91
        }
    );

    if (
        !state.lessonRunning
    ) {

        await speak(
            "Хорошо. Начинаем урок. Смотрите на экран и внимательно слушайте."
        );

        startLessonEngine();

    }

}


/* =====================================================
   TEACHER UI
===================================================== */

function updateTeacherLessonUI() {

    const female =
        state.selectedTeacher ===
        "female";

    $("#lessonTeacherName")
        .textContent =
        female
            ? "Анна"
            : "Александр";

    $("#lessonTeacherAvatar")
        .textContent =
        female
            ? "👩🏻‍🏫"
            : "👨🏻‍🏫";

    $("#teacherSpeechStatus")
        .textContent =
        "Ваш AI-преподаватель";

}


/* =====================================================
   LESSON ENGINE
===================================================== */

function startLessonEngine() {

    if (
        state.lessonRunning
    ) {

        return;

    }

    state.lessonRunning =
        true;

    state.lessonPaused =
        false;

    clearInterval(
        state.lessonInterval
    );

    state.lessonInterval =
        setInterval(
            () => {

                if (
                    !state.lessonRunning ||
                    state.lessonPaused
                ) {

                    return;

                }

                state.remainingSeconds--;

                updateLessonTimer();

                updateLessonProgress();

                if (
                    state.remainingSeconds <= 0
                ) {

                    finishLesson(
                        true
                    );

                }

            },
            1000
        );

    runCurrentBlock();

}


async function runCurrentBlock() {

    if (
        !state.lessonRunning ||
        state.lessonPaused
    ) {

        return;

    }

    const block =
        state.lessonBlocks[
            state.lessonBlockIndex
        ];

    if (!block) {

        return;

    }

    updateBlockUI();

    clearTimeout(
        state.blockTimeout
    );

    clearTimeout(
        state.blockStageTimeout
    );

    await speak(
        block.explain
    );

    if (
        !state.lessonRunning ||
        state.lessonPaused
    ) {

        return;

    }

    state.blockStageTimeout =
        setTimeout(
            async () => {

                if (
                    !state.lessonRunning ||
                    state.lessonPaused
                ) {

                    return;

                }

                await speak(
                    block.practice
                );

                if (
                    !state.lessonRunning ||
                    state.lessonPaused
                ) {

                    return;

                }

                setTimeout(
                    async () => {

                        if (
                            !state.lessonRunning ||
                            state.lessonPaused
                        ) {

                            return;

                        }

                        await speak(
                            block.answer
                        );

                    },
                    1000
                );

            },
            45000
        );

    setTimeout(
        async () => {

            if (
                !state.lessonRunning ||
                state.lessonPaused
            ) {

                return;

            }

            await speak(
                block.example
            );

        },
        90000
    );

    state.blockTimeout =
        setTimeout(
            () => {

                if (
                    !state.lessonRunning ||
                    state.lessonPaused
                ) {

                    return;

                }

                nextLessonBlock();

            },
            180000
        );

}


/* =====================================================
   NEXT BLOCK
===================================================== */

function nextLessonBlock() {

    state.lessonBlockIndex++;

    if (
        state.lessonBlockIndex >=
        state.lessonBlocks.length
    ) {

        finishLesson(
            true
        );

        return;

    }

    runCurrentBlock();

}


/* =====================================================
   REPEAT / EXAMPLE
===================================================== */

async function repeatCurrentBlock() {

    if (
        !state.currentCourse ||
        !state.lessonBlocks.length
    ) {

        return;

    }

    const block =
        state.lessonBlocks[
            state.lessonBlockIndex
        ];

    if (!block) {

        return;

    }

    pauseTemporaryTimers();

    await speak(
        `Конечно. Объясню ещё раз. ${block.explain}`
    );

    if (
        state.lessonRunning &&
        !state.lessonPaused
    ) {

        resumeBlockTimer();

    }

}


async function giveExample() {

    const block =
        state.lessonBlocks[
            state.lessonBlockIndex
        ];

    if (!block) {

        return;

    }

    await speak(
        `Конечно. Вот пример. ${block.example}`
    );

}


function pauseTemporaryTimers() {

    clearTimeout(
        state.blockTimeout
    );

    clearTimeout(
        state.blockStageTimeout
    );

}


function resumeBlockTimer() {

    clearTimeout(
        state.blockTimeout
    );

    state.blockTimeout =
        setTimeout(
            nextLessonBlock,
            90000
        );

}


/* =====================================================
   PAUSE / RESUME
===================================================== */

function pauseLesson() {

    state.lessonPaused =
        true;

    speechSynthesis.cancel();

    clearTimeout(
        state.blockTimeout
    );

    clearTimeout(
        state.blockStageTimeout
    );

    $("#teacherSpeechStatus")
        .textContent =
        "Урок на паузе";

}


function resumeLesson() {

    if (
        !state.lessonRunning
    ) {

        startLessonEngine();

        return;

    }

    state.lessonPaused =
        false;

    $("#teacherSpeechStatus")
        .textContent =
        "Продолжаем урок...";

    runCurrentBlock();

}


/* =====================================================
   TIMER
===================================================== */

function formatTime(seconds) {

    const mins =
        Math.floor(
            seconds / 60
        );

    const secs =
        seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}


function updateLessonTimer() {

    $("#lessonTimer")
        .textContent =
        formatTime(
            Math.max(
                0,
                state.remainingSeconds
            )
        );

}


function updateLessonProgress() {

    const elapsed =
        45 * 60 -
        state.remainingSeconds;

    const percent =
        Math.min(
            100,
            Math.round(
                elapsed /
                (45 * 60) *
                100
            )
        );

    $("#lessonProgressBar")
        .style.width =
        `${percent}%`;

    $("#lessonProgressText")
        .textContent =
        `${percent}%`;

}


/* =====================================================
   BLOCK UI
===================================================== */

function updateBlockUI() {

    const index =
        state.lessonBlockIndex;

    const block =
        state.lessonBlocks[
            index
        ];

    if (!block) {

        return;

    }

    $("#lessonBlockNumber")
        .textContent =
        `БЛОК ${index + 1} / ${state.lessonBlocks.length}`;

    $("#lessonBlockTitle")
        .textContent =
        block.title;

    $("#lessonBlockSubtitle")
        .textContent =
        block.subtitle;

}


/* =====================================================
   COMPLETE
===================================================== */

function finishLesson(
    completed = false
) {

    clearInterval(
        state.lessonInterval
    );

    clearTimeout(
        state.blockTimeout
    );

    clearTimeout(
        state.blockStageTimeout
    );

    state.lessonRunning =
        false;

    state.lessonPaused =
        false;

    speechSynthesis.cancel();

    if (
        completed &&
        state.currentCourse
    ) {

        const lessonId =
            `${state.currentCourse.id}::${state.currentLesson}`;

        if (
            !progress.completedLessons
                .includes(
                    lessonId
                )
        ) {

            progress.completedLessons.push(
                lessonId
            );

            progress.xp += 100;

            saveProgress();

        }

        $("#completeOverlay")
            .classList.remove(
                "hidden"
            );

        setTimeout(
            () => {

                speak(
                    "Поздравляю. Вы полностью завершили 45-минутный урок. Отличная работа."
                );

            },
            300
        );

    } else {

        stopCamera();

        stopAttentionTracking();

    }

}


$("#completeClose")
    .addEventListener(
        "click",
        () => {

            $("#completeOverlay")
                .classList.add(
                    "hidden"
                );

            stopLessonCompletely();

        }
    );


/* =====================================================
   EXIT LESSON
===================================================== */

$("#exitLesson")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Выйти из урока? Текущий урок не будет засчитан."
                )
            ) {

                stopLessonCompletely();

            }

        }
    );


function stopLessonCompletely() {

    state.lessonRunning =
        false;

    state.lessonPaused =
        false;

    state.breakActive =
        false;

    state.attentionWarningSpeaking =
        false;

    clearInterval(
        state.lessonInterval
    );

    clearTimeout(
        state.blockTimeout
    );

    clearTimeout(
        state.blockStageTimeout
    );

    speechSynthesis.cancel();

    stopRecognition();

    stopCamera();

    stopAttentionTracking();

    $("#breakOverlay")
        .classList.add(
            "hidden"
        );

    $("#completeOverlay")
        .classList.add(
            "hidden"
        );

    lessonScreen
        .classList.add(
            "hidden"
        );

    renderAll();

}


/* =====================================================
   CAMERA
===================================================== */

async function startCamera() {

    stopCamera();

    $("#cameraStatus")
        .textContent =
        "Запрашиваем доступ...";

    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {

                        width: {
                            ideal: 1280
                        },

                        height: {
                            ideal: 720
                        },

                        facingMode:
                            "user"

                    },

                    audio: false

                });

        state.cameraStream =
            stream;

        const video =
            $("#studentCamera");

        video.srcObject =
            stream;

        video.setAttribute(
            "autoplay",
            ""
        );

        video.setAttribute(
            "muted",
            ""
        );

        video.setAttribute(
            "playsinline",
            ""
        );

        await video.play();

        $("#cameraPlaceholder")
            .classList.add(
                "hidden"
            );

        $("#cameraStatus")
            .textContent =
            "Камера подключена";

        $("#attentionStatus")
            .textContent =
            "Контроль внимания";

    } catch (error) {

        console.error(
            "Camera error:",
            error
        );

        $("#cameraPlaceholder")
            .classList.remove(
                "hidden"
            );

        $("#cameraStatus")
            .textContent =
            "Камера недоступна";

        $("#attentionStatus")
            .textContent =
            "Камера недоступна";

    }

}


/* =====================================================
   STOP CAMERA
===================================================== */

function stopCamera() {

    if (
        state.cameraStream
    ) {

        state.cameraStream
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );

        state.cameraStream =
            null;

    }

    const video =
        $("#studentCamera");

    if (video) {

        video.srcObject =
            null;

    }

}


/* =====================================================
   MEDIAPIPE FACE MESH
===================================================== */

async function initAttentionTracking() {

    if (
        state.attentionStarted
    ) {

        return;

    }

    if (
        !window.FaceMesh ||
        !window.Camera
    ) {

        console.warn(
            "MediaPipe Face Mesh недоступен."
        );

        $("#attentionStatus")
            .textContent =
            "Контроль внимания недоступен";

        return;

    }

    const video =
        $("#studentCamera");

    if (!video) {

        return;

    }

    /*
      Wait until camera is actually ready.
    */

    if (
        !state.cameraStream ||
        video.readyState < 2
    ) {

        let attempts = 0;

        const waitForCamera =
            setInterval(
                async () => {

                    attempts++;

                    if (
                        state.cameraStream &&
                        video.readyState >= 2
                    ) {

                        clearInterval(
                            waitForCamera
                        );

                        initAttentionTracking();

                    }

                    if (
                        attempts >= 50
                    ) {

                        clearInterval(
                            waitForCamera
                        );

                    }

                },
                100
            );

        return;

    }

    state.attentionStarted =
        true;

    state.faceMesh =
        new FaceMesh({

            locateFile:
                file =>
                    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`

        });

    state.faceMesh.setOptions({

        maxNumFaces: 1,

        refineLandmarks: true,

        minDetectionConfidence: .5,

        minTrackingConfidence: .5

    });

    state.faceMesh.onResults(
        handleFaceResults
    );

    try {

        state.faceCamera =
            new Camera(
                video,
                {

                    onFrame:
                        async () => {

                            if (
                                !state.cameraStream ||
                                !state.lessonRunning ||
                                state.lessonPaused
                            ) {

                                return;

                            }

                            try {

                                await state.faceMesh
                                    .send({
                                        image: video
                                    });

                            } catch (
                                error
                            ) {

                                console.warn(
                                    "Face mesh frame error",
                                    error
                                );

                            }

                        },

                    width: 640,

                    height: 480

                }
            );

        await state.faceCamera.start();

    } catch (error) {

        console.warn(
            "Attention camera error:",
            error
        );

        state.attentionStarted =
            false;

    }

}


/* =====================================================
   ATTENTION ESTIMATION
===================================================== */

function handleFaceResults(
    results
) {

    if (
        !state.lessonRunning ||
        state.lessonPaused
    ) {

        return;

    }

    const faces =
        results.multiFaceLandmarks;

    if (
        !faces ||
        !faces.length
    ) {

        handleLookingAway(
            "Лицо не видно"
        );

        return;

    }

    const landmarks =
        faces[0];

    const nose =
        landmarks[1];

    const leftEye =
        landmarks[33];

    const rightEye =
        landmarks[263];

    const leftFace =
        landmarks[234];

    const rightFace =
        landmarks[454];

    const eyeCenterX =
        (
            leftEye.x +
            rightEye.x
        ) / 2;

    const eyeCenterY =
        (
            leftEye.y +
            rightEye.y
        ) / 2;

    const faceCenterX =
        (
            leftFace.x +
            rightFace.x
        ) / 2;

    const horizontal =
        Math.abs(
            nose.x -
            faceCenterX
        );

    const vertical =
        Math.abs(
            nose.y -
            eyeCenterY
        );

    const lookingAtScreen =
        horizontal < .12 &&
        vertical < .19;

    if (
        lookingAtScreen
    ) {

        state.lookingAwaySince =
            null;

        $("#attentionTimer")
            .textContent =
            "● Взгляд на экран";

        $("#attentionTimer")
            .style.color =
            "var(--green)";

        return;

    }

    handleLookingAway(
        "Смотрите на экран"
    );

}


/* =====================================================
   3 SECOND ATTENTION WARNING
===================================================== */

function handleLookingAway(
    reason
) {

    /*
      Если warning уже идёт,
      не создаём второй warning.
    */

    if (
        state.attentionWarningSpeaking
    ) {

        $("#attentionStatus")
            .textContent =
            "Верните внимание на экран";

    }

    if (
        state.lookingAwaySince === null
    ) {

        state.lookingAwaySince =
            Date.now();

        $("#attentionTimer")
            .textContent =
            "● Взгляд в сторону: 0 сек";

        $("#attentionTimer")
            .style.color =
            "#ffb454";

        return;

    }

    const elapsed =
        Date.now() -
        state.lookingAwaySince;

    const seconds =
        Math.floor(
            elapsed / 1000
        );

    $("#attentionTimer")
        .textContent =
        `● Взгляд в сторону: ${seconds} сек`;

    $("#attentionTimer")
        .style.color =
        "#ffb454";

    /*
      WARNING EXACTLY AFTER 3 SECONDS.
    */

    if (
        elapsed >= 3000 &&
        Date.now() -
            state.attentionWarningAt >
            15000 &&
        !state.attentionWarningSpeaking
    ) {

        state.attentionWarningAt =
            Date.now();

        state.lookingAwaySince =
            null;

        /*
          НЕ await.

          Warning запускается сразу,
          не блокируя FaceMesh.
        */

        attentionWarning();

    }

}


/* =====================================================
   ATTENTION WARNING
===================================================== */

function attentionWarning() {

    $("#attentionStatus")
        .textContent =
        "Верните внимание на экран";

    /*
      Урок не ставим на паузу.

      Главная разница:
      вместо обычного speak()
      используем отдельный быстрый
      attention speech.
    */

    speakAttentionWarning(
        "Пожалуйста, смотрите на экран. Я сейчас объясняю тему."
    )
        .then(
            () => {

                if (
                    state.lessonRunning &&
                    !state.lessonPaused
                ) {

                    $("#attentionStatus")
                        .textContent =
                        "Контроль внимания";

                }

            }
        );

}


/* =====================================================
   STOP ATTENTION
===================================================== */

function stopAttentionTracking() {

    state.attentionStarted =
        false;

    state.lookingAwaySince =
        null;

    state.attentionWarningAt =
        0;

    state.attentionWarningSpeaking =
        false;

    if (
        state.faceCamera &&
        state.faceCamera.stop
    ) {

        try {

            state.faceCamera.stop();

        } catch {}

    }

    state.faceCamera =
        null;

    state.faceMesh =
        null;

}


/* =====================================================
   RECOGNITION STOP
===================================================== */

function stopRecognition() {

    if (
        state.recognition
    ) {

        try {

            state.recognition.stop();

        } catch {}

    }

    state.recognitionStarted =
        false;

}


/* =====================================================
   AUTO START IF USER EXISTS
===================================================== */

if (
    savedUser
) {

    setTimeout(
        () => {

            openAcademy();

        },
        50
    );

} else {

    app.classList.add(
        "hidden"
    );

    welcomeModal.classList.remove(
        "hidden"
    );

}


/* =====================================================
   KEEP PROGRESS UPDATED
===================================================== */

window.addEventListener(
    "beforeunload",
    () => {

        stopCamera();

        stopAttentionTracking();

    }
);


/* =====================================================
   FIRST INTERACTION
===================================================== */

document.addEventListener(
    "click",
    () => {

        /*
          Browser speech engineini foydalanuvchining
          birinchi interactionidan keyin uyg'otamiz.

          Bu keyingi warninglarda startup delayni
          kamaytirishga yordam beradi.
        */

        if (
            "speechSynthesis" in window
        ) {

            try {

                speechSynthesis.resume();

            } catch {}

        }

        if (
            state.recognition &&
            !state.recognitionStarted
        ) {

            startRecognition();

        }

    },
    {
        once: true
    }
);


/* =====================================================
   FIRST POINTER INTERACTION
===================================================== */

document.addEventListener(
    "pointerdown",
    () => {

        if (
            "speechSynthesis" in window
        ) {

            try {

                speechSynthesis.resume();

            } catch {}

        }

    },
    {
        passive: true,
        once: true
    }
);
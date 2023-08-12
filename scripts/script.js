'use strict';

getData();

// Получение данных с помощью GET-запроса
async function getData() {
    // Создание пустого массива для хранения данных
    let arrayUser = [];

    // Получение данных с помощью GET-запроса
    let response = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users');
    let data = await response.json();

    // Сохранение данных в массиве
    arrayUser = data;
    // Обновление страницы с новыми данными
    updatePage(arrayUser);
}

function updatePage(arrayUser) {
    let $app = document.getElementById('app'),
    $table = document.createElement('table'),
    $tableBody = document.createElement('tbody');

    $table.append($tableBody);
    $app.append($table)

    for (const oneUser of arrayUser) {
        var cancel = new Image();
        cancel.src = 'img/icon_cancel.svg';
        cancel.id = 'cancel';

        const $userTr = document.createElement('tr'),
              $userName = document.createElement('th_name'),
              $userEmail = document.createElement('th_email'),
              $userDate = document.createElement('th_date'),
              $userRate = document.createElement('th_rate');

        $userName.textContent = oneUser.username;
        $userEmail.textContent = oneUser.email;
        $userDate.textContent = dateFormat(oneUser.registration_date);
        $userRate.textContent = oneUser.rating;

        $userTr.append($userName);
        $userTr.append($userEmail);
        $userTr.append($userDate);
        $userTr.append($userRate);
        $userTr.append(cancel);

        $tableBody.append($userTr);

        cancel.addEventListener('click', function() {
            console.log('Icon clicked!');
        });
        // document.querySelector('tr').appendChild(cancel);
    }
}

function dateFormat(anyDate) {
    let date = new Date(anyDate);
    // Получение дня, месяца и года
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear().toString().substr(-2);

    // Добавление ведущего нуля к дню и месяцу, если они меньше 10
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    // Форматирование строки с датой
    let formattedDate = `${day}.${month}.${year}`;

    // Вывод отформатированной даты
    return formattedDate;

}

function createStrip() {

}
'use strict';

// Создание элементов
const $app = document.getElementById('app'),
$table = document.createElement('table'),
$tableBody = document.createElement('tbody');

$table.append($tableBody);
$app.append($table);

getData();

// Получение данных с помощью GET-запроса и передачей их при обновлении страницы
async function getData() {
    let arrayUser = [];

    let response = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users');
    let data = await response.json();

    arrayUser = data;

    render(arrayUser);
}

function render(arrayUser){
    $tableBody.innerHTML = '';
    let copyArrayUser = [...arrayUser];

    for (const oneUser of copyArrayUser) {
        let $newTr = createUserTr(oneUser, copyArrayUser);

        $tableBody.append($newTr);
    }
}

// Создание одного пользователя
function createUserTr(oneUser, copyArrayUser) {
    const cancel = new Image();
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

    // Вывод модального окна
    cancel.addEventListener('click', function() {
        document.getElementById("modal_one").classList.add("open");
        // Удаление пользователя
        document.getElementById("YesDelete").addEventListener('click', function() {
            copyArrayUser = copyArrayUser.filter(item => item.id !== oneUser.id);
            $userTr.remove();
            document.getElementById("modal_one").classList.remove("open");
        });
    });
    // Отмена удаления пользователя
    document.getElementById("closeModalButton").addEventListener('click', function() {
        document.getElementById("modal_one").classList.remove("open"); 
    });

    return $userTr
}

// Функция приведения даты в нужный вид для вывода
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

function fSortDate() {

}
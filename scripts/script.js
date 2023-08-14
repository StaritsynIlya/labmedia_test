'use strict';

    // Массив который будем изменять, не трогая основной
let copyArrayUser = [],
    searchFilterArray = [],
    maxPage = 1,
    // Столбец по которо у будет идти сортировка
    sortColumnFlag = '',
    // Знак для сортировки
    sortDirFlag = true,
    // Контроль нажатия на другое поле сортировки
    sortDirFlagDate = null,
    sortDirFlagRate = null;

    // Количество пользователей на странице
let perPage = 5;
    // Текущая страница
let currentPage = 1;


    // Получение элементов для наведения красоты
let searchVal = document.getElementById('searchValue').value,
    element = document.querySelector('.underlineDate'),
    elementOther = document.querySelector('.underlineRate'),
    clearBtn = document.querySelector('.clearButton'),
    searchBlock = document.querySelector('.searchBlock'),
    pages = document.querySelector('.pages');

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

    updateData(arrayUser);
}

function updateData(arrayUser) {
    copyArrayUser = [...arrayUser];
    render(copyArrayUser);
}

// Рендер для вывода всех пользователей
function render(copyArrayUser){
    $tableBody.innerHTML = '';
    searchFilterArray = [...copyArrayUser];

    if (searchVal!=='') searchFilterArray = search(copyArrayUser, searchVal)

    searchFilterArray = searchFilterArray.sort(function(a, b) {
        let sort = a[sortColumnFlag] < b[sortColumnFlag]; 
        if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
        return sort ? -1 : 1
    })
    
    maxPage = Math.ceil(searchFilterArray.length / perPage)
    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    searchFilterArray = searchFilterArray.slice(start, end);

    for (const oneUser of searchFilterArray) {
        let $newTr = createUserTr(oneUser);
        $tableBody.append($newTr);
    }
}

// Создание одного пользователя
function createUserTr(oneUser) {
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

function search(copyArrayUser, value) {
    let result = [],
    copy = [...copyArrayUser];
    for (const item of copy) {
        if ((item.username.toLowerCase()).includes(value.toLowerCase()) == true || (item.email.toLowerCase()).includes(value.toLowerCase()) == true) result.push(item)
    }
    return result; 
}

// Поиск по имени и емэйл
document.getElementById('searchValue').addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        searchVal = document.getElementById('searchValue').value;

        clearBtn.style.display = 'flex';
        searchBlock.style.height = '102px';

        render(copyArrayUser);
    }
});

// Клики сортировки
document.getElementById('sortDateBtn').addEventListener('click', function() {
    sortColumnFlag = 'registration_date';
    if (sortDirFlagDate == null) sortDirFlagDate = true
    sortDirFlagRate = null;

    element.style.color = '#333';
    elementOther.style.color = '#9EAAB4';
    clearBtn.style.display = 'flex';
    searchBlock.style.height = '102px';

    sortDirFlagDate = !sortDirFlagDate;
    sortDirFlag = sortDirFlagDate;
    render(copyArrayUser)
});

document.getElementById('sortRateBtn').addEventListener('click', function() {
    sortColumnFlag = 'rating';
    if (sortDirFlagRate == null) sortDirFlagRate = true
    sortDirFlagDate = null;

    elementOther.style.color = '#333';
    element.style.color = '#9EAAB4';
    clearBtn.style.display = 'flex';
    searchBlock.style.height = '102px';

    sortDirFlagRate = !sortDirFlagRate;
    sortDirFlag = sortDirFlagRate;
    render(copyArrayUser);
});

// Кнопка очистки
document.getElementById('clearButtonClk').addEventListener('click', function(){
    elementOther.style.color = '#9EAAB4';
    element.style.color = '#9EAAB4';
    clearBtn.style.display = 'none';
    searchBlock.style.height = '58px';

    sortColumnFlag = '';
    searchVal = '';
    sortDirFlag = true;
    sortDirFlagDate = null;
    sortDirFlagRate = null;
    document.getElementById('searchValue').value = '';

    searchFilterArray = [...copyArrayUser];
    render(copyArrayUser);
});

document.querySelector('#prev').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      pages.textContent = currentPage;
      render(copyArrayUser);
    }
});
  
document.querySelector('#next').addEventListener('click', () => {
    if (currentPage < maxPage) {
        currentPage++;
        pages.textContent = currentPage;
        render(copyArrayUser);
    }
});
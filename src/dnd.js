/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let div = document.createElement('div');
    let countDiv = document.querySelectorAll('.draggable-div').length;

    const maxColor = 255;
    const maxWidth = document.body.clientWidth;
    const maxHeight = document.body.clientHeight;
    const width = Math.round(Math.random() * maxWidth);
    const height = Math.round(Math.random() * maxHeight);

    homeworkContainer.style.position = 'relative';
    homeworkContainer.style.width = '100%';
    homeworkContainer.style.height = '100vh';

    div.id = ++countDiv;
    div.classList.add('draggable-div');
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.left = Math.min(Math.round(Math.random() * maxWidth), maxWidth - width) + 'px';
    div.style.top = Math.min(Math.round(Math.random() * maxHeight), maxHeight - height) + 'px';
    div.style.backgroundColor = 'rgb('+ Math.round(Math.random() * maxColor) +
    ',' + Math.round(Math.random() * maxColor) +
    ',' + Math.round(Math.random() * maxColor) + ')';
    div.setAttribute('draggable', true);
    div.style.position = 'absolute';

    return div;

}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

function handleDragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.dropEffect = 'move';
    ev.dataTransfer.setData('text', ev.target.id + ',' + ev.clientX + ',' + ev.clientY);   

    return true;
}

function handleDragEnter(ev) {
    ev.preventDefault();

    return true;
}
function handleDragOver(ev) {
    ev.preventDefault();
}

function addListeners(target) {
    target.addEventListener('dragstart', handleDragStart, false);
    homeworkContainer.addEventListener('dragover', handleDragOver, false);
    homeworkContainer.addEventListener('dragenter', handleDragEnter, false); 
    homeworkContainer.addEventListener('drop', handleDragDrop, false);    
}

function handleDragDrop(ev) {
    const data = ev.dataTransfer.getData('text');
    const mas = data.split(',');
    let el = document.getElementById(mas[0]);

    el.style.left = Number.parseInt(el.style.left) + ev.clientX - mas[1] +'px';
    el.style.top = Number.parseInt(el.style.top) + ev.clientY - mas[2]+ 'px';
    ev.stopPropagation();

    return false;
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

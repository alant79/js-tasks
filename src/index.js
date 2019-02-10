// import { format } from "url";

/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i=0; i<array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let mas = [];

    for (let i=0; i<array.length; i++) {
        mas.push(fn(array[i], i, array));
    }

    return mas;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let result, pos;

    if (initial===undefined) {
        result = array[0];
        pos = 1;
    } else {
        result = initial;
        pos = 0;
    }

    for (let i=pos; i<array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let mas = [];

    for (let prop in obj) {

        if (obj.hasOwnProperty(prop)) {
            mas.push(prop.toUpperCase());
        }  
    }

    return mas;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let array1 = [];

    // будем записывать в переменные pos1 и pos2 реальные позиции начала и конца
    let pos1, pos2;

    if ((to===undefined)&&(from===undefined)) {
    // если параметр только сам массив, то его возвращаем
        array1 = array;
    } else if (to===undefined) { 
    // если 2-й параметр не задан, то возвращаем с первой позиции до конца массива 
        pos1 = from<0 ?array.length+from:from;
        pos2 = array.length;
    } else {
        pos1 = from<0 ?array.length+from:from;
        pos2 = to<0 ?array.length+to:to;   
    }

    if (pos1<0) {
        pos1 = 0;
    }

    if (pos2>array.length) {
        pos2 = array.length;
    }

    for (let i=pos1; i<pos2; i++) {
        array1.push(array[i]);
    }

    return array1;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {

        set(target, prop, value) {

            target[prop] = value*value;

            return true;
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

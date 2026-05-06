import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);
export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                    const option = document.createElement('option') 
                    option.value = name;
                    option.textContent = name;
                    return option;                           // @todo: создать и вернуть тег опции
                    })
        )
    })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        const form = document.querySelector('form')
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (e.submitter.getAttribute('name') === 'clear') {
                const parent = e.submitter.parentElement; // <label class="filter-wrapper">
                const input = parent.querySelector('input');
                input.value = '';
            }
        })

        function dataFilter (data) {
            const range = document.querySelector('.range-inputs');
            const from = range.querySelector('input[name="totalFrom"]');
            const to = range.querySelector('input[name="totalTo"]');
            if (to.value === '') {
                return data.filter(item => item.total >= +from.value)
            }
            return data.filter(item => item.total >= +from.value)
        .filter(item => item.total <= +to.value)
        }
        const resultData = dataFilter(data)

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return resultData.filter(row => compare(row, state));
    }
}
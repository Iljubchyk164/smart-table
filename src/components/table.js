import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
    if (before && before.length > 0) {
        before.reverse().forEach(item => {
            root[item] = cloneTemplate(item);
            root.container.prepend(root[item].container)
        })
    }

    if (after && after.length > 0) {
        after.forEach(item => {
            root[item] = cloneTemplate(item);
            root.container.append(root[item].container)
        })
    }

    // @todo: #1.3 —  обработать события и вызвать onAction()
    root.container.addEventListener('change', e => onAction())
    root.container.addEventListener('reset', e => setTimeout(() => {onAction()}, 0))
    root.container.addEventListener('submit', e => {
        e.preventDefault();
        onAction(e.submitter)
    })

    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate)
            Object.keys(item).forEach(key => {
                if (row.elements && row.elements[key]) {
                    row.elements[key].textContent = item[key]
                }
            })
            return row.container;
        })
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}

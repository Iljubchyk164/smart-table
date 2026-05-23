
export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор



    /*const compareDate = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringIncludes', 'caseInsensitiveStringIncludes', 'stringExactMatch']);
    const compareCustomer = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringIncludes', 'caseInsensitiveStringIncludes', 'stringExactMatch']);
    const compareSeller = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringIncludes', 'caseInsensitiveStringIncludes', 'stringExactMatch']);
    const compareTotal = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringExactMatch', 'numericTolerance']);*/


    return (query, state, action) => { // result заменили на query
        return state[searchField] ? Object.assign({}, query, { // проверяем, что в поле поиска было что-то введено
            search: state[searchField] // устанавливаем в query параметр
        }) : query; // если поле с поиском пустое, просто возвращаем query без изменений
    }
}
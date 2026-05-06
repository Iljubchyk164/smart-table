import {rules, createComparison} from "../lib/compare.js";

const compare = createComparison([], [rules.searchMultipleFields('search', ['customer', 'seller', 'date', 'total'], false)])
export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор



    /*const compareDate = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringIncludes', 'caseInsensitiveStringIncludes', 'stringExactMatch']);
    const compareCustomer = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringIncludes', 'caseInsensitiveStringIncludes', 'stringExactMatch']);
    const compareSeller = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringIncludes', 'caseInsensitiveStringIncludes', 'stringExactMatch']);
    const compareTotal = createComparison(['skipNonExistentSourceFields', 'skipEmptyTargetValues', 'stringExactMatch', 'numericTolerance']);*/

    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const search = document.querySelector('input[name="search"]')
        function dataSearch(data) {
            if (search.value === '') {
                return data
            }
            return data.filter(row => compare(row, state))
        }
        const resultData = dataSearch(data)
        return resultData

    }
}
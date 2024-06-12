/**
 * Adds, updates, or removes a parameter in the current URL without refreshing the page.
 * @param {string} param - The name of the parameter to add, update, or remove.
 * @param {string|null} value - The value of the parameter. If set to `null`, the parameter will be removed.
 * @returns {string} The modified URL.
 */
export function shallowUpdateUrlParameter(param, value) {
    const urlParams = new URLSearchParams(window.location.search);
    if (value === null) {
        urlParams.delete(param);
    } else {
        urlParams.set(param, value);
    }

    const baseUrl = window.location.pathname;
    const newParams = urlParams.toString();
    const newUrl = baseUrl + (newParams ? '?' + newParams : '');

    window.history.pushState({ path: newUrl }, '', newUrl);
    return newUrl;
}

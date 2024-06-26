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

/**
 * Retrieves the value of a specified cookie.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} The value of the cookie if found, otherwise `null`.
 */
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

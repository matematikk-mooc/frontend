import multilanguage from "./previous-lang-utils";
/**
 * Cleans a string to extract content based on a specified language code.
 * @param {string} label - The input string containing language-specific content.
 * @param {string} param - The language code ('nb' or 'nn') to match.
 * @returns {string} The extracted content based on the specified language code, the first alternative, or the label as is.
 */
export function extractLabelForSelectedLanguage(label, param) {
  // Check if the label contains language codes or separators.
  if (/\w\w:/.test(label)) {
    // Define a regular expression pattern to match the desired language code and text.
    const pattern = new RegExp(`${param}: (.+?)(?:\\||$)`);

    // Execute the regular expression to find the matching content.
    const match = pattern.exec(label);

    // Check if a match was found.
    if (match) {
      // Extract and return the matched text.
      return match[1];
    }

    // Check if there are alternative languages.
    const alternatives = label.split("|");
    if (alternatives.length > 1) {
      // Return the content of the first alternative.
      const firstAlternative = alternatives[0].trim();
      // Remove any leading language code if present.
      return firstAlternative.replace(/^\w\w:/, "").trim();
    }
  }

  // If there's no language codes or matches, return the label as is.
  return label;
}

export function getSelectedLanguage() {
  return multilanguage.getLanguageParameter();
  
}

export function getLanguageCode() {
   multilanguage.getLanguageCode() ?? 'nb'
  
}

export function setLanguageParameter(lang) {
  multilanguage.setActiveLanguage(lang)
}


/**
 * Cleans a string to extract content based on a specified language code.
 * @param {string} label - The input string containing language-specific content.
 * @param {string} param - The language code ('nb' or 'nn') to match.
 * @returns {string} The extracted content based on the specified language code.
 */
function extractLabelForSelectedLanguage(label, param) {
  // Define a regular expression pattern to match the desired language code and text.
  const pattern = new RegExp(`${param}: (.+?)(?:\\||$)`);

  // Execute the regular expression to find the matching content.
  const match = pattern.exec(label);

  // Check if a match was found.
  if (match) {
    // Extract and return the matched text.
    return match[1];
  }

  // Return the label, if it is not multilang.
  return label;
}

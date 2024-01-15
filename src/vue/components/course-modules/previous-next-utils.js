export function findPreviousAndNext(allPages, currentPageId) {
    const index = allPages.findIndex(page => page.id === currentPageId);
  if (index !== -1) {
        const previousPageUrl = index > 0 ? allPages[index - 1].url : null;
        const nextPageUrl = index < allPages.length - 1 ? allPages[index + 1].url : null;

        return { previousPageUrl, nextPageUrl };
    }

    // CurrentPage is  not found in the array
    return { previousPageUrl:null, nextPageUrl:null };
}

export function extractCurrentCoursePageIdFromUrl() {
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  const currentPageId = urlParams.get('module_item_id')
  return currentPageId ? Number(currentPageId) : null;

}

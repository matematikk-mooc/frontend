
export function countPagesAndCompleted(entry) {
  let totalPages = 0;
  let completedPages = 0;
  const pages = [];

  function processNode(node) {
    if (node.type === 'page' || node.type === 'discussion' || node.type === 'quiz') {
      if ("isCompleted" in node) {
        totalPages++;
      }

      if (node.isCompleted) {
        completedPages++;
      }

      pages.push(node);
    }
    else if (node.type === 'module') {
      node.nodes.forEach((child) => processNode(child));
    }
  }

  processNode(entry);

  return {
    id: entry.id,
    totalPages,
    completedPages,
    pages
  };
}

export function completedPagesForAllModules(modulesCompletedCount) {
  let totalPages = 0;
  let completedPages = 0;
  let completedModules = 0;
  modulesCompletedCount.forEach(module => {
    if (module.totalPages > 0 && module.totalPages === module.completedPages) {
      completedModules++
    }
    totalPages += module.totalPages
    completedPages += module.completedPages
  })
  return {
    totalPages,
    completedPages,
    completedModules,
    totalModules: modulesCompletedCount.length
  }
}

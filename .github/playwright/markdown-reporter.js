const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(
  __dirname,
  '../../playwright-report/results.json',
);

function removeAnsiCodes(str) {
  if (!str) return str;
  return str.replace(/\u001b\[[0-9;]*m/g, '');
}

function extractErrorMessage(error) {
  if (!error || !error.message) return 'None';
  const cleanMessage = removeAnsiCodes(error.message);
  const match = cleanMessage.match(/Error: (.+?)(\n|$)/);
  return match ? match[1].trim() : 'Unknown Error';
}

function extractLog(logArray) {
  if (!Array.isArray(logArray) || logArray.length === 0)
    return 'No detailed log available.';
  return logArray.map((log) => `       ${removeAnsiCodes(log)}`).join('\n');
}

function generateMarkdownReport(data) {
  let markdown = `# 🎭 Playwright Test Results\n\n`;

  const stats = data.stats;
  const runnerCount = data.config.metadata.actualWorkers || 1;
  const formattedDuration = Math.round(stats.duration);
  markdown += `## 📊 Summary\n`;
  markdown += `| Metric         | Value              |\n`;
  markdown += `|----------------|--------------------|\n`;
  markdown += `| **Total Tests** | ${stats.expected + stats.unexpected} 🧪         |\n`;
  markdown += `| **Passed**      | ${stats.expected} ✅             |\n`;
  markdown += `| **Failed**      | ${stats.unexpected} ❌           |\n`;
  markdown += `| **Duration**    | ${formattedDuration}ms ⏱️ |\n`;
  markdown += `| **Runners**     | ${runnerCount} 🏃‍♂️          |\n\n`;

  markdown += `## 📝 Test Results\n`;

  data.suites.forEach((suite) => {
    markdown += `### 🗂️ Suite: ${suite.title}\n\n`;
    markdown += `| Runner  | Test Title           | Status       | Duration | Message                          |\n`;
    markdown += `|---------|----------------------|--------------|----------|----------------------------------|\n`;

    let errorLogs = '';
    suite.specs.forEach((spec) => {
      spec.tests.forEach((test) => {
        const statusIcon =
          test.status === 'expected' ? '✅ Passed' : '❌ Failed';
        const duration = `${test.results[0].duration}ms`;
        const runnerId = `#${test.results[0].workerIndex + 1}`;
        const message = extractErrorMessage(test.results[0].error);

        markdown += `| ${runnerId} | ${spec.title} | ${statusIcon} | ${duration} | ${message} |\n`;

        if (test.status !== 'expected') {
          const log = extractLog(test.results[0].error?.matcherResult?.log);
          errorLogs += `##### ❌ ${spec.title}\n\`\`\`\n${log}\n\`\`\`\n\n`;
        }
      });
    });

    if (errorLogs) {
      markdown += `\n#### Error Logs\n\n${errorLogs}`;
    }

    markdown += `\n`;
  });

  return markdown;
}

fs.readFile(jsonFilePath, 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }
  try {
    const jsonData = JSON.parse(jsonString);
    const markdownReport = generateMarkdownReport(jsonData);

    const outputFilePath = path.join(
      __dirname,
      '../../playwright-report/report.md',
    );
    fs.writeFileSync(outputFilePath, markdownReport);
    console.log('Markdown report generated:', outputFilePath);
  } catch (parseErr) {
    console.error('Error parsing JSON data:', parseErr);
  }
});

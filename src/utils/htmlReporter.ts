import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../base/logger';

/**
 * Extended HTML Reporter with logging and screenshot integration
 */
export class HTMLReporter {
  private logger: Logger;
  private reportDir: string;
  private testResults: any[] = [];
  private screenshotDir: string;

  constructor(reportDir: string = './reports', screenshotDir: string = './screenshots') {
    this.logger = new Logger();
    this.reportDir = reportDir;
    this.screenshotDir = screenshotDir;

    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  /**
   * Add test result
   */
  addTestResult(result: {
    testName: string;
    status: 'PASSED' | 'FAILED' | 'SKIPPED';
    duration: number;
    screenshots?: string[];
    logs?: any[];
    error?: string;
  }): void {
    this.testResults.push({
      ...result,
      timestamp: new Date().toISOString()
    });
    this.logger.info(`Test result added: ${result.testName} - ${result.status}`);
  }

  /**
   * Generate HTML report
   */
  generateReport(): string {
    const reportPath = path.join(this.reportDir, `report-${Date.now()}.html`);
    const html = this.buildHTMLContent();

    try {
      fs.writeFileSync(reportPath, html);
      this.logger.info(`HTML report generated: ${reportPath}`);
      return reportPath;
    } catch (error) {
      this.logger.error(`Failed to generate HTML report: ${error}`);
      throw error;
    }
  }

  /**
   * Build HTML content
   */
  private buildHTMLContent(): string {
    const passedCount = this.testResults.filter(r => r.status === 'PASSED').length;
    const failedCount = this.testResults.filter(r => r.status === 'FAILED').length;
    const skippedCount = this.testResults.filter(r => r.status === 'SKIPPED').length;
    const totalDuration = this.testResults.reduce((sum, r) => sum + r.duration, 0);

    const testResultsHTML = this.testResults.map((result, index) => `
      <div class="test-result ${result.status.toLowerCase()}">
        <div class="test-header">
          <span class="test-name">${result.testName}</span>
          <span class="test-status ${result.status.toLowerCase()}">${result.status}</span>
          <span class="test-duration">${result.duration}ms</span>
        </div>
        ${result.error ? `<div class="test-error"><strong>Error:</strong> ${result.error}</div>` : ''}
        ${result.logs ? `<div class="test-logs"><strong>Logs:</strong>${this.formatLogs(result.logs)}</div>` : ''}
        ${result.screenshots ? `<div class="test-screenshots"><strong>Screenshots:</strong>${this.formatScreenshots(result.screenshots)}</div>` : ''}
      </div>
    `).join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Automation Test Report</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
        }

        .header h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .header p {
          font-size: 1.1em;
          opacity: 0.9;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 40px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .summary-card h3 {
          color: #667eea;
          font-size: 0.9em;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .summary-card .value {
          font-size: 2.5em;
          font-weight: bold;
          color: #333;
        }

        .summary-card.passed .value {
          color: #4caf50;
        }

        .summary-card.failed .value {
          color: #f44336;
        }

        .summary-card.skipped .value {
          color: #ff9800;
        }

        .content {
          padding: 40px;
        }

        .content h2 {
          color: #333;
          margin-bottom: 20px;
          font-size: 1.8em;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }

        .test-result {
          margin-bottom: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }

        .test-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #f5f5f5;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .test-header:hover {
          background: #ebebeb;
        }

        .test-name {
          flex: 1;
          font-weight: 600;
          color: #333;
        }

        .test-status {
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.85em;
          text-transform: uppercase;
          margin: 0 10px;
        }

        .test-status.passed {
          background: #c8e6c9;
          color: #2e7d32;
        }

        .test-status.failed {
          background: #ffcdd2;
          color: #c62828;
        }

        .test-status.skipped {
          background: #ffe0b2;
          color: #e65100;
        }

        .test-duration {
          color: #666;
          font-size: 0.9em;
          margin: 0 10px;
          min-width: 80px;
          text-align: right;
        }

        .test-error {
          padding: 15px;
          background: #ffebee;
          color: #c62828;
          border-top: 1px solid #ef9a9a;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .test-logs {
          padding: 15px;
          background: #f0f4ff;
          border-top: 1px solid #c5cae9;
          max-height: 300px;
          overflow-y: auto;
        }

        .test-logs strong {
          display: block;
          margin-bottom: 10px;
          color: #3f51b5;
        }

        .log-entry {
          padding: 5px 0;
          font-family: 'Courier New', monospace;
          font-size: 0.85em;
          color: #555;
          border-bottom: 1px solid #ddd;
        }

        .log-entry:last-child {
          border-bottom: none;
        }

        .log-entry.info {
          color: #1976d2;
        }

        .log-entry.error {
          color: #d32f2f;
        }

        .log-entry.warn {
          color: #f57f17;
        }

        .test-screenshots {
          padding: 15px;
          background: #f5f5f5;
          border-top: 1px solid #e0e0e0;
        }

        .test-screenshots strong {
          display: block;
          margin-bottom: 10px;
          color: #333;
        }

        .screenshot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 10px;
        }

        .screenshot-item {
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .screenshot-item:hover {
          transform: scale(1.05);
        }

        .screenshot-item img {
          width: 100%;
          height: auto;
          display: block;
        }

        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          border-top: 1px solid #e0e0e0;
        }

        @media (max-width: 768px) {
          .summary {
            grid-template-columns: 1fr;
          }

          .test-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .test-status,
          .test-duration {
            margin: 5px 0;
          }

          .screenshot-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Automation Test Report</h1>
          <p>Comprehensive Test Execution Summary</p>
        </div>

        <div class="summary">
          <div class="summary-card passed">
            <h3>Passed</h3>
            <div class="value">${passedCount}</div>
          </div>
          <div class="summary-card failed">
            <h3>Failed</h3>
            <div class="value">${failedCount}</div>
          </div>
          <div class="summary-card skipped">
            <h3>Skipped</h3>
            <div class="value">${skippedCount}</div>
          </div>
          <div class="summary-card">
            <h3>Total Tests</h3>
            <div class="value">${this.testResults.length}</div>
          </div>
          <div class="summary-card">
            <h3>Total Duration</h3>
            <div class="value">${(totalDuration / 1000).toFixed(2)}s</div>
          </div>
          <div class="summary-card">
            <h3>Success Rate</h3>
            <div class="value">${this.testResults.length > 0 ? ((passedCount / this.testResults.length) * 100).toFixed(2) : 0}%</div>
          </div>
        </div>

        <div class="content">
          <h2>Test Results</h2>
          ${testResultsHTML}
        </div>

        <div class="footer">
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p>Playwright Automation Framework with Cucumber & Extended HTML Reports</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Format logs for HTML
   */
  private formatLogs(logs: any[]): string {
    return logs.map(log => `
      <div class="log-entry ${log.level?.toLowerCase() || 'info'}">
        [${log.timestamp}] [${log.level}] ${log.message}
      </div>
    `).join('');
  }

  /**
   * Format screenshots for HTML
   */
  private formatScreenshots(screenshots: string[]): string {
    if (screenshots.length === 0) return '<p>No screenshots</p>';

    return `
      <div class="screenshot-grid">
        ${screenshots.map(screenshot => `
          <div class="screenshot-item">
            <img src="${screenshot}" alt="Screenshot" title="${screenshot}">
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Get test results
   */
  getTestResults(): any[] {
    return this.testResults;
  }

  /**
   * Clear results
   */
  clearResults(): void {
    this.testResults = [];
  }
}

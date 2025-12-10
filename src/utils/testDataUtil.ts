import * as fs from 'fs';
import * as path from 'path';

/**
 * Test data generator and manager
 */
export class TestDataUtil {
  private testDataDir: string;

  constructor(testDataDir: string = './test-data') {
    this.testDataDir = testDataDir;
    if (!fs.existsSync(this.testDataDir)) {
      fs.mkdirSync(this.testDataDir, { recursive: true });
    }
  }

  /**
   * Generate IRCTC test data
   */
  generateIRCTCTestData(): any {
    return {
      users: [
        {
          username: process.env.IRCTC_USERNAME || 'testuser@example.com',
          password: process.env.IRCTC_PASSWORD || 'TestPassword123',
          role: 'user'
        }
      ],
      bookingData: [
        {
          fromStation: 'Delhi',
          toStation: 'Mumbai',
          date: this.getFutureDate(5),
          class: 'AC First Class',
          quota: 'General',
          passengers: [
            {
              name: 'John Doe',
              age: '30',
              gender: 'Male',
              berthPreference: 'Lower'
            }
          ]
        },
        {
          fromStation: 'Bangalore',
          toStation: 'Chennai',
          date: this.getFutureDate(7),
          class: 'Sleeper Class',
          quota: 'General',
          passengers: [
            {
              name: 'Jane Smith',
              age: '28',
              gender: 'Female',
              berthPreference: 'Upper'
            }
          ]
        }
      ]
    };
  }

  /**
   * Get future date
   */
  private getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  /**
   * Save test data to file
   */
  saveTestData(fileName: string, data: any): string {
    const filePath = path.join(this.testDataDir, `${fileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return filePath;
  }

  /**
   * Load test data from file
   */
  loadTestData(fileName: string): any {
    const filePath = path.join(this.testDataDir, `${fileName}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Test data file not found: ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  /**
   * Get test data directory
   */
  getTestDataDir(): string {
    return this.testDataDir;
  }
}

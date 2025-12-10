import * as fs from 'fs';
import * as path from 'path';

/**
 * File utility for reading and writing test data
 */
export class FileUtil {
  /**
   * Read JSON file
   */
  static readJSON(filePath: string): any {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to read JSON file: ${filePath}. Error: ${error}`);
    }
  }

  /**
   * Write JSON file
   */
  static writeJSON(filePath: string, data: any): void {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(`Failed to write JSON file: ${filePath}. Error: ${error}`);
    }
  }

  /**
   * Read CSV file
   */
  static readCSV(filePath: string): string[][] {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content.split('\n').map(line => line.split(','));
    } catch (error) {
      throw new Error(`Failed to read CSV file: ${filePath}. Error: ${error}`);
    }
  }

  /**
   * Check if file exists
   */
  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Delete file
   */
  static deleteFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      throw new Error(`Failed to delete file: ${filePath}. Error: ${error}`);
    }
  }

  /**
   * Create directory
   */
  static createDirectory(dirPath: string): void {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      throw new Error(`Failed to create directory: ${dirPath}. Error: ${error}`);
    }
  }
}

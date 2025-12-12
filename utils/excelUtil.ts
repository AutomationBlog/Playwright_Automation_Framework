import xlsx from 'xlsx';

export function readExcel(filePath: string, sheetName?: string) {
  const wb = xlsx.readFile(filePath);
  const name = sheetName || wb.SheetNames[0];
  const sheet = wb.Sheets[name];
  return xlsx.utils.sheet_to_json(sheet);
}

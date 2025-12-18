import * as ExcelJS from 'exceljs';

export default async function readExcel(filePath: string, sheetName?: string) {
  const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) throw new Error(`Sheet ${sheetName} not found`);

        const data: any[] = [];
        
        // The first row is usually the header
        const headerRow = worksheet.getRow(1).values as string[];

        worksheet.eachRow((row, rowNumber) => {
            // Skip the header row
            if (rowNumber > 1) {
                const rowData: any = {};
                row.eachCell((cell, colNumber) => {
                    const columnHeader = headerRow[colNumber];
                    rowData[columnHeader] = cell.value;
                });
                data.push(rowData);
            }
        });

        return data;
    }

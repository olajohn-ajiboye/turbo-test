// Function to convert data array to CSV format
export const convertToCSV = (data: Array<Record<string, any>>): string => {
  const headers = Object.keys(data[0]).join(','); // Extract headers from the first item
  const rows = data.map(order => Object.values(order).join(',')).join('\n'); // Map each row of data to CSV format
  return `${headers}\n${rows}`; // Join headers and rows with newlines
};

// Function to download the CSV as a file
export const downloadCSV = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

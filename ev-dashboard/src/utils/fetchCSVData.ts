import Papa from 'papaparse';

export const fetchCSVData = async () => {
  const response = await fetch('/Electric_Vehicle_Population_Data.csv');
  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';

  if (reader) {
    const { value } = await reader.read();
    result += decoder.decode(value);
  }

  return new Promise((resolve, reject) => {
    Papa.parse(result, {
      header: true,
      complete: (parsedData) => resolve(parsedData.data),
      error: (error:any) => reject(error),
    });
  });
};

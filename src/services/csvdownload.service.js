// This is going to be a general template for downloading as CSV.


export const downloadCsv = (data) => {
  const csvPrefix = 'data:text/csv;charset=utf-8,';
  console.log(data);
  const escape = text =>
    text.replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")

  let escaped_array = data.map(fields => fields.map(escape));
  let csvData = csvPrefix + escaped_array.map(row => row.join(', ')).join('\n ');

  const encodedUri = encodeURI(csvData);
  window.open(encodedUri);

  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttributeNS('download', 'data.csv');
  document.body.appendChild(link);

  link.click();
}

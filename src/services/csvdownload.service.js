// This is going to be a general template for downloading as CSV.


export const downloadCsv = (data) => {
  const csvPrefix = 'data:text/csv;charset=utf-8,';
  console.log(data);
  // let csvData = csvPrefix + data.map(row => row.join(', ')).join('\n ');
  let csvData = csvPrefix + data.map(function(d){
    return d.join();
}).join('\n');
  const encodedUri = encodeURI(csvData);
  window.open(encodedUri);

  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttributeNS('download', 'data.csv');
  document.body.appendChild(link);

  link.click();
}

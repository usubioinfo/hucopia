// This is going to be a general template for downloading as CSV.


export const downloadCsv = (data) => {
  const csvPrefix = 'data:text/csv;charset=utf-8,';
  const data2 = data.filter(element => {
    return element;
  });
  // let csvData = csvPrefix + data.map(row => row.join(', ')).join('\n ');
  let csvData = csvPrefix + data2.map(function(d){
    return JSON.stringify(Object.values(d));
})
.join('\n') 
.replace(/(^\[)|(\]$)/mg, '');

  console.log(csvData);
  const encodedUri = encodeURI(csvData);
  window.open(encodedUri);

  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);

  link.click();
}

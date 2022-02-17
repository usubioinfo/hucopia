// This is going to be a general template for downloading as CSV.


export const downloadCsv = (data) => {
  const csvPrefix = 'data:text/csv;charset=utf-8,';
  
  const csvString = [
    ...data.map(item => [
      item.pathogen,
      item.pathogenProtein,
      item.isolate,
      item.pLength,
      item.gene,
      item.hLength,
      item.interactionType,
      item.interactionCategory,
      item.tissueExpression
    ])
  ];

  console.log(csvString);

  // let csvData = csvPrefix + data.map(row => row.join(', ')).join('\n ');
  let csvData = csvPrefix + data.map(function(d){
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


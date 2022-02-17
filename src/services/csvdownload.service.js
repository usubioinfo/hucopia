// This is going to be a general template for downloading as CSV.


export const downloadCsv = (data, tid) => {
   
  const csvPrefix = 'data:text/csv;charset=utf-8,';
  if (tid === "tissue"){
    var csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "H-Protein Length",
        "Interaction Type",
        "Interaction Category",
        "Tissue"
      ],
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
    ].map(e => e.join(",")).join("\n");
     console.log(csvString);
  }
  else{
    console.log("hello");
  }



 

  let csvData = csvPrefix + csvString
//   let csvData = csvPrefix + data.map(function(d){
//     return JSON.stringify(Object.values(d));
// })
// .join('\n') 
// .replace(/(^\[)|(\]$)/mg, '');

  // console.log(csvData);
  const encodedUri = encodeURI(csvData);
  // window.open(encodedUri);

  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);

  link.click();
}


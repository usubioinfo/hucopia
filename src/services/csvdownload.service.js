// This is going to be a general template for downloading as CSV.


export const downloadCsv = (data, tid) => {
   
  const csvPrefix = 'data:text/csv;charset=utf-8,';
  var csvString =[];
  if (tid === "tissue"){
    csvString = [
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
  if (tid === "location"){
    csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "H-Protein Length",
        "Interaction Type",
        "Interaction Category",
        "Localization"
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
        item.location
      ])
    ].map(e => e.join(",")).join("\n");
     console.log(csvString);
  }

  if (tid === "go"){
      csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "H-Protein Length",
        "Interaction Type",
        "Interaction Category",
        "GO ID",
        "GO Description"
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
        item.goId,
        item.description
      ])
    ].map(e => e.join(",")).join("\n");
     console.log(csvString);
  }

  if (tid === "kegg"){
    csvString = [
    [
      "Pathogen",
      "Pathogen Protein",
      "Pathogen Isolate",
      "P-Protein Length",
      "Human Gene",
      "H-Protein Length",
      "Interaction Type",
      "Interaction Category",
      "KEGG ID",
      "KEGG Description"
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
      item.keggId,
      item.description
    ])
  ].map(e => e.join(",")).join("\n");
   console.log(csvString);
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


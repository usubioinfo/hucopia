// This is going to be a general template for downloading as CSV.

export const downloadCsv = (data, tid) => {
  const csvPrefix = "data:text/csv;charset=utf-8,";
  var csvString = [];
  if (tid === "tissue") {
    csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "Human Protein",
        "H-Protein Length",
        "Tissue",
        "Pathogen Interactor",
        "Human Interactor",
        "Confidence",
        "Interaction Type",
        "Interaction Category",
        "Publication"
        
      ],
      ...data.map((item) => [
        item.pathogen,
        item.pathogenProtein,
        item.isolate,
        item.pLength,
        item.gene,
        item.humanProtein,
        item.hLength,
        item.tissueExpression,
        item.pInteractor,
        item.hInteractor,
        item.confidence,
        item.interactionType,
        item.interactionCategory,
        item.publication
        
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    //  console.log(csvString);
  }
  if (tid === "location") {
    csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "Human Protein",
        "H-Protein Length",
        "Localization",
        "Pathogen Interactor",
        "Human Interactor",
        "Confidence",
        "Interaction Type",
        "Interaction Category",
        "Publication"
        
      ],
      ...data.map((item) => [
        item.pathogen,
        item.pathogenProtein,
        item.isolate,
        item.pLength,
        item.gene,
        item.humanProtein,
        item.hLength,
        item.location,
        item.pInteractor,
        item.hInteractor,
        item.confidence,
        item.interactionType,
        item.interactionCategory,
        item.publication
        
        
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    //  console.log(csvString);
  }

  if (tid === "go") {
    csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "Human Protein",
        "H-Protein Length",
        "GO ID",
        "GO Description",
        "FDR",
        "Pathogen Interactor",
        "Human Interactor",
        "Confidence",
        "Interaction Type",
        "Interaction Category",
        "Publication"
        
      ],
      ...data.map((item) => [
        item.pathogen,
        item.pathogenProtein,
        item.isolate,
        item.pLength,
        item.gene,
        item.humanProtein,
        item.hLength,
        item.goId,
        item.description,
        item.fdr,
        item.pInteractor,
        item.hInteractor,
        item.confidence,
        item.interactionType,
        item.interactionCategory,
        item.publication
       
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    //  console.log(csvString);
  }

  if (tid === "kegg") {
    csvString = [
      [
        "Pathogen",
        "Pathogen Protein",
        "Pathogen Isolate",
        "P-Protein Length",
        "Human Gene",
        "Human Protein",
        "H-Protein Length",
        "KEGG ID",
        "KEGG Description",
        "FDR",
        "Pathogen Interactor",
        "Human Interactor",
        "Confidence",
        "Interaction Type",
        "Interaction Category",
        "Publication"
      ],
      ...data.map((item) => [
        item.pathogen,
        item.pathogenProtein,
        item.isolate,
        item.pLength,
        item.gene,
        item.humanProtein,
        item.hLength,
        item.keggId,
        item.description,
        item.fdr,
        item.pInteractor,
        item.hInteractor,
        item.confidence,
        item.interactionType,
        item.interactionCategory,
        item.publication
      
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    //  console.log(csvString);
  }

  let csvData = csvPrefix + csvString;

  const encodedUri = encodeURI(csvData);
  // window.open(encodedUri);

  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "HuCoPIA_results.csv");
  document.body.appendChild(link);

  link.click();
};

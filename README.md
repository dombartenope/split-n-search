## Add the input CSV in and name it "in.csv", this can be any size file as the script will adjust files too large to max out at 1,000,000 rows

#### Follow these steps : 
1. At the top of the file change the string for the variable to match your search term: 
`const SEARCH_FOR = "<Search for this>";`
2. Run `npm start` (all modulees are native to node so no need to `npm install`)
3. Files will output at in the directory if a split is needed, and the "out.csv" will contain the result

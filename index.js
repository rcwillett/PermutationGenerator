import readline from 'node:readline';

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '/', '?', '~', '`', '_'];

const getStringCapitalizationVariations = (str) => {
    console.log(str);
    return [str.toUpperCase(), str.toLowerCase(), str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase()];
};

const generatePermutations = ({inputMatrix, colIndex=0, result='', resultSize=0, resultArray=[]}) => {
    if (resultSize === inputMatrix.length) {
        resultArray.push(result);
    } else {
        const newIndex = (1 + colIndex) % inputMatrix.length;
        for (let j = 0; j < inputMatrix[newIndex].length; j++) {
            generatePermutations({inputMatrix, colIndex: newIndex, result: result + inputMatrix[newIndex][j], resultSize: resultSize + 1, resultArray});
        }
    }
    return resultArray;
};

input.question("Enter space separated array of possible string values:", (stringInput) => {
    const stringInputArray = stringInput.split(" ");
    const stringValues = stringInputArray.reduce((acc, value) => {
        const stringCapitalizations = getStringCapitalizationVariations(value);
        return [...acc, ...stringCapitalizations];
    }, []);

    input.question("Enter space separated array of possible numerical values:", (numInput) => {
        const numInputArray = numInput.split(" ");
        const numValues = numInputArray.filter((value) => /\d+/.test(value)).map((value) => parseInt(value));

        input.question("Symbols required? (Y/n)", (selection) => {
            const symbolsRequired = selection === 'Y' || selection === 'y' || !selection;
            let results = [];
            if (symbolsRequired) {
                const inputMatrix = [stringValues, numValues, symbols];
                for (let i = 0; i < inputMatrix.length; i++) {
                    results = [...results, ...generatePermutations({ inputMatrix, colIndex: i })];
                }
            } else {
                const inputMatrix = [stringValues, numValues];
                for (let i = 0; i < inputMatrix.length; i++) {
                    results = [...results, ...generatePermutations({ inputMatrix, colIndex: i })];
                }
            }
            for (let result of results) {
                console.log(result);
            }
            input.close();
        });
    });
});
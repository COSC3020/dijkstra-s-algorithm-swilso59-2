// code.test.js
const fs = require('fs');
const jsc = require('jsverify');

// Dynamically load the dijkstra function from code.js
eval(fs.readFileSync('./code.js') + '');

// Hardcoded test cases for verification
const graph1 = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};
const expected1 = { A: 0, B: 1, C: 3, D: 4 };

const emptyGraph = {}; 
const expectedEmptyGraph = {};

// Graph with duplicate nodes and weights
const graphWithDuplicates = {
    A: { B: 5, C: 5 },
    B: { A: 5, C: 2, D: 2 },
    C: { A: 5, B: 2, D: 1 },
    D: { B: 2, C: 1 }
};
const expectedWithDuplicates = { A: 0, B: 5, C: 5, D: 6 };

// Isolated node
const graphWithIsolatedNode = {
    A: { B: 3 },
    B: { A: 3 },
    C: {}
};
const expectedWithIsolatedNode = { A: 0, B: 3, C: Infinity };

// Function to validate results
function runTests() {
    const testCases = [
        { graph: graph1, source: 'A', expected: expected1 },
        { graph: emptyGraph, source: 'A', expected: expectedEmptyGraph },
        { graph: graphWithDuplicates, source: 'A', expected: expectedWithDuplicates },
        { graph: graphWithIsolatedNode, source: 'A', expected: expectedWithIsolatedNode }
    ];

    testCases.forEach(({ graph, source, expected }, index) => {
        const result = dijkstra(graph, source);
        if (JSON.stringify(result) !== JSON.stringify(expected)) {
            console.error(`Hardcoded Test ${index + 1} failed. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`);
        } else {
            console.log(`Hardcoded Test ${index + 1} passed.`);
        }
    });
}

// Run tests
runTests();


import React, { useState } from 'react';
import './App.scss';
import './Sudoku.scss';
import { solveGrid } from './SudokuLogic';

const sudoku = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
];

function App() {
    const [activeGrid, setActiveGrid] = useState(
        // We map through and return the sliced rows
        // This is to clone the base grid without a reference
        // Otherwise (with a reference), every change made to the activeGrid would
        // also affect the base grid
        sudoku.map((row) => {
            return row.slice();
        })
    );

    const renderGrid = (grid) => (
        <div className="sudoku-grid">
            {grid?.map((row, rowIndex) => {
                return (
                    <div className="row" key={`row-${rowIndex}`}>
                        {row?.map((cell, cellIndex) => (
                            <div
                                className={`cell ${
                                    sudoku[rowIndex][cellIndex] !== 0
                                        ? 'pre-filled'
                                        : ''
                                }`}
                                key={`cell-${row}-${cellIndex}`}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="App">
            {activeGrid && (
                <div className="sudoku-wrapper">{renderGrid(activeGrid)}</div>
            )}
            <button
                className="action solve"
                onClick={() => {
                    var startTime = new Date().getTime();

                    // We use the spread operator to create a new array object
                    // If we change the values but don't actually modify the array object
                    // React won't fire a proper state update and the
                    // hooks won't work, nor will the Dom rerender
                    setActiveGrid([...solveGrid(activeGrid)]);

                    var endTime = new Date().getTime();

                    console.log(`Solved in ${endTime - startTime} ms`);
                }}
            >
                Solve
            </button>
        </div>
    );
}

export default App;

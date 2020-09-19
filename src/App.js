import React, { useState } from 'react';
import './App.scss';
import './Sudoku.scss';
import { solveGrid } from './SudokuLogic';

const gridToSolve = [
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
    const [grid, setGrid] = useState(gridToSolve);

    const renderGrid = (grid) => (
        <div className="sudoku-grid">
            {grid?.map((row, rowIndex) => {
                return (
                    <div className="row" key={`row-${rowIndex}`}>
                        {row?.map((cell, cellIndex) => (
                            <div
                                className="cell"
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
            {grid && <div className="sudoku-wrapper">{renderGrid(grid)}</div>}
            <button
                className="action solve"
                onClick={() => {
                    let solvedGrid = solveGrid(gridToSolve, gridToSolve);
                    console.log(solvedGrid);
                    setGrid(solvedGrid);
                }}
            >
                Solve
            </button>
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import './App.scss';
import './Sudoku.scss';
import { solveGrid } from './SudokuLogic';

function App() {
    const [sudokuToSolve, setSudukoToSolve] = useState(null);
    const [activeGrid, setActiveGrid] = useState(null);

    const renderGrid = (grid) => (
        <div className="sudoku-grid">
            {grid?.map((row, rowIndex) => {
                return (
                    <div className="row" key={`row-${rowIndex}`}>
                        {row?.map((cell, cellIndex) => (
                            <div
                                className={`cell ${
                                    sudokuToSolve[rowIndex][cellIndex] !== 0
                                        ? 'pre-filled'
                                        : ''
                                }`}
                                key={`cell-${row}-${cellIndex}`}
                            >
                                <span>{cell}</span>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );

    const handleFileSelect = (evt) => {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (function () {
            return function (e) {
                try {
                    let json = JSON.parse(e.target.result);
                    setActiveGrid(json);
                    setSudukoToSolve(
                        json.map((row) => {
                            return row.slice();
                        })
                    );
                } catch (ex) {
                    alert('ex when trying to parse json = ' + ex);
                }
            };
        })(file);
        reader.readAsText(file);
    };

    return (
        <div className="App">
            <h1>Sudoku Solver</h1>
            {activeGrid && sudokuToSolve && (
                <>
                    {renderGrid(activeGrid)}
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
                </>
            )}
            <input
                type="file"
                accept="application/json"
                onChange={handleFileSelect}
                className="action upload"
            />
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={process.env.PUBLIC_URL + '/empty_sudoku.json'}
                download="empty_sudoku.json"
                className="action download"
            >
                Download an empty sudoku
            </a>
        </div>
    );
}

export default App;

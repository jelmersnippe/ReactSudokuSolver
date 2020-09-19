const checkRow = (row, valueToCheck) => {
    let validRow = true;
    if (row.find((value) => value === valueToCheck)) {
        validRow = false;
    }
    return validRow;
};

const checkColumn = (grid, cellIndex, valueToCheck) => {
    let validColumn = true;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        if (grid[rowIndex][cellIndex] === valueToCheck) {
            validColumn = false;
        }
    }

    return validColumn;
};

const getIndexesToCheck = (index) => {
    if (index < 3) return [0, 1, 2];
    else if (index < 6) return [3, 4, 5];
    else return [6, 7, 8];
};

const checkSquare = (grid, rowIndex, cellIndex, valueToCheck) => {
    const rowsToCheck = getIndexesToCheck(rowIndex);
    const cellsToCheck = getIndexesToCheck(cellIndex);
    let validSquare = true;

    rowsToCheck.forEach((x) => {
        cellsToCheck.forEach((y) => {
            if (grid[x][y] === valueToCheck) {
                validSquare = false;
            }
        });
    });

    return validSquare;
};

export const solveGrid = (baseGrid, updatedGrid) => {
    for (let rowIndex = 0; rowIndex < updatedGrid.length; rowIndex++) {
        for (
            let cellIndex = 0;
            cellIndex < updatedGrid[rowIndex].length;
            cellIndex++
        ) {
            if (baseGrid[rowIndex][cellIndex] !== 0) {
                continue;
            }

            for (let numberToTry = 1; numberToTry < 10; numberToTry++) {
                let validRow = checkRow(updatedGrid[rowIndex], numberToTry);
                let validColumn = checkColumn(
                    updatedGrid,
                    cellIndex,
                    numberToTry
                );
                let validSquare = checkSquare(
                    updatedGrid,
                    rowIndex,
                    cellIndex,
                    numberToTry
                );

                if (validRow && validColumn && validSquare) {
                    updatedGrid[rowIndex][cellIndex] = numberToTry;
                } else {
                    continue;
                }

                if (solveGrid(baseGrid, updatedGrid)) {
                    return updatedGrid;
                }
            }

            updatedGrid[rowIndex][cellIndex] = 0;

            return false;
        }
    }

    return updatedGrid;
};

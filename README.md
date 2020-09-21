### Sudoku Solver
An application that can solve 9x9 sudoku puzzles through bruteforcing. It uses the backtracking algorithm for this.\
A JSON file can be downloaded which has an empty sudoku grid in the proper format. The grid can then be filled and uploaded to the page.\
The page will display the sudoku grid and a solve button. The solve button will solve the puzzle (if possible) and display the solution.

Pre-filled tiles are marked with grey.

### JSON format

The JSON has to have the following format:
```
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
```

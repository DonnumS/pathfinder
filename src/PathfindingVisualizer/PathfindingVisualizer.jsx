import React, { Component } from "react";
import Node from "./Node/Node";
import NavBar from "../utils/NavBar";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { DFS, getShortestDFSPath } from "../algorithms/dfs";
import { BFS, getShortestBFSPath } from "../algorithms/bfs";
import { astar } from "../algorithms/a*";
import { greedyBFS } from "../algorithms/greedybfs";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      finishIsPressed: false,
      startIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  // Animates the order in which all visited nodes where visited
  animateVisited(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  // Animates the shortest path
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  // Used to visualize dijkstra, simple version
  visualizeDijkstra() {
    this.removePath(false);
    console.log("1 = Dijkstra");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisited(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Used to visualize DFS
  visualizeDFS() {
    this.removePath(false);
    console.log("2 = DFS");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = DFS(grid, startNode, finishNode, 50, 20);
    const nodesInShortestPathOrder = getShortestDFSPath(startNode, finishNode);
    this.animateVisited(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Used to visualize BFS
  visualizeBFS() {
    this.removePath(false);
    console.log("3 = BFS");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getShortestBFSPath(finishNode);
    this.animateVisited(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Used to visualize A*
  visualizeAStar() {
    this.removePath(false);
    console.log("4 = A*");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisited(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeGBFS() {
    this.removePath(false);
    console.log("4 = A*");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = greedyBFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisited(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Clears path, but currently also clears node start and finish from the board
  clearPath() {
    this.setState({ grid: [] });
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  // Used to remove path or remove path and all walls
  removePath(all) {
    const { grid } = this.state;
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const node = grid[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          grid[row][col] = createNode(col, row);
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
        } else if (grid[row][col].isWall && !all) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
        } else {
          grid[row][col] = createNode(col, row);
        }
      }
    }
  }

  // Run desired algorithm given value from dropdown menu
  runAlgo(algoNum) {
    console.log(`Run algo ${algoNum}`);
    if (algoNum == 1) {
      this.visualizeDijkstra();
    } else if (algoNum == 2) {
      this.visualizeDFS();
    } else if (algoNum == 3) {
      this.visualizeBFS();
    } else if (algoNum == 4) {
      this.visualizeAStar();
    } else if (algoNum == 5) {
      this.visualizeGBFS();
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div>
        <NavBar
          chosenAlgo={(value) => this.runAlgo(value)}
          onClearPathPressed={() => this.removePath(false)}
          onClearAllPressed={() => this.removePath(true)}
        />
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

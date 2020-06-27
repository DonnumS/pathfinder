import { Queue } from "../utils/q.js";

export function BFS(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const visitedNodesInOrder = [];
  // Init q
  var queue = new Queue();

  // Set startNode dist = 0 and add to q
  startNode.distance = 0;
  queue.enqueue(startNode);

  while (queue.length !== 0) {
    var currentNode = queue.dequeue();

    // checks for any invalid nodes
    if (typeof currentNode === "undefined") return visitedNodesInOrder;

    // Skip if node is a wall
    if (currentNode.isWall) continue;

    // Mark as visited and add to list of visited
    currentNode.distance = 0;
    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    // Return when we hit finish
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Add unvisited neighbours to q
    const unvisitedNeighbours = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbours) {
      if (!neighbor.isWall) {
        queue.enqueue(neighbor);
        neighbor.visited = true;
        neighbor.previousNode = currentNode;
        neighbor.distance = 0;
      }
    }
  }
}

// Get neighbours
export function getAllFourNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

// Get unvisited neighbours of current node
export function getUnvisitedNeighbors(node, grid) {
  var neighbors = getAllFourNeighbors(node, grid);

  // Return neighbours that have not been visited
  return neighbors.filter((neighbor) => !neighbor.visited);
}

// Get the shortest path from start to finish
export function getShortestBFSPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

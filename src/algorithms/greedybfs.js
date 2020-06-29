import Heap from "heap";
import { getUnvisitedNeighbors } from "../algorithms/bfs";
import { euclideanDistance } from "../algorithms/a*";

var yetToVisit;

export function greedyBFS(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  const visitedNodesInOrder = [];

  yetToVisit = new Heap(function (a, b) {
    return a.fCost - b.fCost;
  });

  // Init costs
  initializeCosts(grid);

  startNode.fCost = 0;
  yetToVisit.updateItem(startNode);
  yetToVisit.heapify();

  while (yetToVisit.size() > 0) {
    // Get node with lowest f cost
    const currentNode = yetToVisit.pop();

    // Check if invalid
    if (typeof currentNode === "undefined") return visitedNodesInOrder;

    // If fcost is inf, return the visited list
    if (currentNode.fCost === Infinity) return visitedNodesInOrder;

    // Skip walls
    if (currentNode.isWall) continue;

    // Mark as visited and push
    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    // Return if we are at finish
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Calculate heuristic for all unvisited neighbours
    const unvisitedNeighbours = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbours) {
      if (!neighbor.isWall) {
        const hCost = euclideanDistance(
          neighbor.col,
          finishNode.col,
          neighbor.row,
          finishNode.row
        );

        if (neighbor.fCost > hCost) {
          neighbor.fCost = hCost; //no g cost
          neighbor.previousNode = currentNode;
          yetToVisit.updateItem(neighbor);
        }
      }
    }
  }

  return visitedNodesInOrder;
}

// Init h and f costs
function initializeCosts(grid) {
  for (let row of grid) {
    for (let node of row) {
      node.fCost = Infinity;
      node.hCost = Infinity;
      yetToVisit.push(node);
    }
  }
}

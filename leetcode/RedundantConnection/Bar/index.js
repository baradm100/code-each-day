/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const nodes = {};

  const depthFirstSearch = (edgeLinkA, edgeLinkB, wasInDFS) => {
    if (wasInDFS.has(edgeLinkA)) {
      return false;
    }

    wasInDFS.add(edgeLinkA);

    return (
      edgeLinkA === edgeLinkB ||
      [...nodes[edgeLinkA]].some((e) =>
        depthFirstSearch(e, edgeLinkB, wasInDFS)
      )
    );
  };

  for (const [edgeLinkA, edgeLinkB] of edges) {
    // Checks if we have a redundant link already
    if (nodes[edgeLinkA] && nodes[edgeLinkB]) {
      if (
        nodes[edgeLinkA].has(edgeLinkB) ||
        nodes[edgeLinkB].has(edgeLinkA) ||
        depthFirstSearch(edgeLinkA, edgeLinkB, new Set())
      ) {
        return [edgeLinkA, edgeLinkB];
      }
    }

    // Init the nodes if new
    if (!nodes[edgeLinkA]) {
      nodes[edgeLinkA] = new Set();
    }

    if (!nodes[edgeLinkB]) {
      nodes[edgeLinkB] = new Set();
    }

    // Add to edge A the edge B
    nodes[edgeLinkA].add(edgeLinkB);
    // Add to edge B the edge A
    nodes[edgeLinkB].add(edgeLinkA);
  }
};

// ================== DRIVER
const res = findRedundantConnection([
  [3, 4],
  [1, 2],
  [2, 4],
  [3, 5],
  [2, 5],
]);
console.log(res);

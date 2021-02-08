class Solution(object):
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        nodes = collections.defaultdict(set)

        def depth_first_search(edge_a, edge_b, was_in_DFS):
            # Was seen - exits
            if edge_a in was_in_DFS:
                return False

            # Doing the DFS
            was_in_DFS.add(edge_a)
            if edge_a == edge_b:
                return True
            
            return any(depth_first_search(child, edge_b, was_in_DFS) for child in nodes[edge_a])

        for edge_a, edge_b in edges:
            # Check if in the nodes tree
            if edge_a in nodes and edge_b in nodes and depth_first_search(edge_a, edge_b, set()):
                return edge_a, edge_b
            
            # Adding the edges to the nodes tree
            nodes[edge_a].add(edge_b)
            nodes[edge_b].add(edge_a)
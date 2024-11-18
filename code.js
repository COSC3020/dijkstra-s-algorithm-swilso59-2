function dijkstra(graph, sourceNode) {
    // Handle edge case: if graph is empty, return an empty object
    if (Object.keys(graph).length === 0) {
        return {};
    }

    // Initialize distances to each vertex as Infinity, and source as 0
    let distances = {};
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[sourceNode] = 0;

    // Track unmarked (unvisited) nodes
    let unmarked = new Set(Object.keys(graph));

    // While there are unmarked vertices left in the graph
    while (unmarked.size > 0) {
        // Select the unmarked vertex `v` with the lowest distance
        let v = null;
        for (let node of unmarked) {
            if (v === null || distances[node] < distances[v]) {
                v = node;
            }
        }

        // If the smallest distance is still Infinity, remaining nodes are unreachable
        if (distances[v] === Infinity) break;

        // Mark `v` with distance `dist` and remove from unmarked set
        unmarked.delete(v);

        // For each edge (v, w)
        for (let neighbor in graph[v]) {
            // Calculate new distance to `w` through `v`
            let newDist = distances[v] + graph[v][neighbor];

            // Update distance for `w` if the new distance is smaller
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
            }
        }
    }

    // Return the shortest distances from the source to each node
    return distances;
}

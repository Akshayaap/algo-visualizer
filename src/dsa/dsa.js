

class Stack {
    constructor() {
        //initialize an empty array
        this.stack = [];
        this.top = -1;
        this.size = 0;
        this.isEmpty = true;



        //this bindings
        this.push = this.push.bind(this);
        this.pop = this.pop.bind(this);
        this.peek = this.peek.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.size = this.size.bind(this);
        this.clear = this.clear.bind(this);

    }


    //method to push
    push(element) {
        this.stack.push(element);
        this.top++;
        this.size++;
        this.isEmpty = false;
    }

    //method to pop
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        this.top--;
        this.size--;
        if (this.top == -1) {
            this.isEmpty = true;
        }
        return this.stack.pop();
    }

    //method to peek
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.stack[this.top];
    }

    //method to check if stack is empty
    isEmpty() {
        return this.size == 0;
    }

    //method to get size of stack
    size() {
        return this.size;
    }
    //method to clear stack
    clear() {
        this.stack = [];
        this.top = -1;
        this.size = 0;
        this.isEmpty = true;
    }

}



class Queue {
    constructor() {
        this.queue = [];
        this.front = -1;
        this.rear = -1;
        this.size = 0;
        this.isEmpty = true;

        this.enqueue = this.enqueue.bind(this);
        this.dequeue = this.dequeue.bind(this);
        this.peek = this.peek.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.clear = this.clear.bind(this);
    }

    enqueue(element) {
        this.queue.push(element);
        this.rear++;
        this.size++;
        this.isEmpty = false;
    }

    dequeue() {
        if (this.queue.isEmpty()) {
            return "Queue is empty";
        }

        this.front++;
        this.size--;
        if (this.front == this.rear) {
            this.isEmpty = true;
        }

    }

}





class Graph {

    constructor(size) {


        //initialize state information for various algorithms for graph traversals

        this.algoSupported = ['BFS', 'DFS', 'Dijkstra', 'Kruskal', 'Prims'];
        this.state = {
            //for DFS
            dfs: {
                //for storing visited nodes
                visited: [],
                //for storing the path
                path: [],
                //for storing the order of nodes visited
                order: [],
                //for storing the parent of nodes visited
                parent: [],

                statck: new Stack(),
            },
            //for BFS
            bfs: {
                //for storing visited nodes
                visited: [],
                //for storing the path
                path: [],
                //for storing the order of nodes visited
                order: [],
                //for storing the parent of nodes visited
                parent: [],
                //for storing the queue
                queue: new Queue(),
            },
            //for current algo
            currentAlgo: "dfs",
            //for current node
        }

        //initialize empty graph
        this.graph = {};
        this.size = size;
        this.isEmpty = true;
        this.vertices = [];
        this.edges = [];
        this.adjList = [];
        this.adjMatrix = [];
        this.visited = [];
        this.stack = new Stack();
        this.queue = new Queue();
        this.topologicalOrder = [];
        this.bfs = this.bfs.bind(this);
        this.dfs = this.dfs.bind(this);
        this.topologicalSort = this.topologicalSort.bind(this);
        this.addVertex = this.addVertex.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.removeEdge = this.removeEdge.bind(this);
        this.removeVertex = this.removeVertex.bind(this);
        this.printGraph = this.printGraph.bind(this);
        this.bfs = this.bfs.bind(this);
        this.dfs = this.dfs.bind(this);
        this.topologicalSort = this.topologicalSort.bind(this);
        this.getElements = this.getElements.bind(this);
        this.getAdjList = this.getAdjList.bind(this);
        this.getAdjMatrix = this.getAdjMatrix.bind(this);
        this.getEdges = this.getEdges.bind(this);
        this.stepForword = this.stepForword.bind(this);
        this.initGrid = this.initGrid.bind(this);
    }

    //Initializing Grid of X*Y as graph
    initGrid(X, Y) {


    }
}


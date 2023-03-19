const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const FILTERS = { 
    Upstream: 'upstream',
    Downstream: 'downstream'
}

function filterFor(data, fieldName, upstreamOrDownstream = 'upstream') {
    if (!fieldName) return data;
    console.log("Fieldname is ", fieldName, 'marking emphasized')
    data.map(item => item.emphasized = false)

    if (upstreamOrDownstream === FILTERS.Upstream) {
        let initialNode = data.find(node => node.name === fieldName);
        initialNode.emphasized = true;
        let deps = initialNode.depends_on;
        while (deps.length > 0) {
            let currentDep = deps.pop();
            let currentDepNode = data.find(node => node.name === currentDep)
            currentDepNode.emphasized = true;
            deps.push(...currentDepNode.depends_on)
        }
        return data;
    }
}


export function generateNodes(data, filter = '') {
    let nodes = filterFor(data, filter, 'upstream')

   return nodes.map((node) => {
        return {
            id: node.name,
            data: {
                label: node.name,
                type: node.type,
                tests: {
                    passed: node.tests_passed,
                    failed: node.tests_failed,
                    warned: node.tests_warned,
                },
                emphasized: node.emphasized,
            },
            type: 'customNode',
            position: position
        }
   })
}

export function generateEdges(data) {
    let edges = [];

    data.forEach(node => {
        node.depends_on.forEach(_dependencyName => {
            edges.push({
                type: edgeType,
                source: _dependencyName,
                target: node.name,
                id: `${_dependencyName}${node.name}`,
                animated: false,
            })
        })
    })


    return edges
}
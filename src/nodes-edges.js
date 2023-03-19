const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

import { data } from './data'

export function generateNodes(data) {
   return data.map((node) => {
        return {
            id: node.name,
            data: {
                label: node.name,
                type: node.type,
                tests: {
                    passed: node.tests_passed,
                    failed: node.tests_failed,
                    warned: node.tests_warned,
                }
            },
            type: 'customNode',
            position: position
        }
   })

//    return initialNodes;
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
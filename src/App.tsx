import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import { data } from "./data";
import { generateNodes, generateEdges } from "./nodes-edges.js";
import CustomNode from "./CustomNode";
import "./custom-node.css";
import "./index.css";
import FilterSection from "./FilterSection";

const nodeTypes = { customNode: CustomNode };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  console.log({ nodes, edges });
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = "left";
    node.sourcePosition = "right";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

function getLayoutElements() {
  return;
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  generateNodes(data),
  generateEdges(data)
);

const LayoutFlow = () => {
  const [fieldNameFilter, setFieldNameFilter] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      generateNodes(data, fieldNameFilter),
      generateEdges(data)
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [fieldNameFilter]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: false },
          eds
        )
      ),
    []
  );

  return (
    <div>
      <FilterSection
        nodeNames={nodes.map((n) => n.id)}
        selectedField={fieldNameFilter}
        onSelectField={(name) => setFieldNameFilter(name)}
      />
      <div className="layoutflow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        />
      </div>
    </div>
  );
};

export default LayoutFlow;

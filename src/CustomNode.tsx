import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

const Badge = ({ children, className }) => {
  return <div className={`badge ${className}`}>{children}</div>
}

function CustomNode({ data, isConnectable }) {
  return (
    <div className={`custom-node ${data.type}`}>
      {data.type !== 'source' && <Handle type="target" position={Position.Left} isConnectable={isConnectable} />}
      {data.type !== 'exposure' && <Handle type="source" position={Position.Right} isConnectable={isConnectable} />}
      <div className="inside-content">
        {data.label}
        <div className="badges">
          {data.tests.passed > 0 && <Badge className='passed'>{data.tests.passed}</Badge>}
          {data.tests.failed > 0 && <Badge className='failed'>{data.tests.failed}</Badge>}
          {data.tests.warned > 0 && <Badge className='warned'>{data.tests.warned}</Badge>}
        </div>
      </div>

    </div>
  );
}

export default CustomNode;

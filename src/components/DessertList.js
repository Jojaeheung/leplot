import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/DessertList.css';

const desserts = [
  { id: 'cupcake', label: 'Cupcake' },
  { id: 'macaron', label: 'Macaron' },
  { id: 'donut', label: 'Donut' }
];

const DraggableDessert = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <div ref={setNodeRef} className="dessert-item" style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
};

const DessertList = () => {
  return (
    <aside className="dessert-list">
      <h3 className="dessert-list-title">디저트 목록</h3>
      {desserts.map((d) => (
        <DraggableDessert key={d.id} id={d.id} label={d.label} />
      ))}
    </aside>
  );
};

export default DessertList;
import React from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

const Box = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: onDrop,
  });

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = children[dragIndex];
    const updatedChildren = update(children, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    onDrop(updatedChildren);
  };

  return (
    <div ref={drop} style={{ border: '1px solid black', minHeight: '100px', padding: '8px', marginTop: '20px', display: 'flex' }}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          index,
          moveCard,
        })
      )}
    </div>
  );
};

export default Box;
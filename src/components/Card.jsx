// Card.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ id, text, index, handleBoxCardDrop }) => {
  const [, drag] = useDrag({
    type: 'CARD',
    item: { id, index },
  });

  return (
    <div ref={drag} style={{ border: '1px solid black', padding: '8px', margin: '8px', cursor: 'move' }}>
      {text}
    </div>
  );
};

export default Card;

"use client"
import React, { useState } from 'react';
import './CardComponent.css';
import Image from 'next/image';

const CardComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      content: 'Card 1',
      hiddenImage: 'https://via.placeholder.com/150/FF0000',
      hiddenHeading: 'Hidden Card 1',
      hiddenParagraph: 'This is hidden content for Card 1.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      content: 'Card 2',
      hiddenImage: 'https://via.placeholder.com/150/00FF00',
      hiddenHeading: 'Hidden Card 2',
      hiddenParagraph: 'This is hidden content for Card 2.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      content: 'Card 3',
      hiddenImage: 'https://via.placeholder.com/150/0000FF',
      hiddenHeading: 'Hidden Card 3',
      hiddenParagraph: 'This is hidden content for Card 3.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      content: 'Card 4',
      hiddenImage: 'https://via.placeholder.com/150/FFFF00',
      hiddenHeading: 'Hidden Card 4',
      hiddenParagraph: 'This is hidden content for Card 4.',
    },
  ];

  return (
    <div className={`card-container ${hoveredCard ? 'expanded' : ''}`}>
      {cards.map((card) => (
        <React.Fragment key={card.id}>
          <div
            className={`card ${hoveredCard === card.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Image src={card.image} alt={card.content} className="card-image" width={100} height={100} />
            <div className="card-content">{card.content}</div>
          </div>
          {hoveredCard === card.id && (
            <div className="hidden-card">
              <Image src={card.hiddenImage} alt={card.hiddenHeading} className="hidden-card-image" width={100} height={100}/>
              <h3>{card.hiddenHeading}</h3>
              <p>{card.hiddenParagraph}</p>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardComponent;
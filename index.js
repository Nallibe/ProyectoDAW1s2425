import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [cards, setCards] = React.useState([...Array(12).keys()].map(i => ({ id: i, flipped: false })));

    const flipCard = (id) => {
        setCards(cards.map(card => card.id === id ? { ...card, flipped: !card.flipped } : card));
    };

    return (
        <div>
            <h1>Juego de Memoria</h1>
            <div className="card-container">
                {cards.map(card => (
                    <div 
                        key={card.id} 
                        className={`card ${card.flipped ? 'flipped' : ''}`} 
                        onClick={() => flipCard(card.id)}
                    >
                        {card.flipped ? card.id : "?"}
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
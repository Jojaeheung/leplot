import React from 'react';
import '../styles/StickerSelector.css';

const stickers = [
  { id: 'heart', src: 'https://twemoji.maxcdn.com/v/latest/svg/2764.svg', label: 'Heart', price: 500 },
  { id: 'star', src: 'https://twemoji.maxcdn.com/v/latest/svg/2b50.svg', label: 'Star', price: 500 },
  { id: 'smile', src: 'https://twemoji.maxcdn.com/v/latest/svg/1f60a.svg', label: 'Smile', price: 500 },
];

const StickerSelector = ({ selectedId, onSelect }) => {
  return (
    <div className="sticker-selector">
      {stickers.map((s) => (
        <div
          key={s.id}
          className={`sticker-item ${selectedId === s.id ? 'selected' : ''}`}
          onClick={() => onSelect(s)}
        >
          <img src={s.src} alt={s.label} />
        </div>
      ))}
    </div>
  );
};

export { stickers };
export default StickerSelector;
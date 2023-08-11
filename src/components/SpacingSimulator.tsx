import { useState } from 'react';

import calculateRatio from './calculateRatio';
import { defaultNotes } from './Notes';
import type { Note } from './Notes';

export default function SpacingSimulator() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [spacingRatio, setSpacingRatio] = useState<number>(1.6);
  const [allowCollision, setAllowCollision] = useState<boolean>(true);
  const noteRatios = calculateRatio(notes, spacingRatio);

  return (
    <>
      <div className="note-buttons">
        {defaultNotes.map((button, index) => (
          <button
            key={index}
            onClick={() => setNotes([...notes, button])}
            className="note-button bravura"
          >
            {button.smuflChar}
          </button>
        ))}
      </div>
      <div className="inputs">
        <div className="spacing-input">
          <input
            type="range"
            min={1}
            max={2}
            step={0.1}
            value={spacingRatio}
            onChange={event => setSpacingRatio(Number(event.target.value))}
            autoComplete="off"
          />
          {spacingRatio}
        </div>
        <label>
          <input
            type="checkbox"
            checked={allowCollision}
            onChange={event => setAllowCollision(event.target.checked)}
            autoComplete="off"
          />
          Allow collision
        </label>
      </div>
      <section className="boxes">
        {noteRatios.map(({ smuflChar, ratio }, index) => (
          <div key={index} style={{ flex: ratio }} className="box bravura">
            <div style={{ position: allowCollision ? 'absolute' : 'inherit' }}>
              {smuflChar}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

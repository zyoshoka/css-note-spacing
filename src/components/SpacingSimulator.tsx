import { useState } from 'react';

import calculateRatio from './calculateRatio';
import { defaultNotes } from './Notes';
import type { Note } from './Notes';

export default function SpacingSimulator() {
  const [notes, setNotes] = useState<Note[]>([]);
  function addNotes(note: Note) {
    setNotes([...notes, note]);
  }
  const [spacingRatio, setSpacingRatio] = useState<number>(1.6);
  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSpacingRatio(Number(event.target.value));
  }
  const [allowCollision, setAllowCollision] = useState<boolean>(true);
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAllowCollision(event.target.checked);
  }

  const noteRatios = calculateRatio(notes, spacingRatio);

  return (
    <>
      <div className="note-buttons">
        {defaultNotes.map((button, index) => (
          <button
            key={index}
            onClick={() => addNotes(button)}
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
            onChange={handleSliderChange}
            autoComplete="off"
          />
          {spacingRatio}
        </div>
        <label>
          <input
            type="checkbox"
            checked={allowCollision}
            onChange={handleCheckboxChange}
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

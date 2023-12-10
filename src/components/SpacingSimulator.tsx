import React, { useState } from 'react';

import calculateRatio from './calculateRatio';
import { defaultNotes, dottedNotes } from './Notes';
import type { Note } from './Notes';

export default function SpacingSimulator() {
	const [staff, setStaff] = useState({
		upper: [] as Note[],
		lower: [] as Note[],
	});
	const [spacingRatio, setSpacingRatio] = useState<number>(1.6);
	const [isDotted, setIsDotted] = useState<boolean>(false);

	return (
		<>
			<NoteButtons staff={staff} setStaff={setStaff} selectedStaff={'upper'} isDotted={isDotted} />
			<NoteButtons staff={staff} setStaff={setStaff} selectedStaff={'lower'} isDotted={isDotted} />
			<div className="inputs">
				<div className="ratio-input">
					<input
						type="range"
						min={1}
						max={2}
						step={0.1}
						value={spacingRatio}
						onChange={event => setSpacingRatio(Number(event.target.value))}
						autoComplete="off"
					/>
					<div className="ratio-value">{spacingRatio}</div>
				</div>
				<label>
					<input
						type="checkbox"
						checked={isDotted}
						onChange={event => setIsDotted(event.target.checked)}
						autoComplete="off"
					/>
					Dotted note
				</label>
			</div>
			<Score staff={staff} spacingRatio={spacingRatio} />
		</>
	);
}

function NoteButtons({
	staff, setStaff, selectedStaff, isDotted,
}: {
	staff: {
		upper: Note[],
		lower: Note[],
	},
	setStaff: React.Dispatch<React.SetStateAction<{
		upper: Note[],
		lower: Note[],
	}>>,
	selectedStaff: 'upper' | 'lower',
	isDotted: boolean,
}) {
	return (
		<div className="note-buttons">
			{(isDotted ? dottedNotes : defaultNotes).map((button, index) => (
				<button
					key={index}
					onClick={() => {
						const nextStaff = {
							upper: staff.upper,
							lower: staff.lower,
						};
						if (selectedStaff === 'upper') nextStaff.upper.push(structuredClone(button));
						else nextStaff.lower.push(structuredClone(button));

						setStaff(nextStaff);
					}}
					className="note-button bravura"
				>
					{button.smuflChar}
				</button>
			))}
		</div>
	);
}

function Score({
	staff, spacingRatio,
}: {
	staff: {
		upper: Note[],
		lower: Note[],
	},
	spacingRatio: number,
}) {
	for (let index = 0; ; index++) {
		if (!staff.upper[index] || !staff.lower[index]) break;
		const minValue = Math.min(staff.upper[index].value, staff.lower[index].value);
		if (staff.upper[index].value !== minValue) {
			staff.upper.splice(index + 1, 0, {
				value: staff.upper[index].value - minValue,
				name: null,
				smuflChar: null,
			});
			staff.upper[index].value = minValue;
		}
		if (staff.lower[index].value !== minValue) {
			staff.lower.splice(index + 1, 0, {
				value: staff.lower[index].value - minValue,
				name: null,
				smuflChar: null,
			});
			staff.lower[index].value = minValue;
		}
	}

	return [staff.upper, staff.lower].map((voice, index) => (
		<section key={index} className="boxes">
			{
				calculateRatio(voice, spacingRatio).map(({ smuflChar, ratio }, index) => (
					<div key={index} style={{ flex: ratio }} className="box bravura">
						<div style={{ position: 'absolute', whiteSpace: 'nowrap' }}>
							{smuflChar}
						</div>
					</div>
				))
			}
		</section>
	));
}

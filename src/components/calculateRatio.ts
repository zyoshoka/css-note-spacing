import type { Note, NoteRatio } from './Notes';

export default function calculateRatio(notes: Note[], spacingRatio: number) {
	const minNoteValue = Math.min(...notes.map(({ value }) => value));
	const noteRatios: NoteRatio[] = notes.map((note) => ({
		...note,
		ratio: round(
			Math.pow(spacingRatio, Math.log2(note.value / minNoteValue)),
			6
		),
	}));

	return noteRatios;
}

function round(value: number, numDigits: number) {
	return Math.round(value * Math.pow(10, numDigits)) / Math.pow(10, numDigits);
}

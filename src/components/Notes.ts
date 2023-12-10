export interface Note {
	value: number;
	name: string;
	smuflChar: string;
}
export interface NoteRatio extends Note {
	ratio: number;
}
export const defaultNotes: Note[] = [
	{
		value: 1,
		name: 'whole',
		smuflChar: '\uE1D2',
	},
	{
		value: 1 / 2,
		name: 'half',
		smuflChar: '\uE1D3',
	},
	{
		value: 1 / 4,
		name: 'quarter',
		smuflChar: '\uE1D5',
	},
	{
		value: 1 / 8,
		name: '8th',
		smuflChar: '\uE1D7',
	},
	{
		value: 1 / 16,
		name: '16th',
		smuflChar: '\uE1D9',
	},
	{
		value: 1 / 32,
		name: '32nd',
		smuflChar: '\uE1DB',
	},
	{
		value: 1 / 64,
		name: '64th',
		smuflChar: '\uE1DD',
	},
];
export const dottedNotes: Note[] = defaultNotes.map((note) => {
	return {
		value: note.value + note.value / 2,
		name: `${note.name}-dotted`,
		smuflChar: `${note.smuflChar} \uE1E7`,
	};
});

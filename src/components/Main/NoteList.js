import React from 'react'
import NoteListItem from './NoteListItem'
import AddNoteButton from './AddNoteButton'
import { Consumer } from '../../AppContext'

export default function NoteList() {
	return (
		<ul className='note__list'>
			<Consumer>
				{(value) =>
					value.state.notes.map((note) => (
						<NoteListItem key={note.id} note={note} />
					))
				}
			</Consumer>
			<AddNoteButton />
		</ul>
	)
}

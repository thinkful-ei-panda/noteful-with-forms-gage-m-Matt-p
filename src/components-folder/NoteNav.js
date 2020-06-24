import React from 'react'
// import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function NoteNav(props) {
	const id = props.notes.find(
		(note) => note.id === props.match.params.noteid
	).folderId
	const name = props.folders.find((folder) => folder.id === id).name

	return (
		<nav className='Sidebar__nav'>
			<div className='nav__list'>
				<button onClick={() => props.history.goBack()}>
					Go Back
				</button>
			</div>
			<div>Folder:{name}</div>
		</nav>
	)
}

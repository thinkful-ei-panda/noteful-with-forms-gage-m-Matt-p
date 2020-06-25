import React from 'react'
// import { Link } from 'react-router-dom'
import './Sidebar.css'
import { Consumer } from '../../AppContext'

export default function NoteNav(props) {
	const currentNoteId = props.match.params.noteid
	return (
		<nav className='Sidebar__nav'>
			<div className='nav__list'>
				<button onClick={() => props.history.goBack()}>
					Go Back
				</button>
			</div>
			<Consumer>
				{(value) => (
					<div>
						Folder:
						{value.actions.getName(
							value.actions.getFolderId(currentNoteId)
						)}
					</div>
				)}
			</Consumer>
		</nav>
	)
}

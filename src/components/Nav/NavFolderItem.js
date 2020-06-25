import React from 'react'

import { NavLink } from 'react-router-dom'

export default function NavFolderItem(props) {
	const amountOfNotes = (notes, folderid) =>
		notes.filter((note) => note.folderId === folderid).length

	return (
		<li
			key={props.folderid}
			id={props.folder.id}
			className='folder'
			folderid={props.id}
			name={props.folder.name}
		>
			<NavLink
				to={`/folder/${props.folder.id}`}
				id={props.folder.id}
				className='list__nav__folder__link'
			>
				{props.folder.name}
				<span className='note__count'>
					{amountOfNotes(props.notes, props.folder.id)}
				</span>
			</NavLink>
		</li>
	)
}

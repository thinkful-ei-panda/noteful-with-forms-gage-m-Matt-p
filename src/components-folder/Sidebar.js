import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar(props) {
	const amountOfNotes = (notes, folderid) =>
		notes.filter((note) => note.folderId === folderid).length
	const navList = props.folders.map((folder) => (
		<li
			key={folder.id}
			id={folder.id}
			className='folder'
			folderid={folder.id}
			name={folder.name}
		>
			<NavLink
				to={`/folder/${folder.id}`}
				id={folder.id}
				className='list__nav__folder__link'
			>
				{folder.name}
				<span className='note__count'>
					{amountOfNotes(props.notes, folder.id)}
				</span>
			</NavLink>
		</li>
	))
	return (
		<nav className='Sidebar__nav'>
			<div className='nav__list'>
				<ul className='list'>{navList}</ul>
			</div>
			<div className='list__nav__button__wrapper'>
				<button className='list__nav__button'>
					<Link to='/add-folder' className='list__nav__link'>
						Add Folder
					</Link>
				</button>
			</div>
		</nav>
	)
}

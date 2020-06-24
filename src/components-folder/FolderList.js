import React from 'react'
import { Link } from 'react-router-dom'

import './Main.css'

export default function FolderList(props) {
	const folderid = props.match.params.folderid
	const noteList = props.notes.map(
		(note) =>
			note.folderId === folderid && (
				<li
					key={note.id}
					id={note.id}
					folderid={note.folderId}
					content={note.content}
				>
					<div className='note__'>
						<h2 className='note__title'>
							<Link to={`/note/${note.id}`}>{note.name}</Link>
						</h2>
						<button className='note__delete'>remove</button>
						<div className='note__dates'>
							<div className='note__date__'>
								Modified{' '}
								<span className='date'>{`${new Date(
									note.modified
								).toDateString()}`}</span>
							</div>
						</div>
					</div>
				</li>
			)
	)
	return (
		<main className='app__main'>
			<section className='note__list__wrapper'>
				<ul className='note__list'>
					{noteList}
					<div className='add__note__container'>
						<Link
							id='add-note-link'
							className='add__note__link'
							to='/add-note'
						>
							Add Note
						</Link>
					</div>
				</ul>
			</section>
		</main>
	)
}

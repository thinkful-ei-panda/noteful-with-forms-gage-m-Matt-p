import React from 'react'
import { Link } from 'react-router-dom'

import './Main.css'

export default function NoteMain(props) {
	const noteid = props.match.params.noteid

	const noteList = props.notes.map(
		(note) =>
			noteid === note.id && (
				<li key={note.id} id={note.id} folderid={note.folderId}>
					<div className='note__'>
						<h2 className='note__title'>
							<Link to='/'>{note.name}</Link>
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
					<div className='note__content'>
						<p>{note.content}</p>
					</div>
				</li>
			)
	)

	return (
		<main className='app__main'>
			<section className='note__list__wrapper'>
				<ul className='note__list'>{noteList}</ul>
			</section>
		</main>
	)
}

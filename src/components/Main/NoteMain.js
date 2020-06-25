import React from 'react'
import { Link } from 'react-router-dom'

import './Main.css'
import { Consumer } from '../../AppContext'

export default function NoteMain(props) {
	const noteid = props.match.params.noteid

	return (
		<main className='app__main'>
			<section className='note__list__wrapper'>
				<li className='note__item'>
					<div className='note__'>
						<h2 className='note__title'>
							<Consumer>
								{(value) => (
									<Link
										to={`/note/${
											value.actions.getCurrentNote(noteid).id
										}`}
									>
										{value.actions.getCurrentNote(noteid).name}
									</Link>
								)}
							</Consumer>
						</h2>
						<button className='note__delete'>remove</button>
						<div className='note__dates'>
							<div className='note__date__'>
								Modified{' '}
								<Consumer>
									{(value) => (
										<span className='date'>{`${new Date(
											value.actions.getCurrentNote(noteid).modified
										).toDateString()}`}</span>
									)}
								</Consumer>
							</div>
						</div>
					</div>
				</li>
				<Consumer>
					{(value) => (
						<div className='note__content'>
							<p>{value.actions.getCurrentNote(noteid).content}</p>
						</div>
					)}
				</Consumer>
			</section>
		</main>
	)
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Main.css'
import { Consumer, Context } from '../../AppContext'

class NoteMain extends Component {
	constructor(props) {
		super(props)
	}
	noteid = this.props.match.params.noteid
	static contextType = Context
	render() {
		const { getCurrentNote } = this.context
		const { state } = this.context
		console.log(state)
		const getThisNote = (noteid) =>
			state.notes.find((note) => note.id === noteid)
		console.log(getThisNote(this.noteid))
		return (
			<main className='app__main'>
				<section className='note__list__wrapper'>
					<li className='note__item'>
						<div className='note__'>
							<h2 className='note__title'>
								<Consumer>
									{(value) => (
										<Link to={`/note/${this.noteid}`}>
											{getThisNote(this.noteid).name}
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
												getThisNote(this.noteid).modified
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
								<p>{getThisNote(this.noteid).content}</p>
							</div>
						)}
					</Consumer>
				</section>
			</main>
		)
	}
}
export default NoteMain

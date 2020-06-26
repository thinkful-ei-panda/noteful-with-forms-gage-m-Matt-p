import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Main.css'
import { Context } from '../../AppContext'
import ErrorBlock from './ErrorBlock'

class NoteMain extends Component {
	constructor(props) {
		super(props)
	}

	static contextType = Context
	render() {
		const { getCurrentNote } = this.context.actions
		const { state } = this.context
		const { noteid } = this.props.match.params
		console.log(state)

		return (
			<main className='app__main'>
				<section className='note__list__wrapper'>
					<ErrorBlock>
						<li className='note__item'>
							<div className='note__'>
								<h2 className='note__title'>
									<Link to={`/note/${noteid}`}>
										{getCurrentNote(noteid) &&
											getCurrentNote(noteid).name}
									</Link>
								</h2>

								<div className='note__dates'>
									<div className='note__date__'>
										Modified{' '}
										<span className='date'>{`${new Date(
											getCurrentNote(noteid) &&
												getCurrentNote(noteid).modified
										).toDateString()}`}</span>
									</div>
								</div>
							</div>
						</li>
						<div className='note__content'>
							<p>
								{getCurrentNote(noteid) &&
									getCurrentNote(noteid).content}
							</p>
						</div>
					</ErrorBlock>
				</section>
			</main>
		)
	}
}
export default NoteMain

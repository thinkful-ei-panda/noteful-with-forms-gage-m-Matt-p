import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'

import './Main.css'
import './button.css'
import { Context, Consumer } from '../../AppContext'

class NoteMain extends Component {
	static contextType = Context

	handleClickDelete = (event) => {
		event.preventDefault()
		const { noteid } = this.props.match.params
		fetch(`http://localhost:9090/notes/${noteid}`, {
			method: 'DELETE',
		})
			.then((res) => {
				if (!res.ok) {
					return res.json().then((error) => {
						throw error
					})
				}
				return res.json()
			})
			.then(() => this.props.history.goBack())
	}

	render() {
		const { noteid } = this.props.match.params
		const { getCurrentNote } = this.context.actions
		const { deleteNote } = this.context.actions

		return (
			<main className='app__main'>
				<section className='note__list__wrapper'>
					<li className='note__item'>
						<div className='note__'>
							<h2 className='note__title'>
								<Link to={`/note/${noteid}`}>
									{getCurrentNote(noteid) &&
										getCurrentNote(noteid).name}
								</Link>
							</h2>
							<Consumer>
								{(value) => (
									<MdDeleteForever
										key={noteid}
										id={noteid}
										className='delete__icon'
										onClick={(event) => {
											console.log('clicked')
											this.handleClickDelete(event)
											deleteNote(noteid)
										}}
									/>
								)}
							</Consumer>

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
				</section>
			</main>
		)
	}
}
export default withRouter(NoteMain)

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'

import './Main.css'
import './button.css'
import { Context, Consumer } from '../../AppContext'
import ErrorBoundary from '../ErrorBoundary'

class NoteMain extends Component {
	static contextType = Context

	handleClickDelete = (event) => {
		event.preventDefault()
		const { noteid } = this.props.match.params
		const { deleteNote } = this.context.actions
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
			.then((data) => deleteNote(noteid))
			.catch((error) => console.log(error))
			.then(() => this.props.history.push('/'))
	}
	componentDidMount() {
		fetch(
			`https://warm-stream-05375.herokuapp.com/api/notes/${this.props.match.params.noteid}`
		)
			.then((noteRes) => {
				if (!noteRes) {
					return noteRes.json.then((error) => Promise.reject(error))
				}
				return noteRes.json()
			})
			.then((data) => this.setState({ note: data }))
	}

	render() {
		const { noteid } = this.props.match.params
		return (
			<main className='app__main'>
				<section className='note__list__wrapper'>
					<li className='note__item'>
						<div className='note__'>
							<ErrorBoundary>
								<h2 className='note__title'>
									<Link to={`/`}>
										{this.state && this.state.note.note_name}
									</Link>
								</h2>
							</ErrorBoundary>

							<Consumer>
								{(value) => (
									<MdDeleteForever
										key={noteid}
										id={noteid}
										className='delete__icon'
										onClick={(event) => {
											this.handleClickDelete(event)
										}}
									/>
								)}
							</Consumer>

							<div className='note__dates'>
								<ErrorBoundary>
									<div className='note__date__'>
										Modified{' '}
										<span className='date'>{`${new Date(
											this.state && this.state.note.modified
										).toDateString()}`}</span>
									</div>
								</ErrorBoundary>
							</div>
						</div>
					</li>

					<div className='note__content'>
						<p>{this.state && this.state.note.content}</p>
					</div>
				</section>
			</main>
		)
	}
}
export default withRouter(NoteMain)

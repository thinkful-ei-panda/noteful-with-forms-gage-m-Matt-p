import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Main.css'
import { Consumer, AppContext } from '../../AppContext'

export default class NoteListItem extends Component {
	static defaultProps = {
		deleteNote: () => {},
	}

	handleClickDelete = (event) => {
		event.preventDefault()
		const noteid = event.target.id
		fetch(`http://localhost:9090/notes/${noteid}`, {
			method: 'DELETE',
		}).then((res) => {
			if (!res.ok) {
				return res.json().then((error) => {
					throw error
				})
			}
			return res.json()
		})
	}
	render() {
		const { note } = this.props
		return (
			<li className='note__item'>
				<div className='note__'>
					<h2 className='note__title'>
						<Link to={`/note/${note.id}`}>{note.name}</Link>
					</h2>
					<Consumer>
						{(value) => (
							<button
								key={note.id}
								id={note.id}
								className='note__delete'
								onClick={(event) => {
									console.log('clicked')
									this.handleClickDelete(event)
									value.actions.deleteNote(event.target.id)
								}}
							>
								remove
							</button>
						)}
					</Consumer>

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
	}
}

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import './Main.css'
import './button.css'
import { Consumer, Context } from '../../AppContext'
import PropTypes from 'prop-types'
import ErrorBoundary from '../ErrorBoundary'

class NoteListItem extends Component {
	static defaultProps = {
		deleteNote: () => {},
	}

	handleClickDelete = (event) => {
		event.preventDefault()
		const noteid = this.props.note.id
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
			.catch((error) => console.log(error.message))
			.then((data) => deleteNote(noteid))
			.then(() => this.props.history.push('/'))
	}
	static contextType = Context
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
							<MdDeleteForever
								key={note.id}
								id={note.id}
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
									note.modified
								).toDateString()}`}</span>
							</div>
						</ErrorBoundary>
					</div>
				</div>
			</li>
		)
	}
}

NoteListItem.propTypes = {
	note: PropTypes.object,
}

export default withRouter(NoteListItem)

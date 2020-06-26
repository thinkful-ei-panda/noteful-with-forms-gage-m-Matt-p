import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Sidebar.css'
import { Consumer, Context } from '../../AppContext'

class NoteNav extends Component {
	currentNoteId = this.props.match.params.noteid

	static contextType = Context
	render() {
		const { noteid } = this.props.match.params
		const { notes } = this.context.state
		const { folders } = this.context.state
		const { getFolderId } = this.context.actions
		const { getName } = this.context.actions
		const note = notes.find((note) => note.id === this.currentNoteId)
		const text =
			folders.length && notes.length > 0
				? getName(getFolderId(noteid).folderId).name
				: 'text'
		return (
			<nav className='Sidebar__nav'>
				<div className='nav__list'>
					<button onClick={() => this.props.history.goBack()}>
						Go Back
					</button>
				</div>
				<Consumer>
					{(value) => (
						<div>
							Folder:
							{text}
						</div>
					)}
				</Consumer>
			</nav>
		)
	}
}
export default NoteNav

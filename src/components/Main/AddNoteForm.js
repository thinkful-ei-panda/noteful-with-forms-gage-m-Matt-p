import React, { Component } from 'react'
import { Consumer, Context } from '../../AppContext'
import { withRouter } from 'react-router-dom'

class AddNoteForm extends Component {
	state = {
		form: {
			name: '',
			content: '',
			modified: new Date(),
			folderId: '',
		},
		error: null,
	}

	setError = (error) => {
		this.setState({ error: error })
	}
	handleNoteSubmit = (event) => {
		event.preventDefault()
		console.log('submitted', this.state.form)
		const { addNote } = this.context.actions
		const form = JSON.stringify(this.state.form)
		fetch('http://localhost:9090/notes', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: form,
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then((data) => addNote(data))
			.catch((error) => this.setError(error))
			.then(() => this.props.history.push('/'))
	}
	static contextType = Context
	render() {
		return (
			<form
				className='add__note__form'
				action='#'
				onSubmit={(event) => this.handleNoteSubmit(event)}
			>
				<div className='form__field'>
					<label htmlFor='name__input'>Name</label>
					<input
						id='name__input'
						type='text'
						name='name'
						value={this.state.form.name}
						onChange={(event) =>
							this.setState({
								form: {
									...this.state.form,
									name: event.target.value,
								},
							})
						}
					/>
				</div>
				<div className='form__field'>
					<label htmlFor='content__input'>Content</label>
					<textarea
						id='contenet__input'
						type='text'
						name='desc'
						value={this.state.form.desc}
						onChange={(event) =>
							this.setState({
								form: {
									...this.state.form,
									content: event.target.value,
								},
							})
						}
					/>
				</div>
				<div className='form__field'>
					<label htmlFor='folder__select'>Select Folder</label>
					<Consumer>
						{(value) => (
							<select
								id='folder__select'
								name='folderSelect'
								onChange={(event) =>
									this.setState({
										form: {
											...this.state.form,
											folderId: event.target.value,
										},
									})
								}
							>
								<option id='empty' value=''>
									Folders...
								</option>
								{value.state.folders.map((folder) => (
									<option
										key={folder.id}
										id={folder.id}
										value={folder.id}
									>
										{folder.name}
									</option>
								))}
							</select>
						)}
					</Consumer>
				</div>
				<div className='add__button'>
					<button
						type='button'
						onClick={() => this.props.history.push('/')}
					>
						Cancel
					</button>
				</div>
				<div className='add__button'>
					<button type='submit'>Add Note</button>
				</div>
			</form>
		)
	}
}
export default withRouter(AddNoteForm)

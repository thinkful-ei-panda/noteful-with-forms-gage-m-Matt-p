import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Context } from '../../AppContext'
import ValidateInputError from './ValidateInputErrors'

class AddFolderForm extends Component {
	state = {
		folderNameValue: '',
		error: null,
		submit: false,
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.addFoldertoApi(this.state.folderNameValue)
	}

	setFolderNameValue = (name) => {
		this.setState({ folderNameValue: name })
	}

	setError = (error) => {
		this.setState({ error: error })
	}

	validateInput = () => {
		const { folderNameValue } = this.state
		if (
			folderNameValue.length < 3 ||
			!folderNameValue.match(/^(\w+\S+)$/)
		) {
			return 'filename must have a name (or a letter)'
		}
	}

	addFoldertoApi = (folder_name) => {
		const jsonObj = JSON.stringify({ folder_name })
		const { addFolder } = this.context.actions

		fetch('http://localhost:3000/api/folders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: jsonObj,
		})
			.then((res) => {
				if (!res.ok) {
					return res.json().then((error) => {
						throw error
					})
				}
				return res.json()
			})
			.catch((error) => this.setError(error))
			.then((data) => addFolder(data))
			.then(() => this.props.history.push('/'))
	}
	static contextType = Context
	render() {
		return (
			<form
				className='add__folder__form'
				action='#'
				onSubmit={(e) => this.handleSubmit(e)}
			>
				<div className='form__field'>
					<label htmlFor='folder__name__input'>Name</label>
					<input
						id='folder__name__input'
						type='text'
						value={this.state.folderNameValue}
						onChange={(event) =>
							this.setFolderNameValue(event.target.value)
						}
						required
					/>
				</div>
				<ValidateInputError messages={this.validateInput()} />
				<div className='add__button'>
					<button type='submit' disabled={this.validateInput()}>
						Add Button
					</button>
				</div>
			</form>
		)
	}
}

export default withRouter(AddFolderForm)

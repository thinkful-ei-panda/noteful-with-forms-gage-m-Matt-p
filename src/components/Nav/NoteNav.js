import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Sidebar.css'
import { Consumer, Context } from '../../AppContext'
import ErrorBoundary from '../ErrorBoundary'

class NoteNav extends Component {
	state = {
		folder: {},
	}
	componentDidMount() {
		const { folderid } = this.props.match.params

		fetch(
			`https://warm-stream-05375.herokuapp.com/api/folders/${folderid}`
		)
			.then((foldersRes) => {
				if (!foldersRes.ok)
					return foldersRes.json().then((e) => Promise.reject(e))

				return foldersRes.json()
			})
			.then((folder) => {
				return this.setState({ folder })
			})
			.catch((error) => {
				console.error({ error })
			})
	}

	static contextType = Context
	render() {
		return (
			<nav className='Sidebar__nav'>
				<div className='nav__list'>
					<button onClick={() => this.props.history.goBack()}>
						Go Back
					</button>
				</div>
				<ErrorBoundary>
					<Consumer>
						{(value) => (
							<div>
								Folder:
								{this.state.folder.folder_name}
							</div>
						)}
					</Consumer>
				</ErrorBoundary>
			</nav>
		)
	}
}
export default NoteNav

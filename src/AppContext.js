import React, { Component } from 'react'
import store from './store'

export const Context = React.createContext({
	notes: [],
	folders: [],
	addFolder: () => {},
	addNote: () => {},
	deleteNote: () => {},
})

export class AppContext extends Component {
	state = { folders: [], notes: [], error: false }
	setNotes = (newNotes) => {
		this.setState({ notes: newNotes })
	}
	setFolders = (newFolders) => {
		this.setState({ folders: newFolders })
	}
	getCurrentNote = (id) =>
		this.state.notes.find((note) => note.id === id)
	getName = (id) =>
		this.state.folders.find((folder) => folder.id === id).name
	getFolderId = (matchId) =>
		this.state.notes.find((note) => note.id === matchId).folderId

	deleteNote = (noteid) => {
		const updated = this.state.notes.filter(
			(note) => note.id !== noteid
		)
		this.setState({ notes: updated })
	}

	componentDidMount() {
		console.log('mounted')
		fetch('http://localhost:9090/folders', {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then((data) => this.setFolders(data))
			.catch((error) => this.setState({ error: error.message }))
		console.log('got folders')
		fetch('http://localhost:9090/notes', {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then((data) => this.setNotes(data))
			.catch((error) => this.setState({ error: error.message }))
		console.log('got notes')
	}

	render() {
		console.log(this.state)
		return (
			<Context.Provider
				value={{
					state: {
						...this.state,
					},
					actions: {
						getName: this.getName,
						getFolderId: this.getFolderId,
						getCurrentNote: this.getCurrentNote,
						deleteNote: this.deleteNote,
					},
					getCurrentNote: this.getCurrentNote,
				}}
			>
				{this.props.children}
			</Context.Provider>
		)
	}
}

export const Consumer = Context.Consumer

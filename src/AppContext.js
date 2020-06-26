import React, { Component } from 'react'

export const Context = React.createContext({
	addFolder: () => {},
	addNote: () => {},
	deleteNote: () => {},
	getCurrentNote: () => {},
})

export class AppContext extends Component {
	state = {
		folders: [],
		notes: [],
		error: false,
	}
	setNotes = (newNotes) => {
		this.setState({ notes: newNotes })
	}
	setFolders = (newFolders) => {
		this.setState({ folders: newFolders })
	}
	getCurrentNote = (id) => {
		return this.state.notes.find((note) => note.id === id)
	}

	getName = (id) =>
		this.state.folders.find((folder) => folder.id === id)

	getFolderId = (matchId) =>
		this.state.notes.find((note) => note.id === matchId)

	addFolder = (folder) => {
		this.setState({
			folders: [...this.state.folders, folder],
		})
	}
	deleteNote = (noteid) => {
		const updated = this.state.notes.filter(
			(note) => note.id !== noteid
		)
		this.setState({ notes: updated })
	}
	addNote = (note) => {
		this.setState({ notes: [...this.state.notes, note] })
	}

	componentDidMount() {
		Promise.all([
			fetch(`http://localhost:9090/notes`),
			fetch(`http://localhost:9090/folders`),
		])
			.then(([notesRes, foldersRes]) => {
				if (!notesRes.ok)
					return notesRes.json().then((e) => Promise.reject(e))
				if (!foldersRes.ok)
					return foldersRes.json().then((e) => Promise.reject(e))

				return Promise.all([notesRes.json(), foldersRes.json()])
			})
			.then(([notes, folders]) => {
				this.setState({ notes, folders })
			})
			.catch((error) => {
				console.error({ error })
			})
	}

	render() {
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
						addFolder: this.addFolder,
						addNote: this.addNote,
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

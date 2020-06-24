import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Main from './components/Main'
import AddNote from './components/AddNote'
import FolderList from './components/FolderList'
import AddNav from './components/AddNav'
import AddFolderMain from './components/AddFolderMain'
import NoteMain from './components/NoteMain'
import NoteNav from './components/NoteNav'
import store from './store'

import './App.css'

class App extends Component {
	state = {
		store: { ...store },
	}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route
						path='/folder/:folderid'
						render={(routeProps) => (
							<Sidebar
								notes={this.state.store.notes}
								folders={this.state.store.folders}
							/>
						)}
					/>
					<Route
						path='/note/:noteid'
						render={(routeProps) => (
							<NoteNav
								folders={this.state.store.folders}
								notes={this.state.store.notes}
								{...routeProps}
							/>
						)}
					/>
					<Route
						path='/add-folder'
						render={(routeProps) => <AddNav {...routeProps} />}
					/>

					<Route
						path='/add-note'
						render={(routeProps) => <AddNav {...routeProps} />}
					/>
					<Route
						path='/'
						exact
						render={(routeProps) => (
							<Sidebar
								notes={this.state.store.notes}
								folders={this.state.store.folders}
							/>
						)}
					/>
				</Switch>

				<Header />

				<Switch>
					<Route
						path='/folder/:folderid'
						render={(props) => (
							<FolderList notes={this.state.store.notes} {...props} />
						)}
					/>
					<Route
						path='/note/:noteid'
						render={(routeProps) => (
							<NoteMain
								notes={this.state.store.notes}
								{...routeProps}
							/>
						)}
					/>
					<Route
						path='/add-folder'
						render={(props) => (
							<AddFolderMain
								notes={this.state.store.notes}
								folders={this.state.store.folders}
							/>
						)}
					/>
					<Route
						path='/add-note'
						render={() => (
							<AddNote
								notes={this.state.store.notes}
								folders={this.state.store.folders}
							/>
						)}
					/>
					<Route
						path='/'
						exact
						render={() => <Main notes={this.state.store.notes} />}
					/>
				</Switch>
			</div>
		)
	}
}

export default App

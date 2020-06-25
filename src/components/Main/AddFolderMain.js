import React from 'react'
import AddFolderForm from './AddFolderForm'
import { Consumer } from '../../AppContext'
import './AddFolderMain.css'
import './Main.css'

export default function AddFolderMain() {
	return (
		<main className='app__main'>
			<section className='form__wrapper'>
				<h2>Add Folder</h2>
				<Consumer>
					{(value) => <AddFolderForm value={value} />}
				</Consumer>
			</section>
		</main>
	)
}

import React from 'react'
// import { Link } from 'react-router-dom'
import './AddFolderMain.css'
import './Main.css'

export default function AddFolderMain(props) {
	return (
		<main className='app__main'>
			<section className='form__wrapper'>
				<h2>Add Folder</h2>
				<form className='add__folder__form' action='#'>
					<div className='form__field'>
						<label htmlFor='folder__name__input'>Name</label>
						<input id='folder__name__input' type='text' />
					</div>

					<div className='add__button'>
						<button type='submit'>Add Button</button>
					</div>
				</form>
			</section>
		</main>
	)
}

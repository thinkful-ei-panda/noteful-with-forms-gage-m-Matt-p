import React from 'react'
import './AddNote.css'
import './Main.css'

export default function AddNote(props) {
	const options = props.folders.map((folder) => (
		<option key={folder.id} id={folder.id} value={folder.id}>
			{folder.name}
		</option>
	))
	return (
		<main className='app__main'>
			<section className='note__list__wrapper'>
				<h2>Add Note</h2>
				<form className='add__note__form' action='#'>
					<div className='form__field'>
						<label htmlFor='name__input'>Name</label>
						<input id='name__input' type='text' />
					</div>
					<div className='form__field'>
						<label htmlFor='content__input'>Content</label>
						<textarea id='contenet__input' type='text' />
					</div>
					<div className='form__field'>
						<label htmlFor='folder__select'>Select Folder</label>
						<select id='folder__select'>
							<option id='empty' value=''>
								Folders...
							</option>
							{options}
						</select>
					</div>
					<div className='add__button'>
						<button type='submit'>Add Button</button>
					</div>
				</form>
			</section>
		</main>
	)
}

import React from 'react'
import NavFolderItem from './NavFolderItem'
import { Consumer } from '../../AppContext'

export default function NavFolderList() {
	return (
		<ul className='list'>
			<Consumer>
				{(value) =>
					value.state.folders.map((folder) => (
						<NavFolderItem
							key={folder.id}
							folder={folder}
							notes={value.state.notes}
						/>
					))
				}
			</Consumer>
		</ul>
	)
}

import { userURL }  from './globals.js'

const userContainer = document.querySelector('#user-container')

document.addEventListener('DOMContentLoaded', async function() {
	let response = await fetch(`${userURL}`)
	let userData = await response.json()
	console.log(userData)
	if (userData.length > 0){
		userData.forEach( user => {
			userContainer.innerHTML += `
			<tr id=${user.id} class="tabla__fila">
				<td class="tabla__campo">${user.name}</td>
				<td class="tabla__campo">${user.age}</td>
				<td class="tabla__campo"><button data-id="${user.id}" id="delete-${user.id}" data-action="delete">Delete</button></td>
			  </tr>`
		  })
	} else {
		userContainer.innerHTML = '<h3 class="tabla__aviso">No hay usuarios registrados</h3>'
	}
 })

userContainer.addEventListener('click', (e) => {
	if (e.target.dataset.action === 'delete') {
		console.log(e.target.dataset.id)
		fetch(`${userURL}/${e.target.dataset.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		location.reload();
	}
})

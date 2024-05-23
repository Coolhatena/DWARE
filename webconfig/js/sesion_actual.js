import { userURL, currentUserURL, currentUserUniversalID }  from './globals.js'

const userContainer = document.querySelector('#user-container');
const usersList = document.querySelector('#users-list');

document.addEventListener('DOMContentLoaded', async function() {
	let [response_currentUser, response_users] = await Promise.all([ fetch(`${currentUserURL}`), fetch(`${userURL}`) ]);
	let currentUserData = await response_currentUser.json();

	if (currentUserData.length < 0) {
		fetch(`${currentUserURL}`, {
			method: 'POST',
			body: JSON.stringify({
			  userID: 0,
			}),
			headers: {
			  'Content-Type': 'application/json'
			}
		  })
	}

	let currentUserID = currentUserData[0].userID;
	console.log(currentUserID)

	let usersData = await response_users.json();
	console.log(usersData)
	let isUserFound = false;
	usersData.forEach(user => {
		// Add users to <select>
		usersList.innerHTML += `<option id="x${user.id}" value="${user.id}">${user.name}</option>`;

		// Check for current user
		if(user.id == currentUserID){
			userContainer.innerHTML = `
					<p >Nombre: ${user.name}</p>
					<p >Edad: ${user.age}</p>
				`
		}
		isUserFound = true;
	});

	// Handle situation where theres no registered users
	if (!isUserFound){
		userContainer.innerHTML = '<p>No hay ningun usuario seleccionado</p>'
	}
 })

usersList.addEventListener('change', (e) => {
	console.log(`click ${e.target.value}`)
	fetch(`${currentUserURL}/${currentUserUniversalID}`, {
		method: 'PATCH',
		body: JSON.stringify({
		  userID: e.target.value
		}),
		headers: {
		  'Content-Type': 'application/json'
		}
	})
	location.reload();
	console.log("Click");
} );
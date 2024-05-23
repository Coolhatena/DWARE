import { userURL }  from './globals.js'


const userForm = document.querySelector('#user-form')

userForm.addEventListener('submit', (e) => {
	e.preventDefault()
	console.log(e.target)
	const nameInput = userForm.querySelector('#name').value
	const ageInput = userForm.querySelector('#age').value

	fetch(`${userURL}`, {
		method: 'POST',
		body: JSON.stringify({
		  name: nameInput,
		  age: ageInput,
		}),
		headers: {
		  'Content-Type': 'application/json'
		}
	  })
	window.location.replace("index.html");
})

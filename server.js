import express from 'express'

const app = express()

// Set static folder
app.use(express.static('public'))
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// Handle GET request to fetch users
app.get('/users', async (req, res) => {
	// const users = [
	// 	{ id: 1, name: 'John Doe' },
	// 	{ id: 2, name: 'Bob Williamas' },
	// 	{ id: 3, name: 'Shannon Jackson' },
	// ]

	setTimeout(async () => {
		const limit = +req.query.limit || 10
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/users?_limit=${limit}`
		)
		const users = await response.json()
		res.send(`
        <h1 class="text-2xl fond-bold my-4">Users</h1>
        <ul>
            ${users.map((user) => `<li>${user.name}</li>`).join('')}
        </ul>
    `)
	}, 2000)
})

// Handle POST request form temp conversion
app.post('/convert', (req, res) => {
	setTimeout(async () => {
		const fahrenheit = parseFloat(req.body.fahrenheit)
		const celsius = (fahrenheit - 32) * (5 / 9)
		res.send(`
                <p>
                    ${fahrenheit} degrees Farenheit is equal to ${celsius} degrees Celsius
                </p>
            `)
	}, 2000)
})
// Handle GET request for polling example
let counter = 0
app.get('/poll', (req, res) => {
	counter++

	const data = { value: counter }

	res.json(data)
})

// Handle GET request for weather
let currentTemeprature = 20
app.get('/get-temperature', (req, res) => {
	currentTemeprature += Math.random() * 2 - 1
	res.send(currentTemeprature.toFixed(1) + '°C')
})

// Handle POST request for contacts search from jsonplaceholder
app.post('/search/api', async (req, res) => {
	const searchTerm = req.body.search.toLowerCase()

	if (!searchTerm) {
		return res.send('<tr></tr>')
	}

	const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
	const contacts = await response.json()

	const searchResults = contacts.filter((contact) => {
		const name = contact.name.toLowerCase()
		const email = contact.email.toLowerCase()

		return name.includes(searchTerm) || email.includes(searchTerm)
	})

	setTimeout(() => {
		const searchResultsHtml = searchResults
			.map(
				(contact) => `
            <tr>
                <td><div class="my-4 p-2">${contact.name}</div></td>
                <td><div class="my-4 p-2">${contact.email}</div></td>
            </tr>
        `
			)
			.join('')

		res.send(searchResultsHtml)
	}, 1000)
})
// Start the server
app.listen(3000, () => {
	console.log(`Server listening on port: http://localhost:3000`)
})

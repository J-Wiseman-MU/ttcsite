export async function create(username, password) {
	try {
		const response = await fetch('http://3.234.207.222:8000/users/create', {
			method: 'POST' ,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});
	} catch (error) {
		console.error('Error: ', error);
		return false;
	}
}

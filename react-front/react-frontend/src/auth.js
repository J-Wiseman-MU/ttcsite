export async function authenticate(username, password) {
	try {
		const response = await fetch('http://3.234.207.222:8000/users/login',{
			method: 'POST' ,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password } ),
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		console.log("Response headers:", response.headers);
		console.log("Cookies:", document.cookie);

		const data = await response.json();
		console.log(data.out);
		return data.out;
	} catch (error) {
		console.error('Error: ', error);
		return false;
	}
}

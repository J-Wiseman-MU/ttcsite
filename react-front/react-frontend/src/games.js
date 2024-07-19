export async function games(name) {
	try {
		const csrfToken = getCookie('csrftoken');
		console.log(csrfToken);
		const response = await fetch('http://3.234.207.222:8000/api/games', {
			 method: 'POST' ,
			 headers: {
				 'Content-Type': 'application/json',
				 'X-CSRFToken': csrfToken,
			 },
			 body: JSON.stringify({ name }),
			 credentials: 'include',
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		console.log('worked');
		const data = await response.json();
		return data.result;
	} catch (error) {
		console.error("Error: ", error);
		return [];
	}
}

function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
		

export async function save(game) {
	try {
		const csrfToken = getCSRFToken();
		const formattedGame = {
			user: game[0],
			num: game[1],
			c0: game[2],
			c1: game[3],
			c2: game[4],
			c3: game[5],
			c4: game[6],
			c5: game[7],
			c6: game[8],
			c7: game[9],
			c8: game[10],
			gameName: game[11],
			gamescol: game[12]
		};
		const response = await fetch('http://3.234.207.222:8000/api/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			body: JSON.stringify(formattedGame),
			credentials: 'include',
		});
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

	} catch (error) {
		console.error("Error: ", error);
	}
}

function getCSRFToken() {
	const name = 'csrftoken';
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

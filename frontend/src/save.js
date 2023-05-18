import axios from 'axios';
export async function save(game) {
    try {
        await axios.post('http://localhost:8000/api/save',{game});
    }catch (error) {
        console.error('Error: ', error);
    }
}
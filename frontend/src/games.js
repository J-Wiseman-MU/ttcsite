import React from "react";
import axios from 'axios';
export async function games(name) {
    try{
        const response = await axios.post('http://localhost:8000/api/games',{ name });
        console.log('worked')
        return response.data.result; 
    }catch (err) {
        console.log("Error: ",err);
        return [];
    }
}
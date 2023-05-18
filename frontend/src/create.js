import React from "react";
import axios from 'axios';
export async function create(username, password) {
    try {
        const response = await axios.post('http://localhost:8000/users/create',{username,password});
        return response.data.out;
    }catch (error) {
        console.error('Error: ', error);
        return false;
    }
}
  
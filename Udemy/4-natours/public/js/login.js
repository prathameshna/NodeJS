import '@babel/polyfill';
import axios from 'axios';

export const login = async (email, password) => {
    console.log(email, password);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });

        if(res.data.status === 'success') {
            alert('Loggin in successfully!');
            window.setTimeout(() => {
                location.assign('/')
            }, 1500);
        }
        console.log(res);
    } catch (err) {
        alert(err.response.data.message);
    }
}

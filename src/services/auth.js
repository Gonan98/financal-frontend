export const signIn = async (email, password) => {

    try {
        const res = await fetch('http://localhost:5000/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const { token } = await res.json();
        localStorage.setItem('bearer-token', token);
    } catch (err) {
        console.error(err);
    }
}

export const signUp = async (ruc, business_name, email, password) => {
    try {
        const res = await fetch('http://localhost:5000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ruc,
                business_name,
                email,
                password
            })
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

export const getProfile = async () => {

    const bearerToken = localStorage.getItem('bearer-token');

    const res = await fetch('http://localhost:5000/api/v1/auth/profile', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearerToken
        }
    });

    const { data } = await res.json();

    return data;
}
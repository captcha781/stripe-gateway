import axios from "axios";

const authHeader = () => {
    let token = localStorage.getItem('stripe_auth')
    if (token) {
        axios.defaults.headers.common['stripe_auth'] = token
    } else {
        axios.defaults.headers.common['stripe_auth'] = ""
    }
}

export default authHeader
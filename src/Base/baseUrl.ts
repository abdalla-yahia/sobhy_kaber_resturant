import axios from "axios";

const BaseUrl = axios.create({
    baseURL:process.env.BASE_URL
})

export default BaseUrl;
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3500'
});

// The file imports the axios library, which is used for making HTTP requests. It then creates and exports an instance of axios with a baseURL configuration set to 'http://localhost:3500'.

// By setting the baseURL, the instance will automatically prepend this URL to any requests made using the instance. This means that when making HTTP requests using this axios instance, the requests will be sent to the specified base URL, unless overridden with a different URL.

// This allows for cleaner and more concise code when making multiple requests to the same server, as the base URL is already defined and does not need to be repeated for each request.
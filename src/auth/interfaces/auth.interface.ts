interface LoginInterfaces {
    access_token: string; // Define the type of the access_token, for example, a string.
    refresh_token: string;
}

interface RegisterInterfaces {
    access_token:string
    created_at: Date
}

interface RefreshInterfaces {
    access_token:string
}
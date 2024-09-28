interface LoginInterfaces {
    access_token: string; // Define the type of the access_token, for example, a string.
    refresh_token: string;
}

interface RegisterInterfaces extends LoginInterfaces{
    created_at: Date
}
  
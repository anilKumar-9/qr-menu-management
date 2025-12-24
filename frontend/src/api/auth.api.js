import instance from "./axios";

export const registerOwner = (data) => instance.post("/users/register", data);

export const loginOwner = (data) => instance.post("/users/login", data);

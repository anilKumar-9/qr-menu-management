import instance from "../../utils/axios.js";

export const registerOwner = (data) => instance.post("/users/register", data);

export const loginOwner = (data) => instance.post("/users/login", data);

export const logoutOwner = () => instance.post("/users/logout");

export const getMe = () => instance.get("/users/me");

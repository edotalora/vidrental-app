import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(
    apiEndpoint,
    {
      name: user.name,
      email: user.username,
      password: user.password,
    },
    {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWVlZDBmYmFiMjE5ZTU1ODhhMGZmODciLCJpYXQiOjE1OTI3MDkzNzF9.q_F4Qsj5K3_BuKIaUD4w_B8rAbqbIYaYrId772rzykA",
      },
    }
  );
}

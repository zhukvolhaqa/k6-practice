import http from "k6/http"
import { sleep } from "k6"

export const options = {
  vus: 2, //virtual users
  iterations: 2,
  duration: "10s",
}

// The base script
// The default function runs the script—in this case, a virtual user makes a GET request,
// then sleeps for one second.
export default function () {
  http.get("https://test.k6.io")
  sleep(1)
}

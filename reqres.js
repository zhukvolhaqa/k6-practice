// Creator: Grafana k6 Browser Recorder 1.0.1
// https://reqres.in/

import { sleep, group } from "k6"
import http from "k6/http"

export const options = {
  vus: 10,
  duration: "30s",
}

export default function main() {
  let response

  group("page_1 - https://reqres.in/", function () {
    response = http.get("https://reqres.in/api/unknown/23", {
      headers: {
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
    })
    sleep(3)

    response = http.patch(
      "https://reqres.in/api/users/2",
      '{"name":"morpheus","job":"zion resident"}',
      {
        headers: {
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
        },
      }
    )
    sleep(2)

    response = http.del("https://reqres.in/api/users/2", null, {
      headers: {
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
    })
  })
}

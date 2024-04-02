import http from "k6/http"
import { check, sleep } from "k6"

// Stages are a k6 option that can ramp the VU throughput up and down.
// The following config would have k6 ramping up from 1 to 10 VUs for 30 sec,
// then staying flat at 10 VUs for 15 sec, then ramping up from 10 to 35 VUs
// over the next 10 sec before finally ramping down to 0 VUs for another
// 5 sec.

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "15s", target: 10 },
    { duration: "10s", target: 35 },
    { duration: "5s", target: 0 },
  ],
}

export default function () {
  const res = http.get("https://httpbin.test.k6.io/")
  check(res, { "status was 200": (r) => r.status == 200 })
  sleep(1)
}

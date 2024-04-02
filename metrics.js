import http from "k6/http"
import { sleep } from "k6"
import { Gauge, Trend } from "k6/metrics"

// Custom metrics:
// A gauge to save a maximum value
// A trend to make a p99 value

const bodySize = new Gauge("body_size")
const recMinusSend = new Trend("rec_send_differential")

export const options = {
  thresholds: {
    rec_send_differential: ["p(99.9)<1500"],
  },
}

export default function () {
  let response = http.get("https://test-api.k6.io/public/crocodiles", {
    tags: { name: "All crocs" },
  })
  const crocs = JSON.parse(response.body)
  gaugeSize(crocs.length)
  timingsDuration(response)

  crocs.forEach((croc) => {
    response = http.get(
      `https://test-api.k6.io/public/crocodiles/${croc["id"]}`,
      {
        tags: { name: `${croc["sex"]}` },
      }
    )

    const crocLength = JSON.parse(response.body.length)
    gaugeSize(crocLength)
    timingsDuration(response)
  })
}

export function gaugeSize(len) {
  bodySize.add(len)
}

export function timingsDuration(res) {
  recMinusSend.add(res.timings.receiving - res.timings.sending)
}

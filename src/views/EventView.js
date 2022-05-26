import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

// useQuery
import { useQuery } from "../scripts/hooks";

export default function EventView() {
  // useQuery
  const query = useQuery();
  const eventId = query.get("eventId") ? query.get("eventId") : 0;

  const [event, setEvent] = useState(null);

  async function getEvent() {
    await axios
      .get(`http://localhost:3001/getEvent?classroom_event_id=${eventId}`)
      .then(function (response) {
        setEvent(response.data.responseData);
        console.log(response.data.responseData);
      });
  }

  useEffect(() => {
    if (eventId) getEvent();
  }, [eventId]);

  return (
    <div className="container scrollable-container">
      {event ? (
        <>
          <div className="section">
            <h1>{event.title}</h1>
            <div
              className="inline-container"
              style={{
                color: "#0B001480",
                margin: "0.5rem 0",
              }}
            >
              <h5 style={{ width: "50px" }}> De la: </h5>
              <div
                className="icon-container-small"
                style={{ marginRight: "0.5rem" }}
              >
                <Icon icon="bi:clock" />
              </div>
              <h5 className="due-time">{event.from_time}</h5>
            </div>
            <div
              className="inline-container"
              style={{
                color: "#0B001480",
                margin: "0.5rem 0",
              }}
            >
              <h5 style={{ width: "50px" }}> Pana la: </h5>
              <div
                className="icon-container-small"
                style={{ marginRight: "0.5rem" }}
              >
                <Icon icon="bi:clock" />
              </div>
              <h5 className="due-time">{event.to_time} </h5>
            </div>
          </div>
          <div className="section"></div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

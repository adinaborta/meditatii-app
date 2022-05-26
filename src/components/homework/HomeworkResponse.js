import React, { useEffect, useState } from "react";

// iconify
import { Icon } from "@iconify/react";

export default function HomeworkResponse({ homeworkResponse }) {
  useEffect(() => {
    console.log(homeworkResponse);
  }, []);

  useEffect(() => {
    if (
      homeworkResponse &&
      homeworkResponse.markup.length &&
      homeworkResponse.markup[0].content !== ""
    ) {
      document.querySelector(".markup-content").innerHTML =
        homeworkResponse.markup[0].content;
    }
  }, [homeworkResponse]);

  return (
    <div className="homework-response-container">
      <div className="section">
        {homeworkResponse.markup.length &&
        homeworkResponse.markup[0].content !== "" ? (
          <div className="section">
            <h3>Rezolvare: </h3>
            <div className="markup-content"></div>
          </div>
        ) : (
          ""
        )}
        {homeworkResponse.documents.length &&
        homeworkResponse.documents.length ? (
          <>
            <h3>Fisiere atasate: </h3>
            <div className="homework-documents">
              {homeworkResponse.documents.map((doc, i) => {
                return (
                  <div className="list-item-preview-container" key={i}>
                    <a href={doc.firebase_link}>
                      <div
                        className={`list-item-preview ${
                          doc.deadline < doc.time_posted__homework_response
                            ? "overdue-preview"
                            : ""
                        }`}
                      >
                        <div className="list-item-content">
                          <div
                            className="row homework-response-document-container"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {/* <a download href={doc.firebase_link}> */}
                            <div className="icon-container-big">
                              <img
                                src={require(`../../assets/type_icons/${doc.type}.svg`)}
                              />
                            </div>
                            <div>
                              <h4>{doc.title__homework_response}</h4>
                            </div>
                            <div
                              className={`inline-container due-time`}
                              style={{ marginLeft: "auto" }}
                            >
                              <div className="icon-container-small">
                                <Icon icon="bi:clock" />
                              </div>
                              <h5>{doc.time_posted__homework_response}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {homeworkResponse.markup.length === 0 &&
      homeworkResponse.documents.length === 0 ? (
        <div className="not-found-container">
          <div className="not-found">
            <h1 style={{ fontSize: "2rem" }}>
              Nu a fost adaugat un raspuns...
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Radio } from "antd";
import UploadFile from "../UploadFile";
import RichTextEditor from "../RichTextEditor";
// query
import { useQuery } from "../../scripts/hooks";

import draftToHtml from "draftjs-to-html";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const axios = require("axios").default;

export default function UploadHomeworkResponse() {
  const [activeView, setActiveView] = useState("showUpload");
  const [rawTextValue, setRawTextValue] = useState("");
  const [endpoint, setEndpoint] = useState(null);

  // useQuery
  const query = useQuery();
  const homework_student_id = query.get("homework_student_id")
    ? query.get("homework_student_id")
    : null;

  async function saveRichTextEditor() {
    const hashtagConfig = {
      trigger: "#",
      separator: " ",
    };

    const markup = draftToHtml(rawTextValue, hashtagConfig);
    console.log(markup);
    await axios
      .post(
        `http://localhost:3001/uploadHomeworkText?homework_student_id=${homework_student_id}`,
        { markup: markup },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("ok");
      })
      .catch((err) => {
        console.error("not ok");
      });
  }
  return (
    <>
      <div
        className="inline-container"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          maxHeight: "3rem",
        }}
      >
        <h3>
          {activeView === "showUpload"
            ? "Adauga un document"
            : "Scrie un raspuns"}
        </h3>
        <div className="inline-container">
          <RadioGroup
            value={activeView}
            onChange={(e) => setActiveView(e.target.value)}
          >
            <RadioButton value="showUpload">Document</RadioButton>
            <RadioButton value="showWrite">Text</RadioButton>
          </RadioGroup>
          <button
            type="button"
            style={{ marginLeft: "1rem" }}
            className="fill"
            onClick={() => {
              saveRichTextEditor();
              // trigger send files
              setEndpoint(
                `uploadHomeworkFile?homework_student_id=${homework_student_id}`
              );
            }}
          >
            Salveaza
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div
        className={
          activeView === "showUpload" ? "visible-container" : "hidden-container"
        }
        style={{
          height: "70%",
        }}
      >
        <UploadFile
          style={{ padding: "3rem 0", height: "100%" }}
          setEndpoint={setEndpoint}
          endpoint={endpoint}
          multiple={true}
          acceptedFormatString="jpeg, png, jpg, svg, pdf, ppt, txt, doc, docx, xls, xlsx, html"
          acceptedFormatList=".jpeg, .png, .jpg, .svg, .pdf, .ppt, .txt, .doc, .docx, .xls, .xlsx, .html"
        />
      </div>

      <div
        style={{ height: "calc(100% - 5rem)", position: "relative" }}
        className={
          activeView === "showWrite" ? "visible-container" : "hidden-container"
        }
      >
        <RichTextEditor setRawTextValue={setRawTextValue} />
      </div>
    </>
  );
}

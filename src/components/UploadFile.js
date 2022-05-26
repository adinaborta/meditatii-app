import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadFile } from "../scripts/api";

// router
import { useNavigate } from "react-router-dom";

let fileList = [];
export default function UploadFile({
  style,
  endpoint,
  acceptedFormatString,
  acceptedFormatList,
  label,
  setEndpoint,
  multiple,
  then,
}) {
  const { Dragger } = Upload;

  // useNavigate
  const navigate = useNavigate();

  const props = {
    name: "file",
    multiple: multiple,
    accept: acceptedFormatList,
    onChange(info) {
      console.log(info.file);
      if (multiple) fileList.push(info.file);
      else {
        fileList[0] = info.file;
      }
    },
    beforeUpload() {
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  async function sendFiles() {
    for (let i = 0; i < fileList.length; i++) {
      if (multiple !== false || i === 0) {
        const formData = new FormData();
        let file = fileList[i];
        formData.append("file", file);
        console.log(formData);
        uploadFile(formData, endpoint, then);
      }
    }
    fileList = [];
  }

  useEffect(() => {
    if (endpoint) {
      sendFiles();
      setEndpoint(null);
      navigate(-1);
    }
  }, [endpoint]);

  return (
    <div style={style}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        {label && <p className="ant-upload-text">{label}</p>}

        <p className="ant-upload-text">
          Faceti click sau trageti documentele in chenar pentru adaugare.
        </p>
        <p className="ant-upload-hint">
          Extensii acceptate sunt:{" "}
          {acceptedFormatString
            ? acceptedFormatString
            : "jpg, png, pdf, txt, jpeg"}
          .
        </p>
      </Dragger>
    </div>
  );
}

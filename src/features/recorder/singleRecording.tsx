import * as React from "react";
import { useState } from "react";

const SingleRecording = (prop: { fileName: string }) => {
  return (
    <li>
      <a
        href="#"
        onClick={() => automationControl.playRecordFile(prop.fileName)}
      >
        {prop.fileName}
      </a>
    </li>
  );
};

export default SingleRecording;

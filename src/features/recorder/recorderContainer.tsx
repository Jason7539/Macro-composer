import * as React from "react";
import { useState } from "react";
import RecordButton from "./recordButton";

const fetchFiles = async () => {};

const RecorderContainer = (): JSX.Element => {
  const [recordFiles, setrecordFiles] = useState<string[]>([]);

  React.useEffect(() => {
    const getRecordfiles = async () => {
      return fsFetch.getRecordings();
    };

    getRecordfiles().then((files) => {
      if (files.length !== recordFiles.length) {
        setrecordFiles(files);
      }
    });
  }, [recordFiles]);

  let files = recordFiles.map((file) => <li key={file}>{file}</li>);
  return (
    <div>
      <RecordButton></RecordButton>
      <ul>{files}</ul>
      {/* Read recordings from files */}
      {/* recordings lists  */}
      <div></div>
    </div>
  );
};

export default RecorderContainer;

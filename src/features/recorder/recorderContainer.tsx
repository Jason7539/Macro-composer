import * as React from "react";
import { useState } from "react";
import RecordButton from "./recordButton";

const RecorderContainer = (): JSX.Element => {
  const [recordFiles, setrecordFiles] = useState<string[]>([]);

  const updateRecordfiles = async () => {
    let fetchedRecords = await fsFetch.getRecordings();
    if (fetchedRecords.length !== recordFiles.length) {
      setrecordFiles(fetchedRecords);
    }
  };

  React.useEffect(() => {
    updateRecordfiles();
  }, [recordFiles]);

  React.useEffect(() => {
    fsFetch.onWindowRestore((_event: any) => {
      updateRecordfiles();
    });
    return function cleanup() {
      fsFetch.offWindowRestore();
    };
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

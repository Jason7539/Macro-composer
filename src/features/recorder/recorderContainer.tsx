import * as React from "react";
import { useState } from "react";
import RecordButton from "./recordButton";
import SingleRecording from "./singleRecording";

const RecorderContainer = () => {
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

  let files = recordFiles.map((file) => (
    <SingleRecording
      key={file}
      fileName={file}
      setrecordFiles={setrecordFiles}
    ></SingleRecording>
  ));

  return (
    <div>
      <RecordButton></RecordButton>
      <ul>{files}</ul>
      <div></div>
    </div>
  );
};

export default RecorderContainer;

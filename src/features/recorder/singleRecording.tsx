import { ipcRenderer } from "electron";
import * as React from "react";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { save, edit, trash } from "react-icons-kit/fa/";

const SingleRecording = (prop: {
  fileName: string;
  setrecordFiles: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const deleteSingleRecording = async (fileName: string) => {
    await fsFetch.deleteRecording(fileName);
    let fetchecRecordings = await fsFetch.getRecordings();
    prop.setrecordFiles(fetchecRecordings);
  };

  const editSingleRecording = (event: React.MouseEvent) => {};

  return (
    <li>
      <a
        href="#"
        onClick={() => automationControl.playRecordFile(prop.fileName)}
      >
        {prop.fileName}
      </a>
      {/* <Icon icon={save} /> */}
      <Icon onClick={editSingleRecording} id="edit" icon={edit} />
      <Icon
        onClick={() => {
          deleteSingleRecording(prop.fileName);
        }}
        id="trash"
        icon={trash}
      />
    </li>
  );
};

export default SingleRecording;

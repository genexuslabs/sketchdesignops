import sketch from 'sketch';
import { spawnSync } from '@skpm/child_process';
import { getFileAndQueueName, askQueuePath } from './utils';

var UI = require("sketch/ui");


export default function () {

  const doc = sketch.getSelectedDocument()
  var queuePath = askQueuePath(queuePath);
  var fileName;
  ({ fileName, queuePath } = getFileAndQueueName(doc, queuePath));

  const urlPath = queuePath + fileName.replace(".sketch", ".url");
  console.log("open !! " + urlPath);

  const spawn = spawnSync('open', [
    "'" + urlPath + "'"
  ], { shell: true });

  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    sketch.UI.message("😔 Some error occurs, see console for further details");
  }
  else
    sketch.UI.message("Opening the result ! 💚")

}


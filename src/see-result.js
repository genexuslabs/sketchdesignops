import sketch from 'sketch';


import { spawnSync , execSync} from '@skpm/child_process';
import { getFileAndQueueName, getQueuePath } from './utils';
import { os } from '@skpm/os';

var UI = require("sketch/ui");
var zip = require("jszip");




export default function () {
  
  const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath(queuePath);
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
    sketch.UI.message("Opening the result ! 💚");
}




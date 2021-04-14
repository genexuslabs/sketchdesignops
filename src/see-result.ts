import sketch from 'sketch';
import { spawnSync} from '@skpm/child_process';
import { getFileAndQueueName, getQueuePath } from './utils';

export default function () {  
  var queuePath = getQueuePath();
  var fileName;

  let doc = window["doc"] || global["doc"];

  ({ fileName, queuePath } = getFileAndQueueName(doc, queuePath));

  const urlPath = queuePath + fileName.replace(".sketch", ".url");
  console.log("open !! " + urlPath);

  const spawn = spawnSync('open', [
    "'" + urlPath + "'"
  ], { shell: true });

  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    sketch.UI.alert("GeneXus", "😔 Some error occurs, see console for further details");
  }
  else
  sketch.UI.alert("GeneXus", "Opening the result ! 💚"); 
}




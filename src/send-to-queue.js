import sketch from 'sketch';
import { copyFile, copyImages, getFileAndQueueName , askQueuePath} from './utils';
import { spawnSync } from '@skpm/child_process';


export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = askQueuePath(queuePath);
  if (queuePath)
    copySketch(queuePath, doc, true);
}

export function copySketch(queuePath, doc, images) {
  var fileName;
  var path = queuePath;
  ({ fileName, queuePath } = getFileAndQueueName(doc, path));
  console.log("copy to queue:" + queuePath);
  if (queuePath.localeCompare(path) != 0) {
    spawnSync('mkdir', ["-p", queuePath], { shell: true });
  }
  if (images)
    copyImages(queuePath, fileName, doc);
  var fromCopyFile = decodeURIComponent(doc.path);
  var toCopyFile = queuePath + fileName;
  const ret = copyFile(fromCopyFile, toCopyFile);
  if (!ret) {
    sketch.UI.message("😔 Some error occurs, see console for further details");
  }
  else {
    sketch.UI.message("Copied to Design Ops Queue ! 💚");
  }
}


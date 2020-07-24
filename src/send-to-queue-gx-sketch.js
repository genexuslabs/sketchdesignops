import sketch from 'sketch';
import { copyFile, copyImages, getFileAndQueueName , getQueuePath} from './utils';
import { spawnSync, execSync } from '@skpm/child_process';


export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath();
  if (queuePath)
    copyGxSketch(queuePath, doc, true);
}

export function copyGxSketch(queuePath, doc, images) {
  var fileName;
  var path = queuePath;
  ({ fileName, queuePath } = getFileAndQueueName(doc, path));
  console.log("copy to queue:" + queuePath);
  if (queuePath.localeCompare(path) != 0) {
    spawnSync('mkdir', ["-p", queuePath + "/gx/"], { shell: true });
  }
  if (images)
    copyImages(queuePath + "/gx/", fileName, doc);

  var fromCopyFile = decodeURIComponent(doc.path);
  var toCopyFile = queuePath + "/gx/" + fileName;
  const ret = copyFile(fromCopyFile, toCopyFile);

  if (!ret) {
    sketch.UI.message("😔 Some error occurs, see console for further details");
  }
  else {
    execSync("pushd " + queuePath + " && zip -r " + queuePath + "/" + fileName.replace(".sketch", ".gxsketch") + " " + "gx " + "&& popd " + queuePath , { shell: true });
    spawnSync('rm', ["-rf",  queuePath + "/gx/"], { shell: true });  
    sketch.UI.message("Copied to Design Ops Queue ! 💚");
  }
}


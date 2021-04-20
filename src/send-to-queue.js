import sketch from 'sketch';
import { copyFile, copyImages, getFileAndQueueName , getQueuePath, uploadToS3, output, showOperationMessage} from './utils';
import { spawnSync, execSync } from '@skpm/child_process';
import Settings from 'sketch/settings';
import {  SettingKeys} from './constants';



export default function() {
  sketch.UI.alert("Copied to Design Ops Queue ! 💚");
  const doc = sketch.getSelectedDocument();
  var queuePath = getQueuePath();
  if (queuePath) {
    if (!copySketch(queuePath, doc, true))
      showOperationMessage("😔 Some error occurs, see console for further details", output);
  }
}


export function copySketch(queuePath, doc, images) {
  var fileName;
  var path = queuePath;
  console.log("Starting copySketch " + queuePath);
  ({ fileName, queuePath } = getFileAndQueueName(doc, path));
  console.log("copy to queue:" + queuePath);
  if (queuePath.localeCompare(path) != 0) {
    spawnSync('mkdir', ["-p", queuePath], { shell: true });
  }
  if (images)
    copyImages(queuePath, fileName, doc);
  var fromCopyFile = decodeURIComponent(doc.path);
  var toCopyFile = queuePath + fileName;

 let enableS3 = Settings.settingForKey(SettingKeys.ENABLE_S3) == 1
 let s3Bucket = Settings.settingForKey(SettingKeys.S3_BUCKET)
 let s3SecretKey = Settings.settingForKey(SettingKeys.S3_SECRET_KEY)
 let s3AccessKey = Settings.settingForKey(SettingKeys.S3_ACCESS_KEY)
 
  if (enableS3) {
    console.log("uploading " + toCopyFile)
    console.log("fileName " + fileName)
    uploadToS3(fileName, fromCopyFile, s3Bucket, s3SecretKey, s3AccessKey );
  }
  else
  {
    const ret = copyFile(fromCopyFile, toCopyFile);
    if (!ret) {
      showOperationMessage("😔 Some error occurs, see console for further details", output);
    }
    else {
      sketch.UI.alert("GeneXus", "Copied to Design Ops Queue ! 💚");
    }
  }
}
import sketch from 'sketch';
import { copyFile, copyImages, getFileAndQueueName , getQueuePath, uploadToS3} from './utils';
import { spawnSync, execSync } from '@skpm/child_process';
import Settings from 'sketch/settings';
import {  SettingKeys} from './constants';



export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath();
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
      sketch.UI.message("😔 Some error occurs, see console for further details");
    }
    else {
      sketch.UI.message("Copied to Design Ops Queue ! 💚");
    }
  }
}
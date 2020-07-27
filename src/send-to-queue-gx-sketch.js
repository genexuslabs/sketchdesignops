import sketch from 'sketch';
import { copyFile, copyImages, getFileAndQueueName , getQueuePath, uploadToS3} from './utils';
import { spawnSync, execSync } from '@skpm/child_process';
import Settings from 'sketch/settings';
import {SettingKeys} from './constants';


export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath();
  if (queuePath)
    copyGxSketch(queuePath, doc, true);
}

export function copyGxSketch(queuePath, doc, images) {
  let enableS3 = Settings.settingForKey(SettingKeys.ENABLE_S3) == 1
  let s3Bucket = Settings.settingForKey(SettingKeys.S3_BUCKET)
  let s3SecretKey = Settings.settingForKey(SettingKeys.S3_SECRET_KEY)
  let s3AccessKey = Settings.settingForKey(SettingKeys.S3_ACCESS_KEY)
  
 
  var fileName;
  var path = queuePath;
  ({ fileName, queuePath } = getFileAndQueueName(doc, path));
  if (enableS3) {
    queuePath = "/var/TMP";
  }
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
    fileName = fileName.replace(".sketch", ".gxsketch");
    toCopyFile = queuePath + "/" + fileName;
    console.log("File To Copy:" + toCopyFile);
    execSync("pushd " + queuePath + " && zip -r '" + toCopyFile + "' " + "gx " + "&& popd " + queuePath , { shell: true });
  //  spawnSync('rm', ["-rf",  queuePath + "/gx/"], { shell: true }); 
    if (enableS3)
    {
      console.log("uploading " + toCopyFile)
      console.log("fileName " + fileName)
      uploadToS3(fileName, toCopyFile, s3Bucket, s3SecretKey, s3AccessKey );
    }
 
    sketch.UI.message("Copied to Design Ops Queue ! 💚");
  }
}


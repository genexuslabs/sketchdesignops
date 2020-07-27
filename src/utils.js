import sketch from 'sketch';

import { spawnSync, execSync } from '@skpm/child_process';

export function getFileAndQueueName(doc, queuePath) {
    var branch = "";
    var build = "";
    var fileName = decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').trim();
    var firstIndex = fileName.indexOf("(");
    var lastIndex = fileName.lastIndexOf(")");
    var betweenText = fileName.substr(0, firstIndex);
    if (firstIndex > 0 && lastIndex > 0 && lastIndex > firstIndex  ) {
        var withoutVersionPath = fileName.substr(0, firstIndex).trim() + ".sketch";
        var branchAndBuild = fileName.substr(firstIndex + 1, lastIndex - firstIndex - 1).trim();
        var items = branchAndBuild.split("@");
        if (items.length == 2) {
            branch = items[0].trim();
            build = items[1].trim();
            queuePath = queuePath + branch + "/" + build + "/";
            fileName = withoutVersionPath;
        }
    }
    return { fileName, queuePath };
}

export function uploadToS3(fileName, file, bucketName, s3Secret, s3Key) {
 
  fileName = fileName.replace(/[^a-z0-9.]/gi, '_');
  var dateValue = execSync("date -R").toString().replace(/\r?\n|\r/, "");
  console.log("Date:" + dateValue);
  var bucket = bucketName;
  var resource = `/${bucket}/${fileName}`;
  var contentType = "application/x-compressed-tar";
  var signature;
  var stringToSign = `"PUT\n\napplication/x-compressed-tar\n${dateValue}\n${resource}"`;
  console.log(stringToSign);

  var signMethod = `echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`;
  console.log(signMethod);
  var signatureObj = execSync(signMethod);
  if (signatureObj)
  {
    signature = signatureObj.toString().replace(/\r?\n|\r/, "");
    console.log("Signature: " + signature.toString());
  }  
  const curl_command =  `curl -X PUT -T "${file}" -H "Host: ${bucket}.s3.amazonaws.com" -H "Date: ${dateValue}" -H "Content-Type: ${contentType}" -H "Authorization: AWS ${s3Key}:${signature}" https://${bucket}.s3.amazonaws.com/${fileName}`;
  console.log(curl_command);
  var test = execSync(curl_command);
  if (test)
    console.log(test.toString()); 
}

export function copyFile(fromCopyFile, toCopyFile) {
    console.log("Copying " + fromCopyFile);
    console.log("To " + toCopyFile);
    const spawn = spawnSync('cp', [
        "'" + fromCopyFile + "'",
        "'" + toCopyFile + "'"
    ], 
    { shell: true });
    if (spawn.status > 0) {
        console.log(Error(spawn.stderr));
        return false;
    }
    else {
        return true;
    }
}
export function generateArtboardImages(document, path) {
  var artboards = [];
  
  document.pages.forEach(page => {
    page.layers.forEach(layer => {
      // Get only artboards and skip if artboard name starts with underscore
      if ( layer.type == 'Artboard' && !layer.name.startsWith('_') ) {
        artboards.push(layer)
      }
    });
    var exportPath = path + page.name + '/';
   artboards.forEach(ab => {
      // Export PNG
      sketch.export(ab, {output: exportPath})
   });
  });
}

var exportLayer = function (layer, path) {

    if (layer.exportFormats && layer.exportFormats.length > 0) {
      var formats = new Array();
      var scales = new Array();
      var prefixes = new Array();
      layer.exportFormats.forEach(ef => {
        formats.push(ef.fileFormat);
        scales.push(ef.size);
      });
      if (layer.name)
        console.log("Exporting " + layer.name);
  
      const options = {
        output: path,
        formats: formats.join(","),
        scales: scales.join(","),
        prefixes: "md"
      };
      sketch.export(layer, options);
    }
  
    if (layer.layers) {
      layer.layers.forEach(child => exportLayer(child, path));
  
    }
  }

export function copyImages(queuePath, fileName, doc) {
    var imageFolder = queuePath + fileName.replace(".sketch", "Images");
    generateArtboardImages(doc, imageFolder);
    console.log("Images to :" + imageFolder);
    doc.pages.forEach(page => {
        page.layers.forEach(layer => {
            exportLayer(layer, imageFolder);
        });
    });
}

export function getQueuePath() {
    var queuePath = sketch.Settings.settingForKey("DesignOpsQueue");
    if (queuePath)
        return queuePath;
    return askQueuePath();
}

export function askQueuePath() {
    var queuePath = sketch.Settings.settingForKey("DesignOpsQueue");
    console.log("The actual queuePath is :" + queuePath);
    if (!(queuePath !== undefined))
        queuePath = '/Volumes/cable/DesignOpsQueue/';
    sketch.UI.getInputFromUser("Where is the Design Ops Queue", { initialValue: queuePath }, (err, value) => {
      if (err) {
        return null;
      }
      console.log(value);
      queuePath = value;
      sketch.Settings.setSettingForKey("DesignOpsQueue", queuePath);
    });
    return queuePath; 
  }

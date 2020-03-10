import sketch from 'sketch';

import { spawnSync } from '@skpm/child_process';

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

export function copyFile(fromCopyFile, toCopyFile) {
    console.log("Copying " + fromCopyFile);
    console.log("To " + toCopyFile);
    const spawn = spawnSync('cp', [
        "'" + fromCopyFile + "'",
        "'" + toCopyFile + "'"
    ], { shell: true });
    if (spawn.status > 0) {
        console.log(Error(spawn.stderr));
        return false;
    }
    else {
        return true;
    }
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
    console.log("Images to :" + imageFolder);
    doc.pages.forEach(page => {
        page.layers.forEach(layer => {
            exportLayer(layer, imageFolder);
        });
    });
}

export function askQueuePath(queuePath) {
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

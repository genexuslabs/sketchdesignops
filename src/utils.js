import sketch from 'sketch';
import Settings from 'sketch/settings';
import { spawnSync, execSync } from '@skpm/child_process';
import { SettingKeys } from './constants';


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

export function uploadToS3(fileName, file, bucketName, s3Secret, s3AccessKey, errors) {
  // Bucket Names with special characters are not allowed by AWS S3 so ensure a valid name
  fileName = fileName.replace(/[^a-z0-9.]/gi, '_');
  // Date for signature
  var dateValue = execSync("date -R").toString().replace(/\r?\n|\r/, "");
  // Resource ID on S3
  var resource = `/${bucketName}/${fileName}`;
  // Create Signature
  var contentType = "application/x-compressed-tar";
  var stringToSign = `"PUT\n\napplication/x-compressed-tar\n${dateValue}\n${resource}"`;
  var signMethod = `echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`;
  var signatureObj = execSync(signMethod);
  if (signatureObj)
  {
    var signature = signatureObj.toString().replace(/\r?\n|\r/, "");
    console.log("Signature: " + signature.toString());
    // Now we can try uploading by using the given signature
    var curl_command =  `curl -X PUT -T "${file}" -H "Host: ${bucketName}.s3.amazonaws.com" -H "Date: ${dateValue}" -H "Content-Type: ${contentType}" -H "Authorization: AWS ${s3AccessKey}:${signature}" https://${bucketName}.s3.amazonaws.com/${fileName}`;
    console.log(curl_command);
    try
    {
      var out = execSync(curl_command);
      if (out) {
        // When success the lenght is nothing, when fail AWS is sending an XML format, so parse it.
        if (out.length > 0) {
          console.log("Output:" + out.toString());
          var xmlToJSON = require('xmltojson');
          var DOM = require('xmldom');
          xmlToJSON.stringToXML = (s) => new DOM.DOMParser().parseFromString(s, 'text/xml');
          var json = xmlToJSON.parseString(out.toString());
          if (json && json.Error)
          {
              json.Error.forEach( err => {
                  if (err.Message && err.Message.length > 0) {
                     errors.push(err.Message[0]._text) }
                  }
              );
              console.log(JSON.stringify(json));
              return false;
          }
        }
        return true;
      }
    }
    catch (error)
    {
      console.log(error.message);
    }
  }  
  return false;
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
  document.pages.forEach(page => {
    var artboards = [];
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

var traverseFonts = function (layer, fonts)
{
  if (layer.type == "Text" && layer.style.fontFamily != "Helvetica") {
    console.log(layer.style.fontFamily + "-" + layer.style.fontWeight);
    if (!fonts.includes(layer.style.fontFamily))
      fonts.push(layer.style.fontFamily);
 //   console.log(JSON.stringify(layer.style));
  }
  if (layer.layers) {
  layer.layers.forEach( l => {
    traverseFonts(l, fonts);
  })
  }
}



export function copyFonts(doc, path)
{
  var fonts = [];
  doc.pages.forEach( page => {
      //check pages if they have textlayers（by utom
      console.log("Copying Fonts for page " + page.name);
      traverseFonts(page, fonts);
  });
  var fontLibraryPaths = [ "/Network/Library/Fonts/", "~/Library/Fonts/" , "/Library/Fonts/", "/System/Library/Fonts/"];
  fonts.forEach( fontName => {
    fontLibraryPaths.forEach( libraryPath => {
      try
      {
        var cmdCpy = `cp ${libraryPath}${fontName.replace(/\s/g, "-")}* ${path}`
        console.log(cmdCpy);
        execSync(cmdCpy);
        console.log(fontName + " Copied!");
      }
      catch
      {

      }
    }
    )
  })
}

export function copyImages(queuePath, fileName, doc) {
    var imageFolder = queuePath + fileName.replace(".sketch", "Images");
    let enablePreview = Settings.settingForKey(SettingKeys.ENABLE_PREVIEW) == 1
    if (enablePreview)
      generateArtboardImages(doc, queuePath + "/gx-preview/");
    console.log("Images to :" + imageFolder);
    doc.pages.forEach(page => {
        exportLayer(page, imageFolder);
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

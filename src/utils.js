import sketch from 'sketch';
import Settings from 'sketch/settings';
import { spawnSync, execSync } from '@skpm/child_process';
import { UIDialog } from './uidialog';
import { SettingKeys } from './constants';

export function getJsonDocument(doc) {
  var filePath = decodeURIComponent(doc.path);
  var fileName = decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').trim();
  var tmpFileDocumentName = `/var/tmp/${fileName}.json`;
  log("Reading Json Document:" + filePath);
  const unzipCmd = `unzip -p '${filePath}' document.json > '${tmpFileDocumentName}'`;
  log(unzipCmd);
  var exec = execSync(unzipCmd);
  if (exec) {
    var contents = readFile(`/var/tmp/${fileName}.json`);
    if (contents) {
      removeFile(tmpFileDocumentName);
      return JSON.parse(contents);
    }
  }
  return null;
}

export var output = "";
export var currentGroup = "";

export var feedbackContext = {
  actionName: "empty",
  totalSteps: 0,
  currentStep: 0,
  currentStepName: "empty"
}

export function startOperationContext(actionName, totalSteps) {
  feedbackContext.actionName = actionName;
  feedbackContext.totalSteps = totalSteps;
  feedbackContext.currentStep = 0;
  feedbackContext.currentStepName = "";
}

export function openUrl(url) {
  NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));

}
export function step(stepName) {
  feedbackContext.currentStep += 1;
  feedbackContext.currentStepName = stepName;
  console.log("STEP: " + stepName);
}


export function runOnBackground(runCommand, title, description, actionName) {
  UIDialog.setUp(context);
  const dialog = new UIDialog(title, NSMakeRect(0, 0, 400, 180), actionName, description, "Close")
  var step = 1;
  var prc = new Delegate(
    {
      'next:': function next() {
        if (!(step in steps)) {
          lbl.setString(output);
          return;
        }
        steps[step]();
        step++;
      }
    }
  );
  var timer;
  var steps = {
    1: function () {
      progress.setHidden(false);
      progress.startAnimation(nil);
      lbl.setString(output);
    },
    2: function () {
      lbl.setString(output);
    },
    3: function () {
      runCommand();
      lbl.setString(output);
    },
    4: function () {
      timer.invalidate();
      progress.stopAnimation(null);
      lbl.setString(output);
    }
  };
  var onExport = function onExport(sender) {
    step = 1;
    attachToConsole();
    timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(0.1, prc.getInstance(), 'next:', nil, true);
    NSRunLoop.currentRunLoop().addTimer_forMode(timer, NSModalPanelRunLoopMode);
  }
  dialog.setAction(onExport);
  var progress = dialog.addProgress(true, 0, 10);
  progress.setHidden(true);
  var lbl = dialog.addFullLabel("out", "", 100);
  // Run event loop
  while (true) {
    const result = dialog.run()
    if (!result) {
      dialog.finish()
      return false
    }
  }
}


var attached = false;

export function attachToConsole() {
  if (attached) {
    output = "";
    return;
  }
  attached = true;
  console.log_base = console.log;
  console.group_base = console.group;

  console.log = function (txt) {
    output = txt + "\n" + output;
    console.log_base(txt);
  };
  console.group = function (txt) {
    currentGroup = txt;
    console.group_base(txt);
  };

}

function copyRect(rect) {
  return NSMakeRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height)
}

function uuid() { return NSString.stringWithUUID(); }
// Async
export function Delegate(selectors) {
  this.uniqueName = 'DelegateClass' + uuid();
  this.classDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(this.uniqueName, NSObject);
  this.handlers = {};
  this.getClass = function () { return NSClassFromString(this.uniqueName); };
  this.getInstance = function () { return NSClassFromString(this.uniqueName).new(); };
  this.classDesc.registerClass();
  for (var s in selectors) {
    this.handlers[s] = selectors[s];
    var h = (function () { return this.handlers[s].apply(this.classDesc, arguments); }).bind(this);
    var args = [],
      regex = /:/g;
    if (regex.exec(s)) {
      args.push('arg' + args.length);
    }
    this.classDesc.addInstanceMethodWithSelector_function_(NSSelectorFromString(s), eval('(function(' + args.join(',') + '){ return h.apply(this, arguments); })'));
  }
}

export function showOperationMessage(title, message, error) {
  var alert = NSAlert.alloc().init();

  alert.accessoryView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 600, 400));
  if (error)
    alert.setAlertStyle(2);
  else
    alert.icon = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("gx.png").path());
  alert.addButtonWithTitle("Close");
  alert.addButtonWithTitle("Cancel");

  alert.setMessageText(title);
  alert.setInformativeText(message);
  var cancelButton = alert.buttons().lastObject();
  cancelButton.wantsLayer = true;
  cancelButton.layer().opacity = 0;

  alert.runModal();
}

export function isFileExist(source) {
  const manager = NSFileManager.defaultManager()
  return manager.fileExistsAtPath(source)
}

export function copyFile2(source, target) {
  const manager = NSFileManager.defaultManager()
  if (!manager.fileExistsAtPath(source)) throw new Error(`file not exist ${source}`)
  manager.copyItemAtPath_toPath_error(source, target, null)
}

export function writeToFile(path, content) {
  const resultStr = NSString.stringWithFormat('%@', content)
  resultStr.writeToFile_atomically(path, true)
}

export function removeFile(path) {
  const manager = NSFileManager.defaultManager()
  manager.removeItemAtPath_error(path, null)
}

function readFile(path) {
  return NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, null);
}

export function getFileAndQueueName(doc, queuePath) {
  var branch = "";
  var build = "";
  var fileName = decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').trim();
  var firstIndex = fileName.indexOf("(");
  var lastIndex = fileName.lastIndexOf(")");
  var betweenText = fileName.substr(0, firstIndex);
  if (firstIndex > 0 && lastIndex > 0 && lastIndex > firstIndex) {
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

export function syncFetch(url, method, body, contentType) {
  var curl_command = `curl -X ${method} -H "Content-Type: ${contentType}" -d '${body}' ${url}`

  curl_command = curl_command;
  log("syncFetch: " + curl_command);
  var out = execSync(curl_command);
  if (out && out.length > 0) {
    console.log("syncFetch output:" + out.toString());
    return out.toString();
  }
  throw new Error('curl unknown error');
}

export function syncS3PUT(url, filePath, contentType) {
  var curl_command = `curl -X PUT -T "${filePath}" -H "Content-Type: ${contentType}" -L "${url}"`;
  curl_command = curl_command;
  log("synncS3PUT: " + curl_command);
  var out = execSync(curl_command);
  // When success the length is nothing, when fail AWS is sending an XML format, so parse it.
  if (out && out.length > 0) {
    console.log("syncFetch output:" + out.toString());
    throw new Error('curl unknown error');
  }
  console.log("S3 upload OK");
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
  if (signatureObj) {
    var signature = signatureObj.toString().replace(/\r?\n|\r/, "");
    console.log("Signature: " + signature.toString());
    // Now we can try uploading by using the given signature
    var curl_command = `curl -X PUT -T "${file}" -H "Host: ${bucketName}.s3.amazonaws.com" -H "Date: ${dateValue}" -H "Content-Type: ${contentType}" -H "Authorization: AWS ${s3AccessKey}:${signature}" https://${bucketName}.s3.amazonaws.com/${fileName}`;
    console.log(curl_command);
    try {
      var out = execSync(curl_command);
      if (out) {
        // When success the lenght is nothing, when fail AWS is sending an XML format, so parse it.
        if (out.length > 0) {
          console.log("Output:" + out.toString());
          var xmlToJSON = require('xmltojson');
          var DOM = require('xmldom');
          xmlToJSON.stringToXML = (s) => new DOM.DOMParser().parseFromString(s, 'text/xml');
          var json = xmlToJSON.parseString(out.toString());
          if (json && json.Error) {
            json.Error.forEach(err => {
              if (err.Message && err.Message.length > 0) {
                errors.push(err.Message[0]._text)
              }
            }
            );
            console.log(JSON.stringify(json));
            return false;
          }
        }
        return true;
      }
    }
    catch (error) {
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
    log("Copied !")
    return true;
  }
}
export function generateArtboardImages(document, path) {
  document.pages.forEach(page => {
    var artboards = [];
    page.layers.forEach(layer => {
      // Get only artboards and skip if artboard name starts with underscore
      if (layer.type == 'Artboard' && !layer.name.startsWith('_')) {
        artboards.push(layer)
      }
    });
    var exportPath = path + page.name + '/';
    artboards.forEach(ab => {
      // Export PNG
      sketch.export(ab, { output: exportPath })
    });
  });
}

var exportLayer = function (layer, path) {

  if (layer.exportFormats && layer.exportFormats.length > 0) {
    var formats = new Array();
    var scales = new Array();
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

function getTraitsForFont(style) {
  var traits = 0;
  if (style.fontStyle == 'italic')
    traits |= NSItalicFontMask;
  if (style.fontVariant == 'small-caps')
    traits |= NSSmallCapsFontMask;

  switch (style.fontStretch) {
    case 'compressed':
      traits |= NSCompressedFontMask;
      break;
    case 'condensed':
      traits |= NSCondensedFontMask;
      break;
    case 'narrow':
      traits |= NSNarrowFontMask;
      break;
    case 'expanded':
      traits |= NSExpandedFontMask;
      break;
    case 'poster':
      traits |= NSPosterFontMask;
      break;
    default:
  }
  return traits;
}



var traverseFonts = function (layer, fonts, files) {
  if (layer.type == "Text" && layer.style.fontFamily != "Helvetica") {
    //    log(layer.style.fontFamily + "-" + layer.style.fontWeight);
    var fontManager = NSFontManager.sharedFontManager();
    if (!fontManager) {
      log("NSFontManager sharedFontManager NULL !!!");
      return;
    }
    if (layer.style.fontFamily && layer.style.fontWeight && layer.style.fontSize) {
      var nFont = layer.sketchObject.font();
      if (nFont == null)
        nFont = fontManager.fontWithFamily_traits_weight_size(layer.style.fontFamily, getTraitsForFont(layer.style), layer.style.fontWeight, layer.style.fontSize);
      if (nFont) {
        var fontName = nFont.fontName();
        //    log("FONT NAME:" + fontName);
        var urlAtt = nFont.fontDescriptor().objectForKey("NSCTFontFileURLAttribute");
        if (urlAtt && !files.includes(String(urlAtt))) {
          //     log("FONT :" + urlAtt.path());
          files.push(String(urlAtt.path()));
        }
        else {
          var font = String(fontName);
          if (!fonts.includes(font)) {
            fonts.push(String(font));
          }
        }
      } else {
        // maybe its a reference to a Variable Font, just add the familyname
        log("Font not found !! : ");
        log(layer.style.fontFamily + "-" + layer.style.fontWeight + "-" + layer.style.fontSize);
        if (!fonts.includes(layer.style.fontFamily))
          fonts.push(layer.style.fontFamily);
      }
    }
    else {
      log("Something wrong with this font: " + layer.style.fontFamily + "-" + layer.style.fontWeight + "-" + layer.style.fontSize);
    }
  }
  if (layer.layers) {
    layer.layers.forEach(l => {
      traverseFonts(l, fonts, files);
    })
  }
}

function getFiles(path) {
  console.log("Getting Files " + path);

  var lsCommand = `ls ${path}*.*`;
  try {
    var ret = execSync(lsCommand);
    if (ret) {
      return ret.toString().split('\n')
    }
  }
  catch { }
  return [];
}

function getPostcriptNames(path) {
  console.log("Getting postcriptNames " + path);
  try {
    var fontNameCmd = `mdls -name com_apple_ats_name_postscript ${path}*.* -raw`;
    var retMetadata = execSync(fontNameCmd);
    if (retMetadata)
      return retMetadata.toString();
  } catch { }
  return "";
}

function getFileName(fullPath) {
  var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
  var filename = fullPath.substring(startIndex);
  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    filename = filename.substring(1);
  }
  return filename;
}

export function copyFonts(doc, path) {
  var fonts = [];
  var files = [];
  doc.pages.forEach(page => {
    console.log("Copying Fonts for page " + page.name);
    traverseFonts(page, fonts, files);
  });
  if (fonts.length > 0) {
    log("Could not found the folloowing fonts: " + fonts);
  }
  var embeddedFonts = {};
  var document = getJsonDocument(doc);
  if (document) {
    if (document.fontReferences) {
      for (var i in document.fontReferences) {
        if (document.fontReferences[i].fontData) {
          embeddedFonts[document.fontReferences[i].fontFileName] = true;
        }
      }
    }
  }
  files.forEach(file => {
    var fileName = getFileName(file)
    if (fileName in embeddedFonts)
      log("Embedded Font " + getFileName(file));
    else {
      copyFile(file, path);
    }
  });
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

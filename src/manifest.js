const { identifier, name } = require('./identifier');

const commandList = [
  {
    name: 'Build and Deploy Prototype',
    identifier: `${identifier}.deploy-to-cloud-identifier`,
    script: './deploy-to-cloud.ts'
  },
  {
    name: "Send Sketch and Images ",
    identifier: "gxdesignops.send-to-queue-identifier",
    script: "./send-to-queue.js"
  },
  {
    name: "Send GeneXus Format",
    identifier: "gxdesignops.send-to-queue-identifier-gx",
    script: "./send-to-queue-gx-sketch.js"
  },
  {
    name: "Send only Sketch file",
    identifier: "gxdesignops.file-send-to-queue-identifier",
    script: "./send-to-queue-file.js"
  },
  {
    name: "Check for Result Page",
    identifier: "gxdesignops.see-result",
    script: "./see-result.ts"
  },
  {
    name: "Configuration",
    identifier: "gxdesignops.set-queue-path",
    script: "./set-queue-path.js"
  }
];



module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  name,
  title: "GxDesignOps",
  commands: commandList,
  menu: {
    title: name,
    items: [
      // `${identifier}.init`,
      '-',
      `${identifier}.system-info`,
    ],
  },
};

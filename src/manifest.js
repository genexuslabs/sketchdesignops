const { identifier, name } = require('./identifier');

const commandList = [
  {
    name: 'Build & Deploy Prototype',
    identifier: `${identifier}.deploy-to-cloud-identifier`,
    script: './deploy-to-cloud.ts'
  },
  {
    name: 'Check Last Status',
    identifier: `${identifier}.deploy-to-cloud-status-identifier`,
    script: './deploy-to-cloud-status.ts'
  },

  {
    name: "Send GeneXus Format",
    identifier: `${identifier}.send-to-queue-identifier-gx`,
    script: "./send-to-queue-gx-sketch.js"
  },
  {
    name: "Send only Sketch file",
    identifier: `${identifier}.file-send-to-queue-identifier`,
    script: "./send-to-queue-file.js"
  },
  {
    name: "Check for Result Page",
    identifier: `${identifier}.see-result`,
    script: "./see-result.ts"
  },
  {
    name: "Configuration",
    identifier: `${identifier}.set-queue-path`,
    script: "./set-queue-path.js"
  }
];


module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  name,
  title: "GeneXus Design Ops",
  commands: commandList,
  menu: {
    title: name,
    items: [
      `${identifier}.deploy-to-cloud-identifier`,
      `${identifier}.deploy-to-cloud-status-identifier`,
      '-',
      //`${identifier}.send-to-queue-identifier`,
      `${identifier}.send-to-queue-identifier-gx`,
      `${identifier}.file-send-to-queue-identifier`,
      `${identifier}.see-result`,
      '-',
      `${identifier}.set-queue-path`
    ],
  },
};

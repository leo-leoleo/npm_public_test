import fs from 'fs';
process.stdout.write('generate proxy.config');
// 文件是否存在
// 写入文件
const writeFile = (fileName, data) => new Promise((resolve, reject) => {
  fs.writeFile(fileName, data, (error, value) => (error ? reject(error) : resolve(value)));
});
(async function main() {
  var proxyConfigFile = 'proxy.json';
  if (fs.existsSync(proxyConfigFile)) {
    console.log('文件已经存在');
    return;
  }
  var data = [
  [
    "/vnz",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/seczo",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/network",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/subnet",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/monitorPort",
    {
      "target": "http://10.6.13.14:8081",
      "changeOrigin": true
    }
  ],
  [
    "/wf",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/system",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/image",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/flavor",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ],
  [
    "/customFlavor",
    {
      "target": "http://10.6.13.14:8080",
      "changeOrigin": true
    }
  ]
];
  await writeFile(proxyConfigFile, `${JSON.stringify(data, null, 2)}\n`);
  console.log('创建proxy.json成功');
}());
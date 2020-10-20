var readline = require('readline');
const { execSync } = require('child_process');
const { basename, dirname } = require('path');
const url = require('url');
const fs = require('fs');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const getOutname = function(targetUrl, mode) {
  const parts = url.parse(targetUrl);
  let path = parts.path.replace(/\/$/g, '').replace(/^\//g, '');
  if (path == '') {
    path = '__home';
  }
  if  (mode == 1) {
    return `${parts.host}/${path.replace(/\//g, '__')}.png`;
  } else {
    return `${targetUrl.replace('https://',  '').replace('http://', '')}/screenshot.png`;
  }
}

const takeScreenshot = function(url, outfile) {
  execSync(`mkdir -p ${dirname(outfile)}`);
  let viewport = process.env['VIEWPORT'] || '1280x960';
  let cmd = `puppeteer screenshot --viewport=${viewport} --full-page=true '${url}' > ${outfile}`;
  execSync(cmd, {stdio: 'inherit'});
}

rl.on('line', function(line) {
  console.log(line);
  let mode = process.env['MODE'];
  let outfile = `${process.cwd()}/screenshots/${getOutname(line, mode)}`;
  console.log(outfile);
  if (!process.env['DRY_RUN'] && (process.env['FORCE'] || !fs.existsSync(outfile))) {
    takeScreenshot(line, outfile);
  }
});
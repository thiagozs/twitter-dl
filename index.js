'use strict';

let _ = require('underscore');
let scrape = require('metatag-crawler');
let rest = require('restling');
let Promise = require('bluebird');
let DownloadProgress = require('download-progress');

function getfile(urls) {
  return new Promise((resolve, reject) => {
    let options = {};
    let download = DownloadProgress(urls, options);
    download.get((err) => {
      if (err) {
        reject(new Error(err));
      }
      resolve('DONE');
    });
  });
}

function parse(url) {
  return new Promise((resolve, reject) => {
    scrape(url, (err, data) => {
      rest.get(data.og.videos[0].url).then(function(result) {
        let myRegexp = /data-config=\"(.*?)\"/g;
        let match = myRegexp.exec(result.data);
        let json = match[1].replace(/\&quot;/g, '"');
        let urlvid = JSON.parse(json).video_url;
        resolve(urlvid);
      }, function(error) {
        if (error.response) {
          reject(error.response);
        }
      });
    });
  });
}

function download(url) {
  return new Promise((resolve, reject) => {
    parse(url).then((result) => {
      let urls = [{
        url: result,
        dest: 'downloads/' + result.split('/').pop()
      }];
      getfile(urls).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

let file = 'https://twitter.com/Vevo_UK/status/702605662375829505';

download(file).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

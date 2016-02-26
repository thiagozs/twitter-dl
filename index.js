'use strict';

let _ = require('underscore');
let scrape = require('metatag-crawler');
let rest = require('restling');
let Promise = require('bluebird');
let DownloadProgress = require('download-progress');
let fs = require('fs');

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

function download(url, folder) {
  return new Promise((resolve, reject) => {
    try {
      fs.lstatSync(folder).isDirectory();
      parse(url).then((result) => {
        let urls = [{
          url: result,
          dest: folder+ '/' + result.split('/').pop()
        }];
        getfile(urls).then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    } catch (err) {
      reject(new Error('Folder not exist or not writable.'));
    }
  });
}

module.exports = {
  download:download
}

// let folder = '/home/zilli/workspace/bla/downloads';
// let url = 'https://twitter.com/morenatoppp/status/702325281906925570';
//
// download(url, folder).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });

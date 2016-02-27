Twitter-dl videos
===

## TODO
- [x] Download single file.
- [ ] Download multiple files.
- [ ] Tests

## Run this Project
To run this project you need have installed
- **Node.js** (latest version)

## How to get the url from twitter

![step1](http://i.imgsafe.org/bb4d884.png "step1")

![step2](http://i.imgsafe.org/c11416d.png "step2")

Install dependencie :
```sh
npm install twitter-dl --save
```

And then just run (develpment):
```js
'use strict';

let tt = require('twitter-dl');

let folder = '/tmp';
let video = 'https://twitter.com/DierksBentley/status/703222600919588864';

tt.download(video, folder).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

...

```

### License

Copyright (c) 2016, Thiago Z S

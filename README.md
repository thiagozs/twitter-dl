Twitter-dl videos
===

## TODO
- [x] Download single file.
- [ ] Download multiple files.

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

let ttdl = require('twitter-dl');
ttdl.download('url_from_share_post_video');

...

```

If you want to run tests just run:
```sh
npm test
```

### License

Copyright (c) 2016, Thiago Z S

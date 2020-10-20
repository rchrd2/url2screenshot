 ## Usage:

It takes input from stdin and generates screenshots
```
$ cat sitemap.txt | node url2screenshot
```

Or
```
$ node url2screenshot < sitemap.txt
```

Options are set via ENV variables. Eg:

`MODE=1` creates long filenames instead of nested folders
```
$ cat sitemap.txt | MODE=1 node url2screenshot
```

`FORCE=1` creates the screenshot even if the file exists
```
$ cat sitemap.txt | FORCE=1 node url2screenshot
```

`VIEWPORT=1480x900` to change the width. `900` is ignored since they are full-height screenshots
```
$ cat sitemap.txt | VIEWPORT=1480x900 node url2screenshot.js
```

Example fetching a sitemap.xml and creating screenshots in a single command
```
$ curl https://mysite.com/sitemap.xml | /usr/local/opt/libxml2/bin/xmllint --xpath '//*[local-name()="loc"]/text()' | DRY_RUN=1 node url2screenshot
```

## Requirements:

`puppeteer-cli` is required, and my fork is recommended. YYMV

```
npm i -g git+https://github.com/rchrd2/puppeteer-cli.git
```
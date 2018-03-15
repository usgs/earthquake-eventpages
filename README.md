# Earthquake Event Pages

[![Build Status](https://travis-ci.org/usgs/earthquake-eventpages.svg?branch=master)](https://travis-ci.org/usgs/earthquake-eventpages)
[![Quality Badge](https://api.codacy.com/project/badge/Grade/530313b3177648c2b31eec342c47e719)](https://www.codacy.com/app/usgs/earthquake-eventpages?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=usgs/earthquake-eventpages&amp;utm_campaign=Badge_Grade)
[![Coverage Badge](https://api.codacy.com/project/badge/Coverage/530313b3177648c2b31eec342c47e719)](https://www.codacy.com/app/usgs/earthquake-eventpages?utm_source=github.com&utm_medium=referral&utm_content=usgs/earthquake-eventpages&utm_campaign=Badge_Coverage)


> This application is currently being overhauled to an Angular framework. To
> view the latest working code prior to this process, please view the
> [master-pre-angular branch](https://github.com/usgs/earthquake-eventpages/tree/master-pre-angular).
>
> Alternatively, please review our [previous releases](https://github.com/usgs/earthquake-eventpages/releases).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in
the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

> NOTE: this uses `npm run` instead of `ng` in order to run using a custom `e2e` environment,
> and mock selected api requests for more stable testing data.

## Docker

The application may be run as a Docker container. A public image is available
on Docker Hub at https://hub.docker.com/r/usgs/earthquake-eventpages this can
be run most simply with:

```
$ docker run -p HOST_PORT:80 -d usgs/earthquake-eventpages
```

The `HOST_PORT` should be replaced with a port on your container host that is
not otherwise being used. One may then access the event pages at:

```
http://localhost:HOST_PORT/event/EVENT_ID
```

The `HOST_PORT` should be replaced with the same value used when starting the
container. The `EVENT_ID` should be the event id for the event you wish to
view, for example "us2000ahv0".

### Customization

When starting the container, there are several options from the `usgs/nginx`
image that remain available. See https://hub.docker.com/r/usgs/nginx/ for
details on these options.

Additionally, one may specify a custom `BASE_HREF` environment variables to
have the container use a different path, for example:

```
$ docker run -p HOST_PORT:80 -d \
    -e BASE_HREF=some/path \
    usgs/earthquake-eventpages
```

It is important to note that the `BASE_HREF` should have neither a leading or
trailing slash. Intermediate slashes are acceptable, for example:

**Bad**
 - `/somepath`
 - `/some/path`
 - `/some/path`
 - `/some/path/`
 - `somepath/`

**Good**
 - `somepath`
 - `some/path`

One may then access the event pages at:

```
http://localhost:HOST_PORT/BASE_HREF/EVENT_ID
```

### Building

One may additionally choose to build the image from source. This is facilitated
using the included Dockerfile and may be accomplished with:

```
$ docker build -t IMAGE_NAME:IMAGE_TAG .
```

One may additionally specify a default `BASE_HREF` as a build argument. This
will cause all containers based on the generated image to use the provided
`BASE_HREF` by default.

```
$ docker build --build-arg BASE_HREF=some/path
```

While containers will use the specified value by default, this value may still
be overridden at runtime as described above.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

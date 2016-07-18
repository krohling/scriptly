Scriptly
=======

##Dynamically load scripts and CSS in the browser with a friendly Promise based API.

Scriptly is developed with a Promises API to make it super easy to setup and use.  It's also built with React developers in mind.  [Since FB is recommending against the use of mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html), Scriptly provides a great alternative to other mixin based libraries.

Quick start
-------

  ```shell
  npm install scriptly
  ```
  
Usage
-------

Give Scriptly the url to your script.  Everything else works just how you'd expect it!

```js
Scriptly.loadJavascript('https://path/to/my/script.js')
        .then(() => {
          console.log("script loaded!");
        }, (err) => {
          console.log("oops!");
        });
```

Here's how you would dynamically load the Stripe Checkout library and setup your Publishable Key.

```js
Scriptly.loadJavascript('https://js.stripe.com/v2/')
        .then(() => {
          Stripe.setPublishableKey("MY-STRIPE-PUBLISHABLE-KEY");
        }, (err) => {
          console.log("Failed to load Stripe library");
        });
```
  
Scriptly also works with CSS stylesheets.

```js
Scriptly.loadCSS('/path/to/stylesheet.css')
        .then(() => {
          console.log("CSS loaded!");
        }, (err) => {
          console.log("oops!");
        });
```


Just pass an Array if you'd like to load more than one file at a time.

```js
Scriptly.loadJavascript(['/path/to/stylesheet1.css', '/path/to/stylesheet2.css'])
        .then(() => {
          console.log("All CSS files loaded!");
        }, (err) => {
          console.log("oops!");
        });
```

Or if you want to load a mix of JS and CSS files all at once.

```js
let elements = [
    { url: 'css/jquery-ui.min.css', type: 'css' },
    { url: 'css/jquery-ui.structure.min.css', type: 'css' },
    { url: 'css/jquery-ui.theme.min.css', type: 'css' },
    { url: 'css/nigran.datepicker.css', type: 'css' },
    { url: '/vendor/jquery-ui.js', type: 'js' },
];

Scriptly.loadAll(elements);
        .then(() => {
          console.log("All JS and CSS files loaded!");
        }, (err) => {
          console.log("oops!");
        });
```



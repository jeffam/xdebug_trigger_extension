# Basic extension for xdebug v3 trigger setting

This extension adds a browser action button that will toggle the `XDEBUG_TRIGGER` cookie for the current domain.

In your xdebug (version 3 and up) settings in PHP, you can set `xdebug.start_with_request = trigger` to start a session when the cookie is present.

This extension sets the cookie value to `1`, so it requires that you configure `xdebug.trigger_value` in PHP to be an empty value (which is its default).

## Development

To build the extension, run:

```
$ npm run build
```

Firefox will not install any extensions that aren't signed. See _Signing your extension for self-distribution_ at https://extensionworkshop.com for more info.

let setBrowserPolicies = () => {
  // BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  // BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
  // BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
  // //Content-Security-Policy: script-src 'self' https://apis.google.com
  // //Content-Security-Policy: script-src 'self' https://apis.google.com
  // /*
  // "script-src 'self' 'unsafe-inline'".
  // */
  //
  // // BrowserPolicy.framing.disallow();
  // // BrowserPolicy.content.disallowInlineScripts();
  // // BrowserPolicy.content.disallowEval();
  // BrowserPolicy.content.allowInlineStyles();
  // BrowserPolicy.content.allowFontDataUrl();

  var trusted = [
    '*.googleapis.com',
    'mts0.googleapis.com',
    'csi.gstatic.com',
    'maps.googleapis.com',
    'googleapis.com',
    'gstatic.com',
    'ajax.googleapis.com',
    'google-analytics.com'
  ];

  _.each(trusted, function(origin) {
    origin = "https://" + origin;
    BrowserPolicy.content.allowOriginForAll(origin);
    BrowserPolicy.content.allowFrameOrigin(origin);
    BrowserPolicy.content.allowEval(origin);
  });

  BrowserPolicy.content.allowImageOrigin('https://maps.gstatic.com');
  BrowserPolicy.content.allowFontOrigin('https://fonts.gstatic.com');
};

Modules.server.setBrowserPolicies = setBrowserPolicies;

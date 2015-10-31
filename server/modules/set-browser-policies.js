let setBrowserPolicies = () => {

  var trusted = [
    '*.googleapis.com',
    '*.gstatic.com',
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

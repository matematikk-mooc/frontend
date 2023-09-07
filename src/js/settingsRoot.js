
var settingsRoot = {

    hrefQueryString: "?design=udir",
    hrefAmpQueryString: "&design=udir",
    feideEnrollRefferers: [
      "design=udir",
      "enroll_code",
      "kslaring.no"
    ],
    kpasApiUrl: KPASAPIURL
};
if (typeof module !== 'undefined' && module !== null) {
  module.exports = settingsRoot;
}

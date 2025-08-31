// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    newsApiKey: '5ef3812caf35411094c7d48b4c0f62cf', // Reemplazar con tu API key
    secretKey: 'CLAVE_SECRETA_PARA_ENCRIPTACION',
    apiUrl: {
      news: 'https://newsapi.org/v2',
      flags: 'https://countriesnow.space/api/v0.1/countries/flag/unicode'
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

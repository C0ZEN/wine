/**
 * Fix an error: Uncaught ReferenceError: global is not defined
 * https://github.com/aws-amplify/amplify-js/issues/678
 */
(window as any).global = window;

import 'core-js/es7/array';
import 'core-js/es7/reflect';
import 'intersection-observer';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-error';

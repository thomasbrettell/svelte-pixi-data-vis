import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';
import './global.css';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';

// gsap.ticker.remove(gsap.updateRoot);

// console.log(PIXI.Ticker.shared);

// PIXI.Ticker.shared.add(() => {
//   // console.log(PIXI.Ticker.shared.lastTime / 1000);
//   gsap.updateRoot(PIXI.Ticker.shared.lastTime / 1000);
// });

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

let appMountEl;
let appProps;

whenOdysseyLoaded.then(() => {
  [appMountEl] = selectMounts('sveltepixidatavis');

  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl));
    new App({
      target: appMountEl,
      props: appProps
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[svelte-pixi-data-vis] public path: ${__webpack_public_path__}`);
}

import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';
import './global.css';

whenOdysseyLoaded.then(() => {
  const mounts = selectMounts('sveltepixidatavis');

  mounts.forEach(mount => {
    new App({
      target: mount
    });
  });
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[svelte-pixi-data-vis] public path: ${__webpack_public_path__}`);
}

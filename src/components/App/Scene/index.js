import * as PIXI from 'pixi.js';
import tinycolor from 'tinycolor2';
import { DATA_AMOUNT, RESOLUTION } from '../../../constants';
import { tweenValue } from '../../../utils';

export const initScene = ({ rootEl, fps }) => {
  const id = `sveltepixidatavis-${Math.random()}`;

  const app = new PIXI.Application({
    background: 0xffffff,
    resizeTo: rootEl,
    backgroundAlpha: 0,
    antialias: true,
    resolution: RESOLUTION
  });

  rootEl.appendChild(app.view);

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      app.start();
    } else {
      app.stop();
    }
  });
  io.observe(rootEl);

  const c = new PIXI.Graphics();
  c.beginFill(0xffffff);
  c.drawCircle(0, 0, 5);
  const circleTexture = app.renderer.generateTexture(c, {
    resolution: RESOLUTION * 2,
    scaleMode: PIXI.SCALE_MODES.LINEAR
  });
  c.destroy();

  const particles = new PIXI.ParticleContainer(DATA_AMOUNT, {
    scale: true,
    position: true,
    alpha: true,
    tint: true
  });

  app.stage.addChild(particles);

  const circles = [];

  for (let i = 0; i < DATA_AMOUNT; i++) {
    const circle = new PIXI.Sprite(circleTexture);
    circle.tint = tinycolor.random().toHexString();

    circle.anchor.set(0.5);

    circle.x = rootEl.clientWidth * Math.random();
    circle.y = rootEl.clientHeight * Math.random();

    circles.push(circle);

    particles.addChild(circle);

    circle.targets = {
      x: { curr: circle.x, val: null, p: 0 },
      y: { curr: circle.y, val: null, p: 0 },
      scale: { curr: circle.scale.x, val: null, p: 0 },
      alpha: { curr: circle.alpha, val: null, p: 0 },
      tint: {
        curr: circle.tint,
        val: null,
        p: 0
      }
    };
  }

  const setNewTargets = () => {
    let newColor;
    if (Math.random() < 0.5) {
      newColor = tinycolor.random().toHexString();
    }

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      circle.targets.x.p = 1;
      circle.targets.y.p = 1;
      circle.targets.scale.p = 1;
      circle.targets.alpha.p = 1;
      circle.targets.tint.p = 1;

      circle.targets.x.curr = circle.x;
      circle.targets.y.curr = circle.y;
      circle.targets.scale.curr = circle.scale.x;
      circle.targets.alpha.curr = circle.alpha;
      circle.targets.tint.curr = circle.tint;

      circle.targets.x.val = rootEl.clientWidth * Math.random();
      circle.targets.y.val = rootEl.clientHeight * Math.random();
      circle.targets.scale.val = Math.random() * 2;
      circle.targets.alpha.val = Math.random();

      if (newColor) {
        circle.targets.tint.val = newColor;
      } else {
        circle.targets.tint.val = tinycolor.random().toHexString();
      }

      circle.targets.x.p = 0;
      circle.targets.y.p = 0;
      circle.targets.scale.p = 0;
      circle.targets.alpha.p = 0;
      circle.targets.tint.p = 0;
    }
  };

  app.ticker.add(() => {
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      circle.x = tweenValue(circle.targets.x, app.ticker.elapsedMS, circle.x);
      circle.y = tweenValue(circle.targets.y, app.ticker.elapsedMS, circle.y);

      circle.alpha = tweenValue(circle.targets.alpha, app.ticker.elapsedMS, circle.alpha);

      circle.scale.set(tweenValue(circle.targets.scale, app.ticker.elapsedMS, circle.scale.x));

      circle.tint = tweenValue(circle.targets.tint, app.ticker.elapsedMS, circle.tint, {
        color: true
      });
    }

    fps.set(Math.round(app.ticker.FPS));
  });

  return setNewTargets;
};

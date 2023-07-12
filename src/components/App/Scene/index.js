import * as PIXI from 'pixi.js';
import tinycolor from 'tinycolor2';

export const initScene = ({ rootEl, fps }) => {
  const app = new PIXI.Application({
    background: 0xffffff,
    resizeTo: rootEl,
    backgroundAlpha: 0,
    antialias: true,
    resolution: window.devicePixelRatio || 1
  });

  rootEl.appendChild(app.view);

  const graphic = new PIXI.Graphics();
  graphic.beginFill(0x0000ff);
  graphic.drawRect(0, 0, 50, 50);
  graphic.position.set(rootEl.clientWidth / 2, rootEl.clientHeight / 2);

  const c = new PIXI.Graphics();
  c.beginFill(0xffffff);
  c.drawCircle(0, 0, 5);
  const circleTexture = app.renderer.generateTexture(c, {
    resolution: window.devicePixelRatio * 2,
    scaleMode: PIXI.SCALE_MODES.LINEAR
  });
  c.destroy();

  const CIRCLES_AMOUNT = 1000;

  const particles = new PIXI.ParticleContainer(CIRCLES_AMOUNT, {
    scale: true,
    position: true,
    alpha: true,
    tint: true
  });

  app.stage.addChild(particles);

  const circles = [];

  for (let i = 0; i < CIRCLES_AMOUNT; i++) {
    const circle = new PIXI.Sprite(circleTexture);
    circle.tint = tinycolor.random().toHexString();

    circle.anchor.set(0.5);

    // circle.scale = 1;

    // scatter them all
    circle.x = rootEl.clientWidth * Math.random();
    circle.y = rootEl.clientHeight * Math.random();

    // create a random direction in radians
    circle.direction = Math.random() * Math.PI * 2;

    // this number will be used to modify the direction of the sprite over time
    circle.turningSpeed = Math.random() - 0.8;

    // create a random speed between 0 - 2, and these maggots are slooww
    circle.speed = (2 + Math.random() * 2) * 0.2;

    circle.offset = Math.random() * 100;

    circles.push(circle);

    particles.addChild(circle);

    circle.targets = {
      x: { curr: circle.x, val: rootEl.clientWidth * Math.random(), p: 0 },
      y: { curr: circle.y, val: rootEl.clientHeight * Math.random(), p: 0 },
      scale: { curr: circle.scale.x, val: Math.random() * 2, p: 0 },
      alpha: { curr: circle.alpha, val: 0, p: 0 }
    };
  }

  graphic.pivot.set(graphic.width / 2, graphic.height / 2);
  app.stage.addChild(graphic);

  function lerp(x, y, t) {
    return (1 - t) * x + t * y;
  }

  const TWEEN_DURATION = 5000;

  const tweenValue = (target, ms, currentValue) => {
    if (target.p >= 1) return currentValue;
    target.p += ms / TWEEN_DURATION;

    return lerp(target.curr, target.val, target.p);
  };

  app.ticker.add(() => {
    graphic.rotation += 0.01;

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      circle.x = tweenValue(circle.targets.x, app.ticker.elapsedMS, circle.x);
      circle.y = tweenValue(circle.targets.y, app.ticker.elapsedMS, circle.y);

      circle.alpha = tweenValue(circle.targets.alpha, app.ticker.elapsedMS, circle.alpha);

      circle.scale.set(tweenValue(circle.targets.scale, app.ticker.elapsedMS, circle.scale.x));
    }

    fps.set(Math.round(app.ticker.FPS));
  });

  const setNewTargets = () => {
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      circle.targets.x.p = 1;
      circle.targets.y.p = 1;
      circle.targets.scale.p = 1;
      circle.targets.alpha.p = 1;

      circle.targets.x.curr = circle.x;
      circle.targets.y.curr = circle.y;
      circle.targets.scale.curr = circle.scale.x;
      circle.targets.alpha.curr = circle.alpha;

      circle.targets.x.val = rootEl.clientWidth * Math.random();
      circle.targets.y.val = rootEl.clientHeight * Math.random();
      circle.targets.scale.val = Math.random() * 2;
      circle.targets.alpha.val = 1;

      circle.targets.x.p = 0;
      circle.targets.y.p = 0;
      circle.targets.scale.p = 0;
      circle.targets.alpha.p = 0;
    }
  };

  return setNewTargets;
};

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

  const c = new PIXI.Graphics();
  c.beginFill(0xffffff);
  c.drawCircle(0, 0, 5);

  const texture = app.renderer.generateTexture(c);

  const CIRCLES_AMOUNT = 10000;

  const particles = new PIXI.ParticleContainer(CIRCLES_AMOUNT, {
    scale: true,
    position: true,
    alpha: true,
    tint: true
  });

  app.stage.addChild(particles);

  const circles = [];

  for (let i = 0; i < CIRCLES_AMOUNT; i++) {
    const circle = new PIXI.Sprite(texture);
    circle.tint = tinycolor.random().toHexString();

    circle.anchor.set(0.5);

    // circle.scale = 1;

    // scatter them all
    circle.x = Math.random() * app.screen.width;
    circle.y = Math.random() * app.screen.height;

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
      x: { val: rootEl.clientWidth * Math.random(), p: 0 },
      y: { val: rootEl.clientHeight * Math.random(), p: 0 },
      scale: { val: Math.random() * 2, p: 0 },
      alpha: { val: Math.random(), p: 0 }
    };

    //     gsap.ticker.remove(gsap.updateRoot);

    // // Update gsap with PIXI ticker.
    // PIXI.ticker.shared.add( (deltaTime) => {
    //   gsap.updateRoot(deltaTime );
    // });

    // gsap.to(circle, {
    //   duration: 5,
    //   repeat: -1,
    //   pixi: circle.targets
    // });

    // const tl = gsap.timeline({
    //   repeat: -1,
    //   defaults: {
    //     duration: 5
    //   }
    // });

    // // tl.to(circle, {
    // //   x: app.view.width * Math.random(),
    // //   y: app.view.height * Math.random(),
    // //   alpha: Math.random()
    // // });

    // gsap.to(circle.scale, {
    //   x: scale,
    //   y: scale
    // });
  }

  // for (let i = 0; i < 10000; i++) {
  //   const length = app.view.width * Math.random();

  //   const circle = new PIXI.Graphics(circleGeometry);
  //   circle.tint = 0xff0000;

  //   app.stage.addChild(circle);

  //   const tl = gsap.timeline({
  //     repeat: -1,
  //     delay: 10 * Math.random()
  //   });

  //   tl.to(circle, {
  //     x: length,
  //     y: length,
  //     duration: 3,
  //     alpha: 0
  //   });

  //   tl.to(circle, {
  //     x: 0,
  //     y: length,
  //     duration: 3
  //   });

  //   tl.to(circle, {
  //     x: length,
  //     y: 0,
  //     duration: 3
  //   });

  //   tl.to(circle, {
  //     x: 0,
  //     y: 0,
  //     duration: 3,
  //     alpha: 1
  //   });
  // }

  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
  };

  let p = 0;

  app.ticker.add(dt => {
    // p += dt * 0.001;

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      circle.x = lerp(circle.x, circle.targets.x.val, 0.01);
      circle.y = lerp(circle.y, circle.targets.y.val, 0.01);

      const scale = lerp(circle.scale.x, circle.targets.scale.val, 0.01);
      circle.scale.set(scale, scale);

      circle.alpha = lerp(circle.alpha, circle.targets.alpha.val, 0.01);
    }

    fps.set(app.ticker.FPS);
  });
};

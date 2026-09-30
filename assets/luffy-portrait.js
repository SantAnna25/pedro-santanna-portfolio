// A curved portrait surface with a few transparent depth layers. The image
// stays recognizable while the existing scene rotates it in three dimensions.
export function createLuffyPortrait({
  Group, Mesh, BufferGeometry, BufferAttribute, ShaderMaterial,
  BasicMaterial, Vector2, DoubleSide, texture, pixelRatio,
}) {
  const portrait = new Group();
  portrait.name = 'Luffy monochrome portrait';

  const width = 1.04;
  const height = width * texture.image.height / texture.image.width;
  const columns = 48;
  const rows = 52;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    const y = (v - .5) * height;
    for (let column = 0; column <= columns; column++) {
      const u = column / columns;
      const x = (u - .5) * width;
      const bow = .115 * (1 - Math.pow(2 * u - 1, 2));
      const cheek = .018 * (1 - Math.pow(2 * v - 1, 2));
      positions.push(x, y, bow + cheek);
      uvs.push(u, v);
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const a = row * (columns + 1) + column;
      const b = a + columns + 1;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }

  const surface = new BufferGeometry();
  surface.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  surface.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  surface.setIndex(indices);
  surface.computeVertexNormals();

  const rear = new Mesh(surface, new BasicMaterial({
    map: texture,
    color: 0x420d19,
    transparent: true,
    opacity: .52,
    depthWrite: false,
    side: DoubleSide,
  }));
  rear.name = 'portrait depth';
  rear.position.z = -.085;
  rear.scale.set(1.055, 1.055, 1);
  portrait.add(rear);

  const middle = new Mesh(surface, new BasicMaterial({
    map: texture,
    color: 0x75303a,
    transparent: true,
    opacity: .28,
    depthWrite: false,
    side: DoubleSide,
  }));
  middle.name = 'portrait rim';
  middle.position.z = -.036;
  middle.scale.set(1.024, 1.024, 1);
  portrait.add(middle);

  const frontMaterial = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new Vector2() },
      uResolution: { value: new Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio) },
      uDpr: { value: pixelRatio },
      uSweepY: { value: -3 },
      uReveal: { value: -3 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vWorldY;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = viewPosition.xyz;
        vWorldY = (modelMatrix * vec4(position, 1.0)).y;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uSweepY;
      uniform float uReveal;
      uniform float uDpr;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vWorldY;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec4 ink = texture2D(uTexture, vUv);
        if (ink.a < 0.025 || vWorldY > uReveal) discard;

        float gray = dot(ink.rgb, vec3(.299, .587, .114));
        gray = smoothstep(.055, .96, gray);
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(-vViewPosition);
        float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.7);
        float grain = sin(gl_FragCoord.x * .7 / uDpr + uTime * .55)
                    * sin(gl_FragCoord.y * .71 / uDpr - uTime * .38) * .018;
        vec3 color = vec3(clamp(gray * .94 + grain, 0.0, 1.0));
        color += vec3(.29, .07, .10) * rim * .35;

        float scanActive = 1.0 - smoothstep(2.4, 3.0, abs(uSweepY));
        float distanceToScan = abs(vWorldY - uSweepY);
        float scan = exp(-distanceToScan * 15.0) * scanActive;
        color += vec3(.95, .10, .20) * scan * .70;
        color += vec3(1.0, .66, .70) * exp(-distanceToScan * 45.0) * scanActive * .55;

        float pointerLight = max(0.0, 1.0 - distance(vUv, uMouse * .18 + .5) * 2.4);
        color += vec3(.14, .04, .06) * pointerLight * gray;
        gl_FragColor = vec4(color, ink.a);
      }
    `,
  });

  const front = new Mesh(surface, frontMaterial);
  front.name = 'curved black and white Luffy face';
  front.position.z = .005;
  portrait.add(front);
  portrait.userData.front = front;
  portrait.userData.shader = frontMaterial;
  return portrait;
}

export function animateLuffyPortrait(portrait, time, pointer) {
  const front = portrait.userData.front;
  if (!front) return;
  front.position.z = .005 + Math.sin(time * 1.4) * .003;
  front.rotation.z = Math.sin(time * .8) * .004 + pointer.x * .004;
}

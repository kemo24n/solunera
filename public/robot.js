/* Solunera S-01: an android bust, still being assembled. Watches, blinks, keeps building.
 * Head geometry: Lee Perry-Smith head scan by Infinite Realities (CC BY 3.0), via the three.js examples.
 * Plain Three.js (global THREE). Built by Solunera, Kamel Nassif. */
(function () {
  'use strict';
  var canvas = document.getElementById('s01');
  if (!canvas || !window.THREE) return;
  var T = window.THREE;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base = (document.currentScript && document.currentScript.src || '').replace(/robot\.js.*$/, '');

  var renderer;
  try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch (e) { document.documentElement.classList.add('no-gl'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;

  var scene = new T.Scene();
  var camera = new T.PerspectiveCamera(22, 1, 0.1, 50);
  var LOOK = new T.Vector3(0, 0.3, 0);

  /* ---------- studio: hard key, dark fill, bright rim ---------- */
  (function () {
    var env = new T.Scene(); env.background = new T.Color(0x2a2724);
    function box(w, h, x, y, z, c, i) { var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(i), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); }
    box(5, 3, -5, 5, 4, 0xfff4e6, 4.0);
    box(2, 8, 6, 0.5, -2, 0xffffff, 2.2);
    box(8, 1.2, 0, -5, 3, 0xcfc4b4, 0.6);
    box(3, 3, 3, 4, -5, 0xffd2c2, 1.2);
    var pm = new T.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(env, 0.02).texture; pm.dispose();
  })();
  var key = new T.DirectionalLight(0xfff3e4, 2.6); key.position.set(-2.5, 3, 3.2); scene.add(key);
  var rim = new T.DirectionalLight(0xffe2d6, 2.2); rim.position.set(3, 1.2, -2.5); scene.add(rim);
  var rim2 = new T.DirectionalLight(0xffffff, 0.9); rim2.position.set(-3, 0.5, -2.5); scene.add(rim2);
  scene.add(new T.HemisphereLight(0xfff8ee, 0x2c2723, 0.18));

  /* ---------- shared shader pieces ---------- */
  var SIGNAL = new T.Color(0xff3b1f);
  var PIVOT = new T.Vector3(0, -0.08, -0.06);
  var EYE_X = 0.142, EYE_Y = 0.432, EYE_Z = 0.436, ER = 0.056;
  var U = { uProg: { value: 0.62 }, uTime: { value: 0 }, uHead: { value: new T.Matrix3() }, uPivot: { value: PIVOT } };
  var FIELD = [
    'float h3(vec3 c){ return fract(sin(dot(c, vec3(12.9898,78.233,37.719)))*43758.5453); }',
    'float buildF(vec3 p){',
    '  vec3 cell = floor(p*vec3(24.0,24.0,24.0));',
    '  float f = 0.47 + 0.95*p.x - 0.10*p.y + 0.05*sin(13.0*p.y+4.0*p.z);',
    '  f += 3.2*max(0.0, -0.27 - p.y);',
    '  return f + (h3(cell)-0.5)*0.06;',
    '}',
    'float headW(vec3 p){ return smoothstep(-0.32, -0.04, p.y); }'
  ].join('\n');
  var BEND_V = [
    'uniform mat3 uHead; uniform vec3 uPivot;',
    'vec3 bendP(vec3 p){ return mix(p, uHead*(p-uPivot)+uPivot, headW(p)); }',
    'vec3 bendN(vec3 p, vec3 n){ return normalize(mix(n, uHead*n, headW(p))); }'
  ].join('\n');
  function h3js(x, y, z) { var v = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453; return v - Math.floor(v); }
  function buildF(x, y, z) {
    var f = 0.47 + 0.95 * x - 0.10 * y + 0.05 * Math.sin(13 * y + 4 * z);
    f += 3.2 * Math.max(0, -0.27 - y);
    return f + (h3js(Math.floor(x * 24), Math.floor(y * 24), Math.floor(z * 24)) - 0.5) * 0.06;
  }

  var root = new T.Group(); scene.add(root);
  var headGroup = new T.Group(); headGroup.position.copy(PIVOT); root.add(headGroup);
  var headInner = new T.Group(); headInner.position.copy(PIVOT).multiplyScalar(-1); headGroup.add(headInner);
  var eyes = [], leds = [], ready = false;

  Promise.all([
    (window.S01_HEAD ? Promise.resolve(window.S01_HEAD) : Promise.reject(new Error('head'))).then(function (b64) {
      var bin = atob(b64), u8 = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i); return u8.buffer;
    }),
    new Promise(function (res) { new T.TextureLoader().load(base + 's01/detail.jpg', res, undefined, function () { res(null); }); })
  ]).then(function (r) { build(r[0], r[1]); }).catch(function () { document.documentElement.classList.add('no-gl'); });

  function decode(buf) {
    var dv = new DataView(buf), nv = dv.getUint32(0, true), ni = dv.getUint32(4, true), o = 16, i;
    var P = new Float32Array(nv * 3); for (i = 0; i < nv * 3; i++) { P[i] = dv.getInt16(o, true) / 32767 * 1.2; o += 2; }
    var N = new Float32Array(nv * 3); for (i = 0; i < nv * 3; i++) { N[i] = dv.getInt8(o) / 127; o += 1; }
    if (o % 2) o++;
    var UV = new Float32Array(nv * 2); for (i = 0; i < nv * 2; i++) { UV[i] = dv.getUint16(o, true) / 65535; o += 2; }
    var I = new Uint16Array(buf.slice(o, o + ni * 2));
    var g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(P, 3));
    g.setAttribute('normal', new T.BufferAttribute(N, 3));
    g.setAttribute('uv', new T.BufferAttribute(UV, 2));
    g.setIndex(new T.BufferAttribute(I, 1));
    return g;
  }
  function hookBend(sh) {
    sh.uniforms.uHead = U.uHead; sh.uniforms.uPivot = U.uPivot; sh.uniforms.uProg = U.uProg; sh.uniforms.uTime = U.uTime;
    sh.vertexShader = 'varying vec3 vObj;\nuniform float uProg;\n' + FIELD + '\n' + BEND_V + '\n' + sh.vertexShader
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nobjectNormal = bendN(position, objectNormal);')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObj = position;\ntransformed = bendP(position);');
  }

  function build(buf, detail) {
    var geo = decode(buf);

    /* ----- outer shell: white synthetic skin cut into plates ----- */
    var shellMat = new T.MeshPhysicalMaterial({
      color: 0xefebe4, roughness: 0.42, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.35,
      sheen: 0.4, sheenColor: new T.Color(0xfff1e8), sheenRoughness: 0.5, side: T.DoubleSide,
      normalMap: detail || null, normalScale: new T.Vector2(0.55, 0.55)
    });
    var EX = EYE_X.toFixed(3), EY = EYE_Y.toFixed(3);
    shellMat.onBeforeCompile = function (sh) {
      hookBend(sh);
      sh.fragmentShader = 'varying vec3 vObj;\nuniform float uProg;\nuniform float uTime;\n' + FIELD + '\n' +
        'float eyeHole(vec3 p){ vec2 d = vec2(abs(p.x) - ' + EX + ', p.y - ' + EY + '); d.y -= 0.06*d.x; return (d.x*d.x)/(0.057*0.057) + (d.y*d.y)/(0.0195*0.0195) * (1.0 + 2.2*abs(d.x)/0.057); }\n' +
        'float seamD(vec3 p){\n' +
        '  float s = 1.0; float ax = abs(p.x);\n' +
        '  if (p.z > 0.05) {\n' +
        '    s = min(s, abs(length(vec2(p.x/0.37, (p.y-0.40)/0.58)) - 1.0) * 0.40);\n' +
        '    if (ax < 0.30 && p.y > 0.52) s = min(s, abs(p.y - 0.60 - 0.30*p.x*p.x));\n' +
        '    if (p.y > 0.60) s = min(s, ax + 0.0004);\n' +
        '    if (p.y < 0.36 && p.y > -0.02) s = min(s, abs(ax - 0.205 - 0.30*(0.36-p.y)*(0.36-p.y)));\n' +
        '    if (p.y < 0.06) s = min(s, abs(p.y + 0.01 - 0.55*p.x*p.x) );\n' +
        '  } else {\n' +
        '    if (p.y > 0.55) s = min(s, ax);\n' +
        '    s = min(s, abs(p.z + 0.06));\n' +
        '  }\n' +
        '  if (p.y < -0.10 && p.y > -0.30) s = min(s, abs(fract((p.y + 0.10) * 14.0) - 0.5) / 14.0);\n' +
        '  return s;\n' +
        '}\n' +
        sh.fragmentShader
          .replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\n' +
            'float bf = buildF(vObj);\n' +
            'if (bf > uProg) discard;\n' +
            'if (vObj.z > 0.36 && eyeHole(vObj) < 1.0) discard;\n' +
            'float sd = seamD(vObj);\n' +
            'if (sd < 0.0017) discard;\n' +
            'float groove = smoothstep(0.0017, 0.006, sd);\n' +
            'float edge = 1.0 - smoothstep(0.0, 0.02, uProg - bf);')
          .replace('#include <color_fragment>', '#include <color_fragment>\n' +
            'diffuseColor.rgb *= mix(0.45, 1.0, groove);\n' +
            'if (!gl_FrontFacing) diffuseColor.rgb = vec3(0.05,0.046,0.043);')
          .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(0.9, roughnessFactor, groove);')
          .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n' +
            'totalEmissiveRadiance += vec3(1.0,0.24,0.1) * edge * (1.1 + 0.5*sin(uTime*5.0 + vObj.y*40.0));');
    };
    root.add(new T.Mesh(geo, shellMat));

    /* ----- blueprint wire over the unbuilt part ----- */
    var wireMat = new T.ShaderMaterial({
      uniforms: { uHead: U.uHead, uPivot: U.uPivot, uProg: U.uProg, uTime: U.uTime },
      transparent: true, depthWrite: false,
      vertexShader: 'uniform float uProg; varying vec3 vObj;\n' + FIELD + '\n' + BEND_V + '\nvoid main(){ vObj = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(bendP(position), 1.0); }',
      fragmentShader: 'uniform float uProg; uniform float uTime; varying vec3 vObj;\n' + FIELD + '\nvoid main(){ float bf = buildF(vObj); if (bf < uProg - 0.01) discard; float near = 1.0 - smoothstep(0.0, 0.5, bf - uProg); vec3 ink = vec3(0.09,0.085,0.08); vec3 c = mix(ink, vec3(1.0,0.26,0.12), (1.0-smoothstep(0.0,0.05,bf-uProg))*0.8); gl_FragColor = vec4(c, 0.22 + 0.45*near); }'
    });
    root.add(new T.LineSegments(new T.WireframeGeometry(geo), wireMat));

    /* ----- graphite skull underneath ----- */
    var inner = geo.clone(), ip = inner.attributes.position, c = new T.Vector3(0, 0.42, 0.02), i;
    for (i = 0; i < ip.count; i++) {
      var x = ip.getX(i), y = ip.getY(i), z = ip.getZ(i), hd = y > -0.15, k = hd ? 0.90 : 0.86;
      ip.setXYZ(i, c.x + (x - c.x) * k, hd ? c.y + (y - c.y) * k : y, c.z + (z - c.z) * k - 0.01);
    }
    inner.computeVertexNormals();
    var innerMat = new T.MeshPhysicalMaterial({ color: 0x23201d, roughness: 0.32, metalness: 0.85, clearcoat: 0.6, clearcoatRoughness: 0.2 });
    innerMat.onBeforeCompile = function (sh) {
      hookBend(sh);
      sh.fragmentShader = 'varying vec3 vObj;\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n' +
        'if (vObj.y < -0.42) discard;\n' +
        'vec2 g = abs(fract(vObj.xy * vec2(22.0, 22.0)) - 0.5);\n' +
        'float grid = smoothstep(0.47, 0.5, max(g.x, g.y));\n' +
        'diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42,0.39,0.35), grid*0.55);');
    };
    root.add(new T.Mesh(inner, innerMat));

    var cableMat = new T.MeshPhysicalMaterial({ color: 0x141210, roughness: 0.35, metalness: 0.5, clearcoat: 0.5 });
    cableMat.onBeforeCompile = hookBend;
    [
      [[0.17, 0.43, 0.37], [0.27, 0.40, 0.20], [0.24, 0.15, -0.02], [0.10, -0.10, -0.06], [0.07, -0.40, -0.04]],
      [[0.24, 0.22, 0.28], [0.27, 0.08, 0.10], [0.14, -0.08, 0.0], [0.09, -0.40, 0.02]],
      [[0.28, 0.60, 0.12], [0.31, 0.38, -0.05], [0.18, 0.0, -0.12], [0.06, -0.40, -0.10]],
      [[0.13, 0.12, 0.38], [0.22, 0.02, 0.22], [0.13, -0.12, 0.08], [0.11, -0.40, 0.08]]
    ].forEach(function (pts, n) {
      var curve = new T.CatmullRomCurve3(pts.map(function (p) { return new T.Vector3(p[0], p[1], p[2]); }));
      root.add(new T.Mesh(new T.TubeGeometry(curve, 64, 0.008 + (n % 2) * 0.006, 8, false), cableMat));
    });
    [[0.33, 0.47, 0.12], [0.36, 0.22, 0.02], [0.30, 0.02, 0.12], [0.36, 0.62, -0.05], [0.26, 0.30, 0.22]].forEach(function (p) {
      var m = new T.Mesh(new T.SphereGeometry(0.007, 10, 8), new T.MeshBasicMaterial({ color: SIGNAL })); m.position.set(p[0], p[1], p[2]); headInner.add(m); leds.push(m);
    });

    var steel = new T.MeshPhysicalMaterial({ color: 0x2b2825, roughness: 0.25, metalness: 0.9, clearcoat: 0.4 });
    var chrome = new T.MeshPhysicalMaterial({ color: 0xbdb7ad, roughness: 0.18, metalness: 1.0 });
    for (var v = 0; v < 4; v++) { var disk = new T.Mesh(new T.CylinderGeometry(0.075, 0.075, 0.035, 32), steel); disk.position.set(0, -0.15 - v * 0.075, -0.07); root.add(disk); }
    [[-0.09, 0.02], [0.09, 0.02], [0.0, 0.07]].forEach(function (q) { var rod = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.5, 12), chrome); rod.position.set(q[0] * 0.8, -0.3, q[1] - 0.04); rod.rotation.z = q[0] * 0.6; root.add(rod); });

    buildEyes();

    /* ----- particles assembling the shoulders and the open side ----- */
    var src = geo.attributes.position, tgt = [], fv = [];
    for (var j = 0; j < src.count; j++) {
      var px = src.getX(j), py = src.getY(j), pz = src.getZ(j), f = buildF(px, py, pz);
      if (f > 0.55 && f < 1.25) { tgt.push(px, py, pz); fv.push(f); }
    }
    var PN = Math.min(3200, fv.length), pPos = new Float32Array(PN * 3), pOff = new Float32Array(PN * 3), pAt = new Float32Array(PN * 2);
    for (var q = 0; q < PN; q++) {
      var s = Math.floor(Math.random() * fv.length);
      pPos[q * 3] = tgt[s * 3]; pPos[q * 3 + 1] = tgt[s * 3 + 1]; pPos[q * 3 + 2] = tgt[s * 3 + 2];
      pOff[q * 3] = 0.15 + Math.random() * 0.6; pOff[q * 3 + 1] = (Math.random() - 0.6) * 0.5; pOff[q * 3 + 2] = (Math.random() - 0.2) * 0.6;
      pAt[q * 2] = Math.random(); pAt[q * 2 + 1] = fv[s];
    }
    var pg = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(pPos, 3)); pg.setAttribute('aOff', new T.BufferAttribute(pOff, 3)); pg.setAttribute('aAt', new T.BufferAttribute(pAt, 2));
    var pm = new T.ShaderMaterial({
      uniforms: { uProg: U.uProg, uTime: U.uTime, uHead: U.uHead, uPivot: U.uPivot, uPx: { value: renderer.getPixelRatio() } },
      transparent: true, depthWrite: false,
      vertexShader: 'attribute vec3 aOff; attribute vec2 aAt; uniform float uProg; uniform float uTime; uniform float uPx; varying float vA; varying float vHot;\n' + FIELD + '\n' + BEND_V + '\n' +
        'void main(){ float t = fract(uTime*0.2 + aAt.x); float e = 1.0 - pow(1.0-t, 3.0); vec3 p = mix(position + aOff, position, e);\n' +
        ' float near = 1.0 - smoothstep(0.0, 0.35, aAt.y - uProg);\n' +
        ' vA = (aAt.y > uProg ? near : 0.0) * smoothstep(0.0, 0.15, t) * (1.0 - smoothstep(0.85, 1.0, t)); vHot = smoothstep(0.75, 1.0, t);\n' +
        ' vec4 mv = modelViewMatrix * vec4(bendP(p), 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (1.4 + 1.8*vHot) * uPx * (4.0 / -mv.z); }',
      fragmentShader: 'varying float vA; varying float vHot; void main(){ vec2 d = gl_PointCoord - 0.5; if (max(abs(d.x),abs(d.y)) > 0.5) discard; gl_FragColor = vec4(mix(vec3(0.08,0.075,0.07), vec3(1.0,0.24,0.1), vHot), vA*0.85); }'
    });
    root.add(new T.Points(pg, pm));

    document.documentElement.classList.add('gl-ready');
    ready = true;
  }

  /* ---------- eyes: lens irises behind cut lids ---------- */
  function irisTex() {
    var c = document.createElement('canvas'); c.width = c.height = 512;
    var x = c.getContext('2d'), m = 256, i;
    var g = x.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, '#050404'); g.addColorStop(0.22, '#050404'); g.addColorStop(0.26, '#2a1a14'); g.addColorStop(0.7, '#2b2622'); g.addColorStop(0.9, '#0f0d0c'); g.addColorStop(1, 'rgba(12,10,9,0)');
    x.fillStyle = g; x.beginPath(); x.arc(m, m, m, 0, 7); x.fill();
    x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = 2;
    for (i = 0; i < 9; i++) { var a = i / 9 * Math.PI * 2; x.beginPath(); x.moveTo(m + Math.cos(a) * 70, m + Math.sin(a) * 70); x.lineTo(m + Math.cos(a + 0.9) * 150, m + Math.sin(a + 0.9) * 150); x.stroke(); }
    for (i = 0; i < 260; i++) { var b = Math.random() * Math.PI * 2, r1 = 84 + Math.random() * 10, r2 = 150 + Math.random() * 70; x.strokeStyle = i % 5 ? 'rgba(120,104,92,0.35)' : 'rgba(255,90,58,0.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(m + Math.cos(b) * r1, m + Math.sin(b) * r1); x.lineTo(m + Math.cos(b) * r2, m + Math.sin(b) * r2); x.stroke(); }
    [[78, '#ff3b1f', 3], [154, 'rgba(255,255,255,0.18)', 1.5], [200, 'rgba(255,255,255,0.12)', 1], [232, 'rgba(0,0,0,0.6)', 6]].forEach(function (r) { x.strokeStyle = r[1]; x.lineWidth = r[2]; x.beginPath(); x.arc(m, m, r[0], 0, 7); x.stroke(); });
    var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
  }
  function buildEyes() {
    var tex = irisTex();
    [-1, 1].forEach(function (side) {
      var socket = new T.Group(); socket.position.set(side * EYE_X, EYE_Y, EYE_Z); headInner.add(socket);
      var ball = new T.Group(); socket.add(ball);
      ball.add(new T.Mesh(new T.SphereGeometry(ER, 48, 32), new T.MeshPhysicalMaterial({ color: 0xf2eee8, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.04 })));
      var iris = new T.Mesh(new T.CircleGeometry(ER * 0.8, 64), new T.MeshBasicMaterial({ map: tex, transparent: true }));
      iris.position.z = ER * 0.94; ball.add(iris);
      var glow = new T.Mesh(new T.CircleGeometry(ER * 0.07, 32), new T.MeshBasicMaterial({ color: SIGNAL, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
      glow.position.z = ER * 0.99; ball.add(glow);
      var lens = new T.Mesh(new T.SphereGeometry(ER * 0.6, 40, 16, 0, Math.PI * 2, 0, Math.PI * 0.32), new T.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, roughness: 0.0, clearcoat: 1, metalness: 0.2 }));
      lens.rotation.x = Math.PI / 2; lens.position.z = ER * 0.47; ball.add(lens);
      var lidMat = new T.MeshPhysicalMaterial({ color: 0xe8e3db, roughness: 0.45, clearcoat: 0.3, side: T.DoubleSide });
      var upper = new T.Mesh(new T.SphereGeometry(ER * 1.04, 48, 20, 0, Math.PI * 2, 0, Math.PI / 2), lidMat); socket.add(upper);
      var lower = new T.Mesh(new T.SphereGeometry(ER * 1.035, 48, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), lidMat); socket.add(lower);
      lower.rotation.x = 0.5;
      eyes.push({ ball: ball, glow: glow, upper: upper, lower: lower });
    });
  }

  /* ---------- behaviour ---------- */
  var clock = new T.Clock(), visible = true;
  var st = { yaw: 0, pitch: 0, tyaw: 0, tpitch: 0, ex: 0, ey: 0, tex: 0, tey: 0, last: -10, blinkT: -1, nextBlink: 2.2, blinks: 0, dilate: 0, att: 0, prog: 0.62 };
  var hud = { build: document.querySelector('[data-hud="build"]'), gaze: document.querySelector('[data-hud="gaze"]'), blinks: document.querySelector('[data-hud="blinks"]') };
  var euler = new T.Euler(0, 0, 0, 'YXZ'), m4 = new T.Matrix4();

  function look(cx, cy) {
    var r = canvas.getBoundingClientRect();
    var mx = (cx - (r.left + r.width * 0.5)) / (window.innerWidth * 0.5);
    var my = (cy - (r.top + r.height * 0.3)) / (window.innerHeight * 0.5);
    mx = Math.max(-1.3, Math.min(1.3, mx)); my = Math.max(-1.2, Math.min(1.2, my));
    st.tyaw = mx * 0.42; st.tpitch = my * 0.2; st.tex = mx * 0.38; st.tey = my * 0.22; st.last = clock.elapsedTime;
  }
  window.addEventListener('pointermove', function (e) { look(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) { if (e.touches[0]) look(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  canvas.addEventListener('pointerdown', function (e) { look(e.clientX, e.clientY); st.att = 1; st.dilate = 1; if (st.blinkT < 0) st.blinkT = 0; window.dispatchEvent(new CustomEvent('s01:notice')); });

  function resize() {
    var r = canvas.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false); camera.aspect = w / h;
    var d = 1.95 / 2 / Math.tan(T.MathUtils.degToRad(camera.fov / 2));
    if (camera.aspect < 0.75) d *= 0.75 / camera.aspect;
    camera.position.set(0, 0.32, d); camera.lookAt(LOOK); camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) clock.getDelta(); }).observe(canvas);

  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    var dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    U.uTime.value = t;
    if (t - st.last > 3.5 && Math.random() < dt * 0.6) { st.tex = (Math.random() - 0.5) * 0.6; st.tey = (Math.random() - 0.5) * 0.25; st.tyaw = st.tex * 0.5; st.tpitch = st.tey * 0.4; }
    var k = reduce ? 0.05 : 1 - Math.pow(0.004, dt);
    st.yaw += (st.tyaw - st.yaw) * k * 0.5; st.pitch += (st.tpitch - st.pitch) * k * 0.5;
    st.ex += (st.tex - st.ex) * Math.min(1, k * 2.6); st.ey += (st.tey - st.ey) * Math.min(1, k * 2.6);

    euler.set(st.pitch + (reduce ? 0 : Math.sin(t * 1.05) * 0.006), st.yaw + (reduce ? 0 : Math.sin(t * 0.33) * 0.018), Math.sin(t * 0.21) * 0.012 - st.att * 0.05);
    headGroup.rotation.copy(euler);
    m4.makeRotationFromEuler(euler); U.uHead.value.setFromMatrix4(m4);
    root.position.y = reduce ? 0 : Math.sin(t * 1.05) * 0.006;

    if (st.blinkT < 0 && t > st.nextBlink) st.blinkT = 0;
    var open = 1;
    if (st.blinkT >= 0) {
      st.blinkT += dt; var b = st.blinkT / 0.15;
      open = b < 0.45 ? 1 - b / 0.45 : Math.min(1, (b - 0.45) / 0.55);
      if (b >= 1) { st.blinkT = -1; st.blinks++; st.nextBlink = t + (Math.random() < 0.18 ? 0.2 : 2 + Math.random() * 4.5); if (hud.blinks) hud.blinks.textContent = st.blinks; }
    }
    st.dilate *= Math.pow(0.35, dt); st.att *= Math.pow(0.4, dt);
    eyes.forEach(function (e) {
      e.ball.rotation.y = st.ex; e.ball.rotation.x = st.ey;
      e.upper.rotation.x = -0.1 - 0.62 * open + st.ey * 0.35;
      e.lower.rotation.x = 0.5 + st.ey * 0.12;
      e.glow.scale.setScalar(1 + st.dilate * 0.9 + (reduce ? 0 : 0.08 * Math.sin(t * 0.9)));
      e.glow.material.opacity = 0.8 + 0.2 * Math.sin(t * 2.1);
    });
    leds.forEach(function (m, i) { m.material.color.copy(SIGNAL).multiplyScalar(0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 3 + i * 1.7))); });

    var target = 0.60 + 0.035 * Math.sin(t * 0.19) + 0.01 * Math.sin(t * 1.2) + st.att * 0.02;
    st.prog += (target - st.prog) * (reduce ? 1 : 0.05); U.uProg.value = st.prog;

    renderer.render(scene, camera);
    if (!ready) return;
    if (hud.build && ((t * 10) | 0) % 3 === 0) hud.build.textContent = (58 + (st.prog - 0.56) / 0.09 * 24).toFixed(1);
    if (hud.gaze) { var g = t - st.last < 3.5 ? 'gaze.track' : 'gaze.scan'; if (hud.gaze.dataset.k !== g) { hud.gaze.dataset.k = g; hud.gaze.textContent = window.SolI18n ? SolI18n.t(g) : g; } }
  }
  resize();
  window.S01 = { renderer: renderer };
  tick();
})();

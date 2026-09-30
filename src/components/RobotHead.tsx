import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface RobotHeadProps {
  scrollProgress: number;
  onSpeak?: () => void;
  /** When false, the canvas stays mounted (so it can preload/warm up) but is
   * invisible and non-interactive — used to hold the robot back until the
   * intro sequence is ready to reveal it. */
  visible?: boolean;
}

// -----------------------------------------------------------------------
// Eye-glow placement, in the model's own local space (same units as the
// source robot.glb). The file is a single fused mesh with no rig and no
// separate eyelid geometry, so a literal eyelid-close blink isn't possible.
// Instead we place two small glowing "lens" markers over the eyes and blink
// by dimming/contracting them — a common look for robot optics, and it
// reads as a real blink without needing bone/morph data the file doesn't have.
//
// IMPORTANT — axis convention for this specific model:
// robot.glb's own "forward" (face) direction points along local -X, not -Z
// (confirmed by mesh-normal analysis: the -X side has ~2x the vertex/face
// density of +X, consistent with facial detail vs. the smoother back of the
// head). That's also exactly why the old rotation.y = Math.PI was landing
// 90° off — a Y-rotation of Math.PI only flips Z, it doesn't swap X into Z.
// So in this file: X = depth (more negative = further forward/toward
// camera), Y = up/down, Z = left/right.
//
// EYE_L / EYE_R below are a best-effort estimate from the raw geometry
// (there's no distinct eye texture or material baked into this model to
// detect automatically). Load the site with ?calibrate=1 in the URL to drag
// the markers into place by eye and read off the exact numbers — see the
// calibration overlay below.
// -----------------------------------------------------------------------
const DEFAULT_EYE_L = new THREE.Vector3(0.285, 0.175, -0.105);
const DEFAULT_EYE_R = new THREE.Vector3(0.285, 0.175, 0.105);const EYE_RADIUS = 0.028;

const CALIBRATE =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("calibrate");

export default function RobotHead({ scrollProgress, onSpeak, visible = true }: RobotHeadProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglOk, setWebglOk] = useState(true);
  const [loading, setLoading] = useState(true);
  // Live-adjustable eye offsets, only ever changed in ?calibrate=1 mode.
  const [eyeL, setEyeL] = useState(DEFAULT_EYE_L.clone());
  const [eyeR, setEyeR] = useState(DEFAULT_EYE_R.clone());
  const eyeLRef = useRef(eyeL);
  const eyeRRef = useRef(eyeR);
  eyeLRef.current = eyeL;
  eyeRRef.current = eyeR;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglOk(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.05, 6.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ---------- Lighting ----------
    const ambient = new THREE.AmbientLight(0x2a3040, 1.1);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf4f5f7, 2.3);
    keyLight.position.set(2.2, 3, 4);
    scene.add(keyLight);

    const rim = new THREE.DirectionalLight(0x7c5cff, 1.8);
    rim.position.set(-3, 1.5, -3);
    scene.add(rim);

    const underGlow = new THREE.PointLight(0xff7a45, 1.2, 8);
    underGlow.position.set(0, -1.8, 2);
    scene.add(underGlow);

    // ---------- Root groups ----------
    // breathe: vertical bob + scale pulse (whole-body breathing)
    // look: spring-damped rotation for idle sway + cursor tracking + nod
    const breathe = new THREE.Group();
    scene.add(breathe);
    const look = new THREE.Group();
    breathe.add(look);

    // ---------- Eye glow markers (blink happens here) ----------
    const eyeMeshes: THREE.Mesh[] = [];
    const haloMeshes: THREE.Mesh[] = [];
    const eyeLights: THREE.PointLight[] = [];
    [eyeLRef.current, eyeRRef.current].forEach((pos) => {
      const eye = new THREE.Mesh(
        new THREE.SphereGeometry(EYE_RADIUS, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x9fd8ff })
      );
      eye.position.copy(pos);
      eyeMeshes.push(eye);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(EYE_RADIUS * 2.1, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0x6fc8ff,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.position.copy(pos);
      haloMeshes.push(halo);

      const light = new THREE.PointLight(0x8fd8ff, 0.8, 1.4);
      light.position.copy(pos);
      eyeLights.push(light);
    });

    // ---------- Load the custom robot model ----------
    const loader = new GLTFLoader();
    let disposed = false;

    loader.load(
      "/robot.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        model.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = false;
            obj.receiveShadow = false;
          }
        });

        // Eye markers sit in the model's own local space, so they inherit
        // the same center/scale/rotation applied below.
        eyeMeshes.forEach((m) => model.add(m));
        haloMeshes.forEach((m) => model.add(m));
        eyeLights.forEach((l) => model.add(l));

        // Face the model toward the camera, then auto-frame it.
        // This model's own "forward" points along local -X (see the note
        // above EYE_L/EYE_R), so it takes a 90° turn — not 180° — to bring
        // the face around to point at the camera on +Z.
        model.rotation.y = -Math.PI / 2;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.35;
        const scale = targetSize / maxDim;
        model.scale.setScalar(scale);

        // Re-measure center after scale/rotation, then center it precisely.
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = box2.getCenter(new THREE.Vector3());
        model.position.sub(center2);
        model.position.y += size.y * scale * 0.02;

        look.add(model);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Failed to load robot.glb", err);
        setLoading(false);
      }
    );

    // ---------- Resize ----------
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // ---------- Interaction state ----------
    const pointer = { x: 0, y: 0 };
    const handlePointer = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
      pointer.y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));
    };
    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let acknowledge = 0;
    const onClick = () => {
      acknowledge = 1;
      onSpeak?.();
    };
    mount.addEventListener("click", onClick);

    // ---------- Calibration mode (?calibrate=1) ----------
    // Nudge the eye markers with the keyboard and read the exact numbers
    // off the on-screen readout, then paste them into DEFAULT_EYE_L/R above.
    // Arrow keys move left/right/up/down (Z/Y), "," and "." move depth (X).
    let activeEye: "L" | "R" = "L";
    const STEP = 0.005;
    const onKeyDown = (e: KeyboardEvent) => {
      if (!CALIBRATE) return;
      const setFn = activeEye === "L" ? setEyeL : setEyeR;
      const cur = (activeEye === "L" ? eyeLRef : eyeRRef).current;
      const next = cur.clone();
      switch (e.key) {
        case "ArrowUp":
          next.y += STEP;
          break;
        case "ArrowDown":
          next.y -= STEP;
          break;
        case "ArrowLeft":
          next.z -= STEP;
          break;
        case "ArrowRight":
          next.z += STEP;
          break;
        case ",":
          next.x -= STEP;
          break;
        case ".":
          next.x += STEP;
          break;
        case "Tab":
          e.preventDefault();
          activeEye = activeEye === "L" ? "R" : "L";
          return;
        default:
          return;
      }
      e.preventDefault();
      setFn(next);
    };
    if (CALIBRATE) window.addEventListener("keydown", onKeyDown);

    // ---------- Animation loop ----------
    let raf: number;
    let blinkTimer = 0;
    let nextBlink = 2600;
    let blinkVal = 0;
    let curX = 0;
    let curY = 0;
    let velX = 0;
    let velY = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Breathing: gentle bob + scale pulse on the whole figure
      breathe.position.y = Math.sin(t * 0.7) * 0.035;
      const breathScale = 1 + Math.sin(t * 0.7) * 0.007;
      breathe.scale.setScalar(breathScale);

      // Idle look-around blended with cursor tracking
      const idleYaw = Math.sin(t * 0.22) * 0.1 + Math.cos(t * 0.5) * 0.035;
      const idlePitch = Math.cos(t * 0.18) * 0.07;
      const targetYaw = pointer.x * 0.4 + idleYaw * 0.35;
      const targetPitch = -pointer.y * 0.2 + idlePitch * 0.35;

      // Spring-damper for weighty, mechanical turning
      const ay = (targetYaw - curY) * 0.09;
      const ax = (targetPitch - curX) * 0.09;
      velY = (velY + ay) * 0.82;
      velX = (velX + ax) * 0.82;
      curY += velY;
      curX += velX;
      look.rotation.x = curX;
      look.rotation.y = curY;

      // Acknowledge nod on click, decays over time
      if (acknowledge > 0.01) {
        look.rotation.x += acknowledge * 0.1;
        acknowledge *= 0.9;
      }

      // Blink cycle — dim/contract the eye markers rather than closing lids
      blinkTimer += dt * 1000;
      if (blinkTimer > nextBlink) {
        blinkVal = 1;
        blinkTimer = 0;
        nextBlink = 2800 + Math.random() * 3600;
      }
      blinkVal = Math.max(0, blinkVal - dt * 6.5);
      const openAmount = CALIBRATE ? 1 : 1 - blinkVal;
      const liveEyes = [eyeLRef.current, eyeRRef.current];
      eyeMeshes.forEach((eye, i) => {
        if (CALIBRATE) eye.position.copy(liveEyes[i]);
        eye.scale.setScalar(Math.max(0.06, openAmount));
        const mat = eye.material as THREE.MeshBasicMaterial;
        const pulse = (0.85 + Math.sin(t * 2.4) * 0.15 + acknowledge * 0.4) * openAmount;
        mat.color.setRGB(0.62 * pulse, 0.85 * pulse, 1.0 * pulse);
      });
      haloMeshes.forEach((halo, i) => {
        if (CALIBRATE) halo.position.copy(liveEyes[i]);
        halo.scale.setScalar(Math.max(0.06, openAmount));
        (halo.material as THREE.MeshBasicMaterial).opacity = 0.35 * openAmount;
      });
      eyeLights.forEach((light, i) => {
        if (CALIBRATE) light.position.copy(liveEyes[i]);
        light.intensity = 0.8 * openAmount;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (CALIBRATE) window.removeEventListener("keydown", onKeyDown);
      mount.removeEventListener("click", onClick);
      mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!webglOk) {
    return (
      <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #1c2129, #0a0d12)" }} />
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-pointer relative"
      role="button"
      aria-label="Interact with the Solunera robot"
      tabIndex={0}
      style={{
        opacity: visible ? 1 - scrollProgress * 1.3 : 0,
        transform: `translateY(${scrollProgress * 40}px) scale(${visible ? 1 - scrollProgress * 0.08 : 0.85})`,
        transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--wire-strong)", borderTopColor: "transparent" }}
          />
        </div>
      )}
      {CALIBRATE && (
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max px-3 py-2 rounded font-mono text-[10px] leading-relaxed pointer-events-none"
          style={{ backgroundColor: "rgba(10,13,18,0.9)", color: "#9fd8ff", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          Tab = switch eye · arrows = up/down/left/right · , . = depth<br />
          EYE_L: {eyeL.x.toFixed(3)}, {eyeL.y.toFixed(3)}, {eyeL.z.toFixed(3)}<br />
          EYE_R: {eyeR.x.toFixed(3)}, {eyeR.y.toFixed(3)}, {eyeR.z.toFixed(3)}
        </div>
      )}
    </div>
  );
}

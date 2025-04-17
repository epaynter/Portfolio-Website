import * as THREE from 'https://unpkg.com/three@0.147.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.147.0/examples/jsm/loaders/GLTFLoader.js';

function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'loading-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0, 0, 0, 0.75)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.innerHTML = `
    <div class="loader">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function removeLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.remove();
}

class SpaceJourney {
  constructor(containerId) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`No container with ID '${containerId}'`);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);
    container.appendChild(this.renderer.domElement);
    createLoadingOverlay();

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    this.camera.position.set(0, 1, 5);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      './earth-cartoon/source/earth-cartoon.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse(node => {
          if (node.isMesh) node.material = new THREE.MeshNormalMaterial();
        });
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, 0, 0);
        this.scene.add(model);
        console.log('Model loaded successfully.');
        removeLoadingOverlay();
      },
      (xhr) => {
        const pct = (xhr.loaded / xhr.total * 100).toFixed(2);
        console.log(`GLB loading: ${pct}%`);
      },
      (err) => {
        console.error('Failed to load GLB model:', err);
        removeLoadingOverlay();
      }
    );

    // Animation loop
    this.animate = () => {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    };

    console.log('Scene initialized.');
    this.animate();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
  const style = document.createElement('style');
  style.textContent = `
    .loader {
      display: flex;
      gap: 10px;
    }
    .block {
      width: 15px;
      height: 15px;
      background-color: #00ffcc;
      animation: bounce 1s infinite ease-in-out;
    }
    .block:nth-child(2) {
      animation-delay: 0.2s;
    }
    .block:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes bounce {
      0%, 100% {
        transform: scaleY(1);
      }
      50% {
        transform: scaleY(1.8);
      }
    }
  `;
  document.head.appendChild(style);
  new SpaceJourney('scene');
});
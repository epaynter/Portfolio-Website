import * as THREE from 'https://unpkg.com/three@0.147.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.147.0/examples/jsm/controls/OrbitControls.js';

class SpaceJourney {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
    this.scrollY = 0;
    this.initLayers();
    this.setupControls();
    this.animate();
    this.onScroll();
  }

  initLayers() {
    const textures = [
      { id: 'space', url: 'space-4k.jpg', scale: 1.5, speed: 0.1 },
      { id: 'earth', url: 'earth-4k.jpg', scale: 0.5, speed: 0.3 },
      { id: 'map', url: 'silicon-valley-4k.jpg', scale: 0.3, speed: 0.5 },
      { id: 'city', url: 'cityscape-4k.jpg', scale: 0.2, speed: 0.7 },
      { id: 'brain', url: 'brain-4k.jpg', scale: 0.1, speed: 0.9 }
    ];

    textures.forEach((layer, index) => {
      new THREE.TextureLoader().load(layer.url, (texture) => {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        const geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -index * 10;
        mesh.scale.set(layer.scale, layer.scale, 1);
        this.scene.add(mesh);
        if (index === textures.length - 1) this.startBrainAnimation(mesh);
      });
    });

    this.camera.position.z = 50;
  }

  setupControls() {
    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onResize());
  }

  onScroll() {
    this.scrollY = window.scrollY;
    this.updateCamera();
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateCamera() {
    const progress = this.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    this.camera.position.y = -progress * 200;
    this.camera.lookAt(0, 0, 0);
  }

  startBrainAnimation(mesh) {
    const brainMaterial = mesh.material;
    function animateBrain(time) {
      brainMaterial.map.offset.y = (time / 10000) % 1;
      requestAnimationFrame(animateBrain);
    }
    animateBrain(0);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SpaceJourney('scene');
});
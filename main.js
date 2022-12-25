import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class BasicScene {
  constructor(){
    this.Init();
  }
  Init(){
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener( 'resize' , () => {
      this.OnWindowResize();
    }, false);

    this.camera = new THREE.PerspectiveCamera(60, 1920 / 1080, 1.0, 1000.0);
    this.camera.position.z = 100;

    this.scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(100,100,100);
    light.target.position.set(0,0,0);
    light.castShadow = true;

    this.scene.add(light);

    light = new THREE.AmbientLight(0x404040);
    this.scene.add(light);

    const controls = new OrbitControls( this.camera, this.renderer.domElement );
    controls.update();


    this.scene.background = new THREE.Color(0x2C3E50)

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100,100,1,1),
      new MeshBasicMaterial({color:0x808080, side: THREE.DoubleSide})
    );
    this.scene.add(plane);
    this.RAF();
  }
  OnWindowResize(){
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  RAF(){
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera);
      this.RAF();
    });
  }
}
let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicScene();
});

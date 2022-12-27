import * as THREE from 'three';
import { MeshStandardMaterial, Vector3 } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import { ImageLoader } from 'three';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let af = false;
let awayForward = false;
let awayBackward = false;
let awayRight = false;
let awayLeft = false;
let adds = 3;



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
    this.camera.position.z = 70;

    this.scene = new THREE.Scene();

    this.OnWindowResize();

    let light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(100,100,100);
    light.target.position.set(0,0,0);
    light.castShadow = true;

    this.scene.add(light);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    light = new THREE.AmbientLight(0x404040);
    this.scene.add(light);

    window.addEventListener('keydown', (e)=>{
      if(e.code == 'KeyW'){
        moveForward = true;
      }
    })
    window.addEventListener('keydown', (e)=>{
      if(e.code == 'KeyA'){
        moveLeft = true;
      }
    })
    window.addEventListener('keydown', (e)=>{
      if(e.code == 'KeyS'){
        moveBackward = true;
      }
    })
    window.addEventListener('keydown', (e)=>{
      if(e.code == 'KeyD'){
        moveRight = true;
      }
    })

    window.addEventListener('keyup', (e)=>{
      if(e.code == 'KeyW'){
        moveForward = false;
      }
    })
    window.addEventListener('keyup', (e)=>{
      if(e.code == 'KeyA'){
        moveLeft = false;
      }
    })
    window.addEventListener('keyup', (e)=>{
      if(e.code == 'KeyS'){
        moveBackward = false;
      }
    })
    window.addEventListener('keyup', (e)=>{
      if(e.code == 'KeyD'){
        moveRight = false;
      }
    })
    
    this.scene.background = new THREE.CubeTextureLoader()
  	.setPath( './clouds1/' )
  	.load( [
	  	'clouds1_east.bmp',
      'clouds1_west.bmp',
	  	'clouds1_up.bmp',
	  	'clouds1_down.bmp',
	  	'clouds1_north.bmp',
      'clouds1_south.bmp'
	  ] );


    this.players = [];

    this.makeplayer('malek');
    this.LoadAnimatedModel();

    this.RAF();
    }
  LoadAnimatedModel(){
    const loader = new FBXLoader();
    loader.setPath("./");
    loader.load('Mremireh_O_Desbiens.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      this.scene.add(fbx);
    });

  }
  OnWindowResize(){
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  makeplayer(id){
    this.players.push(id);
    let player = new THREE.Mesh(
      new THREE.BoxGeometry(100,100,.09),
      new MeshStandardMaterial({color:0x808080})
    );
    this.scene.add(player);
    player.rotation.x = 1.6;
  }

  RAF(){
    requestAnimationFrame(() => {

      this.renderer.render(this.scene, this.camera);

      if(moveForward){
       // this.scene.children[2].position.y += .09;
      }
      if(moveBackward){
        //this.scene.children[2].position.y -= .09;
      }
      if(moveLeft){
        //this.scene.children[2].position.x -= .09;
      }
      if(moveRight){
       // this.scene.children[2].position.x += .09;
      }
    
      //this.camera.position.set(this.scene.children[2].position.x,this.scene.children[2].position.y,10);

      this.controls.update();

      this.RAF();
    });
  }
}
let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicScene();
});
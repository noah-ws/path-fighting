<template>
    <div class="canvas-container" id="canvas-container">
        <canvas class="webgl-canvas" id="webgl-canvas"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';
import * as dat from 'dat.gui'
import NodeGrid from '@/threejs-classes/nodeGrid.js';


export default {
  name: "Canvas",
  data: function () {
    return {
      debugGui: null,
      scene: null,
      camera: null,
      renderer: null,
      testCube: null,
      windowSize: null,
      grid: null,
    }
  },
  props: {
  },
  methods: {
      init: function() {
        // Debug
        this.debugGui = new dat.GUI();
        this.debugGui.domElement.id = 'gui';

        const canvas = document.getElementById('webgl-canvas');
        const floorHeight = -25;
        const boxDimensions = 10;


        // RENDERER
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas, alpha: true, 
        });        
        this.renderer.setSize(this.windowSize.width, this.windowSize.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // SHADOWS
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // SCENE
        this.scene = new THREE.Scene();

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
        this.camera.position.set(630, -292, 170); // 190, -65, 150
        const cameraPositionDebug = this.debugGui.addFolder('Camera Position');
        cameraPositionDebug.add(this.camera.position, 'x').step(0.5);
        cameraPositionDebug.add(this.camera.position, 'y').step(0.5);
        cameraPositionDebug.add(this.camera.position, 'z').step(0.5);
        const cameraRotationDebug = this.debugGui.addFolder('Camera Rotation');
        cameraRotationDebug.add(this.camera.rotation, 'x').step(0.05);
        cameraRotationDebug.add(this.camera.rotation, 'y').step(0.05);
        cameraRotationDebug.add(this.camera.rotation, 'z').step(0.05);
        this.scene.add(this.camera);

        // LIGHTING
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.15);
        pointLight.position.set(0, 0, 40);
        pointLight.position.set(630, -292, 175);
        pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        pointLight.intensity = 1;
        pointLight.castShadow = true;
        // pointLight.distance = 500;
        this.scene.add(pointLight);
        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.scene.add( pointLightHelper );
        const pointLightDebug = this.debugGui.addFolder('PointLight');
        pointLightDebug.add(pointLight.position, 'x').step(0.5);
        pointLightDebug.add(pointLight.position, 'y').step(0.5);
        pointLightDebug.add(pointLight.position, 'z').step(0.5);
        pointLightDebug.add(pointLight, 'intensity').step(0.05);

         // Background / Floor
        const backgroundPlaneGeometry = new THREE.PlaneGeometry(2500, 1500, 1, 1);
        const backgroundPlaneMesh = new THREE.MeshStandardMaterial();
        backgroundPlaneMesh.color = new THREE.Color(0x808080);
        var backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundPlaneMesh);
        backgroundPlane.position.set(300, -150, floorHeight);
        backgroundPlane.receiveShadow = true;
        this.scene.add(backgroundPlane);

         // TEST CUBE
        const cubeGeom = new THREE.BoxGeometry(20, 20, 20);
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF00FF });
        this.testCube = new THREE.Mesh(cubeGeom, cubeMaterial);
        this.testCube.position.set(630, -292, 50);
        this.testCube.castShadow = true;
        this.testCube.receiveShadow = true;
        this.scene.add(this.testCube);
        
        const nodeWidth = boxDimensions;
        const gWidth = 139; // 139 w/ boxDimensions * 2
        const gHeight = 55; // 55 w/ boxDimensions * 2
        this.grid = new NodeGrid(gHeight, gWidth, this.scene, { x: 0 + nodeWidth / 2, y: 0 - nodeWidth / 2, z: 40 }, nodeWidth);

      },
      animate: function() {
        this.renderer.render(this.scene, this.camera);

        this.testCube.rotation.x += 0.01;
        this.testCube.rotation.y += 0.01;

        requestAnimationFrame(this.animate);
    }
  },
  mounted: function () {
      this.init();
      this.animate();
  },
  created: function () {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      this.windowSize.width = window.innerWidth
      this.windowSize.height = window.innerHeight

      // Update camera
      this.camera.aspect = this.windowSize.width / this.windowSize.height
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.windowSize.width, this.windowSize.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  },
};
</script>

<style scope>
.canvas-container
{
    position: relative;
    width: 200;
    height: 200;
}

.webgl-canvas
{
    position: absolute;
}

#gui { 
    position: absolute; 
    top: calc(15vh); 
    left: calc(80vw); 
}
</style>
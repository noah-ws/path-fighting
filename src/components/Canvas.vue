<template>
    <div class="canvas-container" id="canvas-container" @keydown="keyDown" @keyup="keyUp">
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
      // debugGui: null,
      // scene: null,
      // camera: null,
      // renderer: null,
      // testCube: null,
      // grid: null,
      windowSize: null,
      controls: {
        zoomIn: false,
        zoomOut: false,
        up: false,
        left: false,
        down: false,
        right: false,
      },
      cameraMoveSpeed: 0.05,
      lastUpdate: null,
    }
  },
  props: {
  },
  methods: {
      moveCamera: function (delta) {
        if (this.controls.zoomIn) this.$options.camera.position.z -= this.cameraMoveSpeed * delta;
        if (this.controls.zoomOut) this.$options.camera.position.z += this.cameraMoveSpeed * delta;

        if (this.controls.up) this.$options.camera.position.y += this.cameraMoveSpeed * delta;
        if (this.controls.left) this.$options.camera.position.x -= this.cameraMoveSpeed * delta;
        if (this.controls.down) this.$options.camera.position.y -= this.cameraMoveSpeed * delta;
        if (this.controls.right) this.$options.camera.position.x += this.cameraMoveSpeed * delta;
      },
      init: function () {
        // Debug
        this.$options.debugGui = new dat.GUI();
        this.$options.debugGui.domElement.id = 'gui';

        const canvas = document.getElementById('webgl-canvas');
        const floorHeight = -25;
        const boxDimensions = 10;


        // RENDERER
        this.$options.renderer = new THREE.WebGLRenderer({
            canvas: canvas, alpha: true, 
        });        
        this.$options.renderer.setSize(this.windowSize.width, this.windowSize.height);
        this.$options.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // SHADOWS
        this.$options.renderer.shadowMap.enabled = true;
        this.$options.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // SCENE
        this.$options.scene = new THREE.Scene();

        // CAMERA
        this.$options.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
        this.$options.camera.position.set(630, -292, 170); // 190, -65, 150
        const cameraPositionDebug = this.$options.debugGui.addFolder('Camera Position');
        cameraPositionDebug.add(this.$options.camera.position, 'x').step(0.5);
        cameraPositionDebug.add(this.$options.camera.position, 'y').step(0.5);
        cameraPositionDebug.add(this.$options.camera.position, 'z').step(0.5);
        const cameraRotationDebug = this.$options.debugGui.addFolder('Camera Rotation');
        cameraRotationDebug.add(this.$options.camera.rotation, 'x').step(0.05);
        cameraRotationDebug.add(this.$options.camera.rotation, 'y').step(0.05);
        cameraRotationDebug.add(this.$options.camera.rotation, 'z').step(0.05);
        this.$options.scene.add(this.$options.camera);

        // LIGHTING
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.$options.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.15);
        pointLight.position.set(0, 0, 40);
        pointLight.position.set(630, -292, 175);
        pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        pointLight.intensity = 1;
        pointLight.castShadow = true;
        // pointLight.distance = 500;
        this.$options.scene.add(pointLight);
        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.$options.scene.add( pointLightHelper );
        const pointLightDebug = this.$options.debugGui.addFolder('PointLight');
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
        this.$options.scene.add(backgroundPlane);

         // TEST CUBE
        const cubeGeom = new THREE.BoxGeometry(20, 20, 20);
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF00FF });
        this.$options.testCube = new THREE.Mesh(cubeGeom, cubeMaterial);
        this.$options.testCube.position.set(630, -292, 50);
        this.$options.testCube.castShadow = true;
        this.$options.testCube.receiveShadow = true;
        this.$options.scene.add(this.$options.testCube);
        
        const nodeWidth = boxDimensions;
        const gWidth = 139; // 139 w/ boxDimensions * 2
        const gHeight = 55; // 55 w/ boxDimensions * 2
        this.$options.grid = new NodeGrid(gHeight, gWidth, this.$options.scene, { x: 0 + nodeWidth / 2, y: 0 - nodeWidth / 2, z: floorHeight }, nodeWidth);
      },
      animate: function () {
        this.$options.renderer.render(this.$options.scene, this.$options.camera);

        var now = Date.now();
        var delta = now - this.lastUpdate;
        this.lastUpdate = now;

        this.moveCamera(delta);

        this.$options.testCube.rotation.x += 0.01;
        this.$options.testCube.rotation.y += 0.01;

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
    });

    document.onkeydown = () => {
      var e = e || window.event;

      switch (e.keyCode) {
          // case 80:
          //     p = true;
          //     break;
          case 87:
              this.controls.up = true;
              break;
          case 65:
              this.controls.left = true;
              break;
          case 83:
              this.controls.down = true;
              break;
          case 68:
              this.controls.right = true;
              break;
          // case 38:
          //     aUp = true;
          //     break;
          // case 37:
          //     aLeft = true;
          //     break;
          // case 40:
          //     aDown = true;
          //     break;
          // case 39:
          //     aRight = true;
          //     break;
          case 81:
              this.controls.zoomOut = true;
              break;
          case 69:
              this.controls.zoomIn = true;
              break;
          // case 17:
          //     ctrl = true;
          //     break;
      }
  }

  document.onkeyup = () => {
      var e = e || window.event;

      switch (e.keyCode) {
          // case 80:
          //     p = false;
          //     break;
          case 87:
              this.controls.up = false;
              break;
          case 65:
              this.controls.left = false;
              break;
          case 83:
              this.controls.down = false;
              break;
          case 68:
              this.controls.right = false;
              break;
          // case 38:
          //     aUp = false;
          //     break;
          // case 37:
          //     aLeft = false;
          //     break;
          // case 40:
          //     aDown = false;
          //     break;
          // case 39:
          //     aRight = false;
          //     break;
          case 81:
              this.controls.zoomOut = false;
              break;
          case 69:
              this.controls.zoomIn = false;
              break;
          // case 17:
          //     ctrl = false;
          //     break;
      }
  }
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
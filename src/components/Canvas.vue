<template>
    <div class="canvas-container" id="canvas-container">
        <canvas class="webgl-canvas" id="webgl-canvas"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';
import * as dat from 'dat.gui'


export default {
  name: "Canvas",
  data: function () {
    return {
      debugGui: null,
      scene: null,
      camera: null,
      renderer: null,
      testCube: null,
    }
  },
  props: {
  },
  methods: {
      init: function() {
        // Debug
        this.debugGui = new dat.GUI();

        const canvas = document.getElementById('webgl-canvas');
        const windowWidth = document.documentElement.clientWidth
        const windowHeight = document.documentElement.clientHeight
        const floorHeight = -25;

        // RENDERER
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas, alpha: true, 
        });        
        this.renderer.setSize(windowWidth, windowHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // SCENE
        this.scene = new THREE.Scene();

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
        this.camera.position.set(630, -292, 190); // 190, -65, 150
        const cameraDebug = this.debugGui.addFolder('Camera');
        cameraDebug.add(this.camera.position, 'x').step(0.5);
        cameraDebug.add(this.camera.position, 'y').step(0.5);
        cameraDebug.add(this.camera.position, 'z').step(0.5);
        this.scene.add(this.camera);
        
        // Background / Floor
        const backgroundPlaneGeometry = new THREE.PlaneGeometry(2500, 1500, 1, 1);
        const backgroundPlaneMesh = new THREE.MeshStandardMaterial();
        backgroundPlaneMesh.color = new THREE.Color(0x808080);
        const backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundPlaneMesh);
        backgroundPlane.position.set(300, -150, floorHeight);
        this.scene.add(backgroundPlane);

        // LIGHTING
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.15);
        pointLight.position.set(0, 0, 40);
        pointLight.position.set(630, -292, 200);
        this.scene.add(pointLight);


        let size = 50;
        const cubeGeom = new THREE.BoxGeometry(size, size, size);
        const cubeMaterial = new THREE.MeshBasicMaterial();
        cubeMaterial.color = new THREE.Color(0x2080FF);
        this.testCube = new THREE.Mesh(cubeGeom, cubeMaterial);
        this.testCube.position.set(630, -292, 50);
        this.scene.add(this.testCube);

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
</style>
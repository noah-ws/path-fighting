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
        this.debugGui.domElement.id = 'gui';

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

        // SHADOWS
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // SCENE
        this.scene = new THREE.Scene();

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
        this.camera.position.set(630, -292, 190); // 190, -65, 150
        const cameraPositionDebug = this.debugGui.addFolder('Camera Position');
        cameraPositionDebug.add(this.camera.position, 'x').step(0.5);
        cameraPositionDebug.add(this.camera.position, 'y').step(0.5);
        cameraPositionDebug.add(this.camera.position, 'z').step(0.5);
        const cameraRotationDebug = this.debugGui.addFolder('Camera Rotation');
        cameraRotationDebug.add(this.camera.rotation, 'x').step(0.05);
        cameraRotationDebug.add(this.camera.rotation, 'y').step(0.05);
        cameraRotationDebug.add(this.camera.rotation, 'z').step(0.05);
        this.scene.add(this.camera);
        
        // Background / Floor
        const backgroundPlaneGeometry = new THREE.PlaneGeometry(2500, 1500, 1, 1);
        const backgroundPlaneMesh = new THREE.MeshStandardMaterial();
        backgroundPlaneMesh.color = new THREE.Color(0x808080);
        const backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundPlaneMesh);
        backgroundPlane.position.set(300, -150, floorHeight);
        backgroundPlane.receiveShadow = true;
        this.scene.add(backgroundPlane);

        // LIGHTING
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.15);
        pointLight.position.set(0, 0, 40);
        pointLight.position.set(630, -292, 60);
        pointLight.castShadow = true;
        this.scene.add(pointLight);
        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.scene.add( pointLightHelper );
        const pointLightDebug = this.debugGui.addFolder('PointLight');
        pointLightDebug.add(pointLight.position, 'x').step(0.5);
        pointLightDebug.add(pointLight.position, 'y').step(0.5);
        pointLightDebug.add(pointLight.position, 'z').step(0.5);


        // TEST CUBE
        // let size = 3;
        const cubeGeom = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        this.testCube = new THREE.Mesh(cubeGeom, cubeMaterial);
        this.testCube.position.set(630, -292, 50);
        this.testCube.castShadow = true;
        this.testCube.receiveShadow = true;
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

#gui { 
    position: absolute; 
    top: calc(15vh); 
    left: calc(80vw); 
}
</style>
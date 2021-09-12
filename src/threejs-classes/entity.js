import * as THREE from 'three';

export default class Entity {
    // color = 0x000000
    // size = {width, height, depth}
    // position = {x, y, z}
    constructor(color, size, position, scene, speed, id) {
        this.debugMode = true;
        this.scene = scene;
        this.entityID = this.id++;
        this.color = color;
        this.size = size;
        this.position = position;
        this.renderObj = null;
        this.rays = [];
        this.currentNodeRay = null;
        this.speed = speed;
        this.id = id;

        // group for line helpers and render object
        this.group = new THREE.Group();
    }
    // static id = 0;

    // line information 
    //  lineInfo = {pointsPath, lineLength, fraction}
    move(lineInfo) {
        // get point along line
        const newPos = lineInfo.pointsPath.getPoint(lineInfo.fraction);
        // move ai to that point
        this.copyPos(newPos);

        lineInfo.fraction += (0.5 / lineInfo.lineLength) * this.speed;
        if (lineInfo.fraction > 1) {
            lineInfo.pointsPath = null;
        }
    }

    // vector = {x, y, z}
    copyPos(vector) {
        this.position.x = vector.x;
        this.position.y = vector.y;
        this.position.z = vector.z;

        this.group.position.copy(vector);
    }

    objCopyPos(vector) {
        this.position.x = vector.x;
        this.position.y = vector.y;
        this.position.z = vector.z;

        this.renderObj.position.copy(vector);
    }

    checkCollision() {
        var intersections = [];

        let currNode = this.currentNodeRay.intersectObjects(this.scene.children);
        for (let i = 0; i < currNode.length; i++) {
            // currNode[i].object.visible = true;
        }
        // currNode[0].object.material.color.set(0xffff00);

        for (let i = 0; i < this.rays.length; i++) {
            intersections.push(this.rays[i].intersectObjects(this.scene.children));
        }


        for (let i = 0; i < intersections.length; i++) {
            for (let j = 0; j < intersections[i].length; j++) {
                if (intersections[i][j].object.name == "playersquare") {
                    intersections[i][j].object.material.color.set(0xffff00);
                    this.speed = 0;
                    // console.log("test");
                }
            }
        }
    }

    // origin (vector3) = {x, y, z}
    // direction (vector3) = {x, y, z}
    addRay(origin, direction) {
        const far = this.group.scale.y / 2; // this.size.width / 2
        const ray = new THREE.Raycaster(origin, direction, 0, far);
        this.rays.push(ray);

        // testing
        if (this.debugMode) {
            // for some reason, the origin is relative to the center of the group.
            const arrowHelper = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, 0), far, 0x00FF00);
            // this.scene.add(arrowHelper);
            this.group.add(arrowHelper);
        }
    }

    addCurrentNodeRay(origin) {
        const far = 2;
        const direction = new THREE.Vector3(0, 1, 0);
        this.currentNodeRay = new THREE.Raycaster(origin, direction, 0, far);

        // testing
        if (this.debugMode) {
            // for some reason, the origin is relative to the center of the group.
            const arrowHelper = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, 0), far, 0x00FFFF);
            // this.scene.add(arrowHelper);
            let arrowHelperSize = 0;
            arrowHelper.scale.set(this.group.scale.x + arrowHelperSize, this.group.scale.y + arrowHelperSize, this.group.scale.z + arrowHelperSize);
            this.group.add(arrowHelper);
        }
    }
}
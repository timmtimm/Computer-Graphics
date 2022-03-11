import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    const gui = new GUI();

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();
    renderer.shadowMap.enabled = true;

    class FogGUIHelper {
        constructor(fog, backgroundColor) {
            this.fog = fog;
            this.backgroundColor = backgroundColor;
        }
        get near() {
            return this.fog.near;
        }
        set near(v) {
            this.fog.near = v;
            this.fog.far = Math.max(this.fog.far, v);
        }
        get far() {
            return this.fog.far;
        }
        set far(v) {
            this.fog.far = v;
            this.fog.near = Math.min(this.fog.near, v);
        }
        get color() {
            return `#${this.fog.color.getHexString()}`;
        }
        set color(hexString) {
            this.fog.color.set(hexString);
            this.backgroundColor.set(hexString);
        }
    }

    class MinMaxGUIHelper {
        constructor(obj, minProp, maxProp, minDif) {
            this.obj = obj;
            this.minProp = minProp;
            this.maxProp = maxProp;
            this.minDif = minDif;
        }
        get min() {
            return this.obj[this.minProp];
        }
        set min(v) {
            this.obj[this.minProp] = v;
            this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
        }
        get max() {
            return this.obj[this.maxProp];
        }
        set max(v) {
            this.obj[this.maxProp] = v;
            this.min = this.min;  // this will call the min setter
        }
    }

    function updateCamera() {
        camera.updateProjectionMatrix();
    }

    const camFolder = gui.addFolder('camera');
    camFolder.add(camera, 'fov', 1, 180).onChange(updateCamera);
    const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
    camFolder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
    camFolder.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);
    camFolder.open();    

    {
        const near = 1;
        const far = 10;
        const color = 'lightblue';
        scene.fog = new THREE.Fog(color, near, far);
        scene.background = new THREE.Color(color);

        const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
        const fogFolder = gui.addFolder('fog');
        fogFolder.add(fogGUIHelper, 'near', near, far).listen();
        fogFolder.add(fogGUIHelper, 'far', near, far).listen();
        fogFolder.addColor(fogGUIHelper, 'color');
        fogFolder.open();
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(9, 8, 9);
        scene.add(light);
    }

    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, material, x, y, z) {

        const objects = new THREE.Mesh(geometry, material);
        scene.add(objects);

        objects.position.x = x;
        objects.position.y = y;
        objects.position.z = z;

        objects.castShadow = true;
        objects.receiveShadow = true;

        return objects;
    }
    const loader = new THREE.TextureLoader();

    // Geometry for ball
    // let geometry_ball = new THREE.SphereGeometry(1,500,500);
    // let geometry_basket = new THREE.SphereGeometry(1,500,500);
    // let geometry_golf = new THREE.SphereGeometry(0.4,500,500);

    // // Geometry for cube
    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // let objects = [
    //     makeInstance(geometry_ball, new THREE.MeshBasicMaterial({map: loader.load('img/pattern_ball.jpg'),}), -3, 0, -3),
    //     makeInstance(geometry_golf, new THREE.MeshBasicMaterial({map: loader.load('img/pattern_golf.jpg'),}), 3, 0, 3),
    //     makeInstance(geometry_basket, new THREE.MeshBasicMaterial({map: loader.load('img/pattern_basket.jpg'),}), 3, 0, -3),
    //     makeInstance(geometry, new THREE.MeshBasicMaterial({map: loader.load('img/pattern_rubick.jpg'),}), -3, 0, 3)
    // ];

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

    let sphereCamera = new THREE.CubeCamera(1,1000,cubeRenderTarget);
    sphereCamera.position.set(0,-5,0);
    scene.add(sphereCamera);

    let sphereMaterial = new THREE.MeshBasicMaterial({
        envMap: sphereCamera.renderTarget
    });
    let sphereGeo = new THREE.SphereGeometry(2,500,500);
    let sphere = makeInstance(sphereGeo, sphereMaterial, 0, 0, 0);
    scene.add(sphere);

    {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
            'img/snowy_cemetery.jpg',
            () => {
                const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
                rt.fromEquirectangularTexture(renderer, texture);
                scene.background = rt.texture;
            });
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // objects.forEach((objects, ndx) => {
        //     const speed = 1 + ndx * .1;
        //     const rot = time * speed;
        //     objects.rotation.x = rot;
        //     objects.rotation.y = rot;
        // });

        renderer.render(scene, camera);
        sphereCamera.updateCubeMap(renderer,scene);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();

  import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
  import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
  import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
  import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
  import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';


  function main() {
  const canvas = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.shadowMap.enabled = true;

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 200;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(30, 20, 60);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
    const planeSize = 50;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('img/plane.jpg');

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.receiveShadow = true;
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/igglo.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/igglo.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 3;
            root.position.x = 2;
            root.position.z = 10;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(10, 10, 10);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/igglo.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/igglo.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 2;
            root.position.x = 15;
            root.position.z = 14;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(10, 10, 10);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/igglo.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/igglo.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.position.x = 9;
            root.position.z = -15;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(10, 10, 10);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/panda.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/panda.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.position.x = 20;
            root.position.z = -10;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(4, 4, 4);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/panda.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/panda.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 8;
            root.position.x = -10;
            root.position.z = 13;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(4, 4, 4);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/panda.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/panda.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.position.x = 20;
            root.position.z = -10;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(4, 4, 4);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/panda.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/panda.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 7;
            root.position.x = 5;
            root.position.z = 3;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(4, 4, 4);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/panda.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/panda.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 8;
            root.position.x = 9;
            root.position.z = -9;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(4, 4, 4);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/mountain.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/mountain.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 1;
            root.position.x = -24;
            root.position.z = -14;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(60, 60, 60);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/tree.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/tree.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 1;
            root.position.x = -20;
            root.position.z = 20;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(10, 10, 10);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('img/tree.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('img/tree.obj', (root) => {
            root.rotation.x = -Math.PI * .5;
            root.rotation.z = 1;
            root.position.x = -15;
            root.position.z = 17;
            root.castShadow = true;
            root.receiveShadow = true;
            root.scale.set(10, 10, 10);
            root.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add(root);
        });
    });
  }

  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -20, 20).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 50).onChange(onChangeFn);
    folder.add(vector3, 'z', -20, 20).onChange(onChangeFn);
    folder.open();
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    light.position.set(0, 45, 0);
    scene.add(light);

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    function updateCamera() {
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

    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 2, 0.01);
    gui.add(light, 'distance', 0, 100).onChange(updateCamera);

    {
      const folder = gui.addFolder('Shadow Camera');
      folder.open();
      const minMaxGUIHelper = new MinMaxGUIHelper(light.shadow.camera, 'near', 'far', 0.1);
      folder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
      folder.add(minMaxGUIHelper, 'max', 0.1, 100, 0.1).name('far').onChange(updateCamera);
    }

    makeXYZGUI(gui, light.position, 'position', updateCamera);
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

  function render() {

    resizeRendererToDisplaySize(renderer);

    {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  }

  main();
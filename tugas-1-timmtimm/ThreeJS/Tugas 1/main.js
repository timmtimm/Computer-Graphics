import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif)
    {
        this.obj = obj;
        this.minProp = minProp;
        this.maxProp = maxProp;
        this.minDif = minDif;
    }

    get min()
    {
        return this.obj[this.minProp];
    }

    set min(v)
    {
        this.obj[this.minProp] = v;
        this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }

    get max()
    {
        return this.obj[this.maxProp];
    }

    set max(v)
    {
        this.obj[this.maxProp] = v;
        this.min = this.min;  // this will call the min setter
    }
}

function main ()
{
    let objects = [];
    let light_objects =
    {
        DirectionalLight:
        {
            members: []
        },
        HemisphereLight:
        {
            members: []
        },
        AmbientLight:
        {
            members: []
        },
        PointLight:
        {
            members: []
        },
        Spotlights:
        {
            members: []
        }
    };

    // Setup the camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera( fov, aspect , near, far );
    camera.position.set(40, 40, 40);

    let canvas = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    // UI Control
    const gui = new GUI();
    
    // Set Default Light
    let lightBarProps = {
        DirectionalLight: true,
        HemisphereLight:false,
        AmbientLight:false,
        PointLight:false,
        Spotlights:false,
    }

    // Toogle for Light
    let DirectionalLight_TOGGLE = gui.add(lightBarProps,'DirectionalLight').name('DirectionalLight').listen();
    DirectionalLight_TOGGLE.onChange((newValue) => {
        setLight('DirectionalLight', newValue)
    });

    let HemisphereLight_TOGGLE = gui.add(lightBarProps,'HemisphereLight').name('HemisphereLight').listen();
    HemisphereLight_TOGGLE.onChange((newValue) => {
        setLight('HemisphereLight', newValue)
    });

    let AmbientLight_TOGGLE = gui.add(lightBarProps,'AmbientLight').name('AmbientLight').listen();
    AmbientLight_TOGGLE.onChange((newValue) => {
        setLight('AmbientLight', newValue)
    });

    let PointLight_TOGGLE = gui.add(lightBarProps,'PointLight').name('PointLight').listen();
    PointLight_TOGGLE.onChange((newValue) => {
        setLight('PointLight', newValue)
    });

    let Spotlights_TOGGLE = gui.add(lightBarProps,'Spotlights').name('Spotlights').listen();
    Spotlights_TOGGLE.onChange((newValue) => {
        setLight('Spotlights', newValue)
    });

    // Camera Orbit
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    function setLight(type, active)
    {
        if(type == 'HemisphereLight')
        {
            if(active)
            {
                light_objects.HemisphereLight.members.forEach((light) => {
                    scene.add(light);
                });
            }
            else
            {
                light_objects.HemisphereLight.members.forEach((light) => {
                    scene.remove(light);
                });
            }
        }

        if(type == 'DirectionalLight')
        {
            if(active)
            {
                light_objects.DirectionalLight.members.forEach((light) => {
                    scene.add(light);
                });
            }
            else
            {
                light_objects.DirectionalLight.members.forEach((light) => {
                    scene.remove(light);
                });
            }
        }

        if(type == 'AmbientLight')
        {
            if(active)
            {
                light_objects.AmbientLight.members.forEach((light) => {
                    scene.add(light);
                });    
            }
            else
            {
                light_objects.AmbientLight.members.forEach((light) => {
                    scene.remove(light);
                });
            }
        }

        if(type == 'PointLight')
        {
            if(active)
            {
                light_objects.PointLight.members.forEach((light) => {
                    scene.add(light);
                });    
            }
            else
            {
                light_objects.PointLight.members.forEach((light) => {
                    scene.remove(light);
                });
            }
        }

        if(type == 'Spotlights')
        {
            if(active)
            {
                light_objects.Spotlights.members.forEach((light) => {
                    scene.add(light);
                });    
            }
            else
            {
                light_objects.Spotlights.members.forEach((light) => {
                    scene.remove(light);
                });
            }
        }
    }

    // DirectionaLight
    {
        function DirectionalFactory(color, intensity, position)
        {
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(position[0], position[1], position[2]);
            return light;
        }

        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.7, [-25,20,25]));
        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.7, [25,20,25]));
        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.7, [-25,20,-25]));
        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.7, [25,20,-25]));

    }

    // HemisphereLight
    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        
        light_objects.HemisphereLight.members.push(light);
    }

    // AmbientLight
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        light_objects.AmbientLight.members.push(light);
    }

    // PointLight
    {
        function PointLightFactory(color, intensity, position)
        {
            const light = new THREE.PointLight(color, intensity);
            light.position.set(position[0], position[1], position[2]);
            return light;
        }

        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [-20,20,20]));
        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [20,20,20]));
        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [-20,20,-20]));
        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [20,20,-20]));
    }

    // Spotlights
    {
        function SpotLightFactory(color, intensity, position, target_pos)
        {
            const light = new THREE.SpotLight(color, intensity);
            light.position.set(position[0], position[1], position[2]);
            light.target.position.set(position[0], position[1], position[2]);
            return light;
        }
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [-20,20,20], [0,0,0]));
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [20,20,20], [0,0,0]));
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [-20,20,-20], [0,0,0]));
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [20,20,-20], [0,0,0]));
    }

    setLight('DirectionalLight', true);

    // Plane
    {
        const geometry = new THREE.BoxGeometry(50, 5, 50);
        const color = 0x454545;
        const material = new THREE.MeshPhongMaterial({color});

        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0,0,0);
        scene.add(plane);
        objects["plane"] = plane;
    }

    // Wireframe Box
    {
        let geometry = new THREE.BoxGeometry(5, 5, 5);
        let material = new THREE.MeshBasicMaterial({ color: 0XF16A70, wireframe: true });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(15, 5, 0);
        scene.add(cube);

        objects["wire_box"] = cube; 
    }

    // Wireframe Octahedron
    {
        const radius = 5;
        const detail = 1;
        let geometry = new THREE.OctahedronGeometry(radius, detail);
        let material = new THREE.MeshBasicMaterial({ color: 0XB1D877, wireframe: true });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 7.5, -15);
        scene.add(cube);

        objects["wire_octa"] = cube; 
    }

    // Wireframe Sphere
    {
        const radius = 5;
        const widthSegments = 12;
        const heightSegments = 8;
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        let material = new THREE.MeshBasicMaterial({ color: 0X8CDCDA, wireframe: true });
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(-15, 7.5, 0);
        scene.add(sphere);

        objects["wire_sphere"] = sphere; 
    }

    // Wireframe Tetrahedron
    {
        const radius = 5;
        const geometry = new THREE.TetrahedronGeometry(radius);
        let material = new THREE.MeshBasicMaterial({ color: 0X4D4D4D, wireframe: true });
        let tetra = new THREE.Mesh(geometry, material);
        tetra.position.set(0, 5.5, 15);
        scene.add(tetra);

        objects["wire_tetra"] = tetra; 
    }

    // Icosahedron
    {
        const radius = 7;
        const geometry = new THREE.IcosahedronGeometry(radius);
        let material = new THREE.MeshPhongMaterial({ color: 0X6F2DBD, shininess: 200 });
        let icosahedron = new THREE.Mesh(geometry, material);
        icosahedron.position.set(0, 25, 0);
        scene.add(icosahedron);

        objects["icosahedron"] = icosahedron;
    }

    // Cylinder
    {
        const radiusTop = 2;
        const radiusBottom = 2;
        const height = 4;
        const radialSegments = 12;
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        let material = new THREE.MeshStandardMaterial({ color: 0X964B00, roughness: 0.55, metalness: 1 });
        let cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(-7.5, 25, 7.5);
        scene.add(cylinder);

        objects["cylinder"] = cylinder;
    }

    // Torus
    {
        const radius = 2.5;
        const tubeRadius = 1;
        const radialSegments = 8;
        const tubularSegments = 24;
        const geometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
        let material = new THREE.MeshStandardMaterial({ color: 0XD4AF37, roughness: 0.55, metalness: 1 });
        let torus = new THREE.Mesh(geometry, material);
        torus.position.set(0, 15, 0);
        scene.add(torus);

        objects["torus"] = torus;
    }

    // Cone
    {
        const radius = 4;  
        const height = 3;  
        const radialSegments = 16;  
        const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        let material = new THREE.MeshStandardMaterial({ color: 0XC0C0C0, roughness: 0.55, metalness: 1 });
        let cone = new THREE.Mesh(geometry, material);
        cone.position.set(0, 35, 0);
        scene.add(cone);

        objects["cone"] = cone;
    }

    // Torus Knot
    {
        const radius = 2;  
        const tubeRadius = 1;  
        const radialSegments = 8;  
        const tubularSegments = 64;  
        const p = 2;  
        const q = 3;  
        const geometry = new THREE.TorusKnotGeometry(radius, tubeRadius, tubularSegments, radialSegments, p, q);
        let material = new THREE.MeshStandardMaterial({ color: 0XB9FAF8, roughness: 0.55, metalness: 1 });
        let torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.position.set(7.5, 25, -10);
        scene.add(torusKnot);

        objects["torusKnot"] = torusKnot;

    }

    function resizeRendererToDisplaySize(renderer)
    {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize)
            renderer.setSize(width, height, false);
        return needResize;
    }

    let t = 0;
    
    function render(time)
    {
        t += 0.01;
        if (resizeRendererToDisplaySize(renderer))
        {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight ;
            camera.updateProjectionMatrix();
        }

        const speed = 0.0025;
        const rot = time * speed;

        objects["wire_box"].position.x = 10 * Math.cos( t );
        objects["wire_box"].position.z = 15 * Math.sin( t );

        objects["wire_octa"].position.x = 10 * Math.cos( t + 1 * Math.PI/2 );
        objects["wire_octa"].position.z = 15 * Math.sin( t + 1 * Math.PI/2 );
        objects["wire_octa"].rotation.x = rot;
        objects["wire_octa"].rotation.y = rot;

        objects["wire_sphere"].position.x = 10 * Math.cos( t + 2 * Math.PI/2 );
        objects["wire_sphere"].position.z = 15 * Math.sin( t + 2 * Math.PI/2 );
        objects["wire_sphere"].rotation.x = rot;
        objects["wire_sphere"].rotation.y = rot;

        objects["wire_tetra"].position.x = 10 * Math.cos( t + 3 * Math.PI/2 );
        objects["wire_tetra"].position.z = 15 * Math.sin( t + 3 * Math.PI/2 );
        
        objects["icosahedron"].rotation.x = rot;
        objects["icosahedron"].rotation.y = rot;

        objects["cylinder"].position.x = 10 * Math.cos( t + 3 * Math.PI/2 );
        objects["cylinder"].position.z = 15 * Math.sin( t + 5 * Math.PI/2 );
        objects["cylinder"].rotation.x = rot;
        objects["cylinder"].rotation.y = rot;

        objects["torus"].position.x = 10 * Math.cos( t + 4 * Math.PI/2 );
        objects["torus"].position.z = 15 * Math.sin( t + 6 * Math.PI/2 );
        objects["torus"].rotation.x = rot;
        objects["torus"].rotation.y = rot;

        objects["cone"].position.x = 10 * Math.cos( t + 1 * Math.PI/2 );
        objects["cone"].position.z = 15 * Math.sin( t + 3 * Math.PI/2 );
        objects["cone"].rotation.x = rot;
        objects["cone"].rotation.y = rot;

        objects["torusKnot"].position.x = 10 * Math.cos( t + 2 * Math.PI/2 );
        objects["torusKnot"].position.z = 15 * Math.sin( t + 4 * Math.PI/2 );
        objects["torusKnot"].rotation.x = rot;
        objects["torusKnot"].rotation.y = rot;

        renderer.render( scene, camera );
        requestAnimationFrame( render );
    }
    
    requestAnimationFrame( render );
};

main();
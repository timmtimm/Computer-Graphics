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
    camera.position.set(32, 90, 500);

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
    controls.target.set(32, 32, 32);
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

        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.9, [80,-80,-80]));
        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.9, [80,80,80]));
        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.9, [-80,80,-80]));
        light_objects.DirectionalLight.members.push(DirectionalFactory(0xFFFFFF, 0.9, [-80,-80,80]));
        
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

        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [80,-80,-80]));
        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [80,80,80]));
        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [-80,80,-80]));
        light_objects.PointLight.members.push(PointLightFactory(0xFFFFFF, 0.75, [-80,-80,80]));
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
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [80,-80,-80], [0,0,0]));
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [80,80,80], [0,0,0]));
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [-80,80,-80], [0,0,0]));
        light_objects.Spotlights.members.push(SpotLightFactory(0xFFFFFF, 1, [-80,-80,80], [0,0,0]));
    }

    setLight('DirectionalLight', true);

    let positionX = 0, positionY = 0, positionZ = 0;
    let red, green, blue;
    let temp = 0;
    let timeout = 250;

    // Position Light
    // {
    //     const width = 8;
    //     const height = 8;  
    //     const depth = 8;  
    //     const geometry = new THREE.BoxGeometry(width, height, depth);
    //     const material = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 150,});
    //     const box = new THREE.Mesh(geometry, material);
    //     box.position.set(80,-80,-80);
    //     scene.add(box);
    //     objects.push(box);
    // }

    // {
    //     const width = 8;
    //     const height = 8;  
    //     const depth = 8;  
    //     const geometry = new THREE.BoxGeometry(width, height, depth);
    //     const material = new THREE.MeshPhongMaterial({color: 0xdddddd, shininess: 150,});
    //     const box = new THREE.Mesh(geometry, material);
    //     box.position.set(80,80,80);
    //     scene.add(box);
    //     objects.push(box);
    // }

    // {
    //     const width = 8;
    //     const height = 8;  
    //     const depth = 8;  
    //     const geometry = new THREE.BoxGeometry(width, height, depth);
    //     const material = new THREE.MeshPhongMaterial({color: 0x000000, shininess: 150,});
    //     const box = new THREE.Mesh(geometry, material);
    //     box.position.set(-80,80,-80);
    //     scene.add(box);
    //     objects.push(box);
    // }

    // {
    //     const width = 8;
    //     const height = 8;  
    //     const depth = 8;  
    //     const geometry = new THREE.BoxGeometry(width, height, depth);
    //     const material = new THREE.MeshPhongMaterial({color: 0xaaaaaa, shininess: 150});
    //     const box = new THREE.Mesh(geometry, material);
    //     box.position.set(-80,-80,80);
    //     scene.add(box);
    //     objects.push(box);
    // }

    // Make Object
    function addObject()
    {
        red = Math.floor(Math.random() * 2) * 128 + 64;
        green = Math.floor(Math.random() * 2) * 128 + 64;
        blue = Math.floor(Math.random() * 2) * 128 + 64;

        //Object
        {
            const width = 8;
            const height = 8;  
            const depth = 8;  
            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshPhongMaterial({color: `rgb(${red}, ${green}, ${blue})`, shininess: 100});
            const box = new THREE.Mesh(geometry, material);
        
            // Randomizer for position
            positionX = (Math.random() - 0.5) * 400 + Math.random();
            positionY = (Math.random() - 0.5) * 250 + Math.random();
            positionZ = (Math.random() - 0.5) * 500 + Math.random();

            box.position.set(positionX, positionY, positionZ);

            // Randomizier for rotation
            box.rotation.x = (Math.random() - 0.5) * 34;
            box.rotation.y = (Math.random() - 0.5) * 56;
            box.rotation.z = (Math.random() - 0.5) * 12;

            scene.add(box);
            objects.push(box);
        }

        // Wireframe Object
        // {
        //     const width = 8;
        //     const height = 8;  
        //     const depth = 8;  
        //     const geometry = new THREE.BoxGeometry(width, height, depth);
        //     const material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe:true});
        //     const box = new THREE.Mesh(geometry, material);
        //     box.position.set(positionX, positionY, positionZ);
        //     scene.add(box);
        //     objects.push(box);
        // }

        positionX+=8;
        
        if(positionX % 64 == 0 && positionX != 0)
        {
            // positionX = 0;
            positionZ+=8;
        }
        temp++;

        if(temp % 64 == 0 && temp != 0)
        {
            // positionX = 0;
            // positionZ = 0;
            positionY+=8;
        }

        if(temp < 512)
        {
            timeout = (timeout / 10) * 9;
            setTimeout(addObject, timeout);
        }
    }
    addObject();

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

    //set raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const scoreBoard = document.querySelector(".score");
    let selectedPiece1, selectedPiece2, score = 0;

    function onMouseMove(event)
    {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function scoring()
    {
        for(let i = 0; i < scene.children.length; i++)
        {
            if(scene.children[i].material)
            {
                if(selectedPiece2 && selectedPiece1)
                {
                    if(selectedPiece1.material.color.getHex() === selectedPiece2.material.color.getHex())
                    {
                        scene.remove(selectedPiece1);
                        scene.remove(selectedPiece2);
                        score++;
                        scoreBoard.innerHTML = score;
                    }
                    selectedPiece1 = null;
                    selectedPiece2 = null;
                }

                if (scene.children[i] == selectedPiece1 || scene.children[i] == selectedPiece2)
                    scene.children[i].material.opacity = 0.5;
                else
                    scene.children[i].material.opacity = 1.0;
            }
        }

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, false);

        if(intersects.length > 0)
            intersects[0].object.material.transparent = true;
    }

    function onClick()
    {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        if(intersects.length > 0)
        {
            if(!selectedPiece1 && !selectedPiece2)
            {
                selectedPiece1 = intersects[0].object;
            }
            else if(selectedPiece1 &&!selectedPiece2 && intersects[0].object != selectedPiece1)
            {
                selectedPiece2 = intersects[0].object;
            }
            else if(selectedPiece1 && selectedPiece2)
            {
                selectedPiece1 = intersects[0].object;
                selectedPiece2 = null;
            }
        }
        else
        {
            selectedPiece1 = null;
            selectedPiece2 = null;
        }
    }

    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("click", onClick);

    function render()
    {
        if (resizeRendererToDisplaySize(renderer))
        {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight ;
            camera.updateProjectionMatrix();
        }

        scoring();

        renderer.render( scene, camera );
        requestAnimationFrame( render );
    }
    
    requestAnimationFrame( render );
};

main();
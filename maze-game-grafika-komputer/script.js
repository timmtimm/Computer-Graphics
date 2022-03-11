import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";

function main() {
    const canvas = document.querySelector("#myCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    //set scene
    const fov = 70;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.x = 60;
    camera.position.y = 150;
    camera.position.z = 100;
    camera.rotation.x = 210;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb0883e);

    // Camera Orbit
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    //set lighting
    let lights = [];
    const directLight1 = new THREE.DirectionalLight(0xffffff, 1);
    const ambientLight = new THREE.AmbientLight(0x555555, 1);

    directLight1.position.set(0, 6, 0);
    directLight1.target.position.set(0, 0, 0);

    lights.push(directLight1);
    lights.push(ambientLight);

    lights.forEach((light) => {
        scene.add(light);
    });

    lights[0].visible = true;
    lights[1].visible = true;

    //set objects
    const objects = [];

    function addObject(x, y, z, obj, spread) {
        obj.position.x = x * spread;
        obj.position.y = y * 15;
        obj.position.z = z * spread;

        scene.add(obj);
        objects.push(obj);
    }

    function addGeometry(x, y, z, spread, geometry, material) {
        const mesh = new THREE.Mesh(geometry, material);
        addObject(x, y, z, mesh, spread);
    }

    //make plane 1
    let plane;
    {
        const width = 160;
        const height = 5;
        const depth = 160;
        plane = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({
                color: "rgb(0,255,255)",
                roughness: 0.55,
                metalness: 1,
                side: THREE.DoubleSide,
                emissive: 0x454545,
            })
        );
        addObject(0, -2.8, 0, plane, 15);
    }
    //make red 1
    let finish;
    {
        const width = 10;
        const height = 1;
        const depth = 10;
        finish = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({
                color: "rgb(255,0,0)",
                roughness: 0.55,
                metalness: 1,
                side: THREE.DoubleSide,
                emissive: 0x454545,
            })
        );
        addObject(4.2, -2.5, 4.2, finish, 15);
    }

    let wall=[];
    //make wall left
    {
        const width = 10;
        const height = 10;
        const depth = 160;
        const tmp = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshLambertMaterial({
                color: "rgb(255,255,0)",
                side: THREE.DoubleSide,
                emissive: 0x454545,
            })
        );
        wall.push(tmp);
        addObject(-5, -2.3, 0, wall[0], 15);
    }
    // make wall right
    {
        const width = 10;
        const height = 10;
        const depth = 160;
        const tmp = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshLambertMaterial({
                color: "rgb(255,255,0)",
                side: THREE.DoubleSide,
                emissive: 0x454545,
            })
        );
        wall.push(tmp);
        addObject(5, -2.3, 0, wall[1], 15);
    }

    // make wall up
    {
        const width = 160;
        const height = 10;
        const depth = 10;
        const tmp = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshLambertMaterial({
                color: "rgb(255,255,0)",
                side: THREE.DoubleSide,
                emissive: 0x454545,
            })
        );
        wall.push(tmp);
        addObject(0, -2.3, 5, wall[2], 15);
    }

    // make wall down
    {
        const width = 160;
        const height = 10;
        const depth = 10;
        const tmp = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshLambertMaterial({
                color: "rgb(255,255,0)",
                side: THREE.DoubleSide,
                emissive: 0x454545,
            })
        );
        wall.push(tmp);
        addObject(0, -2.3, -5, wall[3], 15);
    }

    let xPos = 0;
    let yPos = 0;
    let zPos = 0;
    let ball;
    //make ball
    {
        const radius = 5.0;
        const detail = 5;
        ball = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, detail),
        new THREE.MeshPhongMaterial({
            color: "rgb(26,148,49)",
            shininess: 150,
        }));
        addObject(xPos-4.5, yPos - 2.2, zPos - 4.5, ball, 14);
    }

    let map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
    ];

    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            if(map[j][i]){
                const width = 14;
                const height = 10;
                const depth = 14;
                const tmp = new THREE.Mesh(
                    new THREE.BoxGeometry(width, height, depth),
                    new THREE.MeshLambertMaterial({
                        color: "rgb(255,255,0)",
                        side: THREE.DoubleSide,
                        emissive: 0x454545,
                    })
                );
                addObject(xPos+i+-4.5, -2.3, zPos +j - 4.5, tmp, 14);
            }
        }
    }


    function randomColor() {
        const r = Math.floor(Math.random() * 2) * 128 + 64;
        const g = Math.floor(Math.random() * 2) * 128 + 64;
        const b = Math.floor(Math.random() * 2) * 128 + 64;
        const rgb = `rgb(${r},${g},${b})`;

        return rgb;
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

    let yPosSpeed = 8 / 1000;
    let xRotSpeed = 0.75 / 1000;
    let speed = 0;
    function moveCamera() {
        speed += yPosSpeed;
        camera.position.x = 200 * Math.sin(speed);
        camera.position.z = 200 * Math.cos(speed);
        camera.rotation.y += yPosSpeed;

        requestAnimationFrame(moveCamera);
    }
    // moveCamera();

    //set raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const scoreBoard = document.querySelector(".score");
    let selectedPiece1,
        selectedPiece2,
        score = 0;

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // function resetMaterials() {
    //     for (let i = 0; i < scene.children.length; i++) {
    //         if (scene.children[i].material) {
    //             if (selectedPiece2 && selectedPiece1) {
    //                 if (
    //                     selectedPiece1.material.color.getHex() ===
    //                     selectedPiece2.material.color.getHex()
    //                 ) {
    //                     console.log(selectedPiece1.material.color.getHex());
    //                     console.log(selectedPiece2.material.color.getHex());

    //                     scene.remove(selectedPiece1);
    //                     scene.remove(selectedPiece2);
    //                     score++;
    //                     scoreBoard.innerHTML = score;
    //                 }
    //                 selectedPiece1 = null;
    //                 selectedPiece2 = null;
    //             }

    //             if (
    //                 scene.children[i] == selectedPiece1 ||
    //                 scene.children[i] == selectedPiece2
    //             )
    //                 scene.children[i].material.opacity = 0.5;
    //             else {
    //                 scene.children[i].material.opacity = 1.0;
    //             }
    //         }
    //     }
    // }

    // function hoverPieces() {
    //     raycaster.setFromCamera(mouse, camera);
    //     const intersects = raycaster.intersectObjects(scene.children, false);

    //     if (intersects.length > 0) {
    //         if (intersects[0].object !== plane && !wall.includes(intersects[0].object)) {
    //             intersects[0].object.material.transparent = true;
    //             intersects[0].object.material.opacity = 0.3;
    //         }
    //     }
    // }

    // function onClick() {
    //     raycaster.setFromCamera(mouse, camera);
    //     const intersects = raycaster.intersectObjects(scene.children);
    //     if (intersects.length > 0) {
    //         if (!selectedPiece1 && !selectedPiece2) {
    //             selectedPiece1 = intersects[0].object;
    //         } else if (
    //             selectedPiece1 &&
    //             !selectedPiece2 &&
    //             intersects[0].object != selectedPiece1
    //         ) {
    //             selectedPiece2 = intersects[0].object;
    //         } else if (selectedPiece1 && selectedPiece2) {
    //             selectedPiece1 = intersects[0].object;
    //             selectedPiece2 = null;
    //         }
    //     } else {
    //         selectedPiece1 = null;
    //         selectedPiece2 = null;
    //     }
    // }

    const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
    let x=0, z=0;
    function onKeyDown(e){
        if(e.keyCode == LEFT && ball.position.x >= -62 && !map[z][x-1]){
            x -= 1;
            ball.position.x += -14;
        }
        else if(e.keyCode == RIGHT && ball.position.x <= 62 && !map[z][x+1]){
            x += 1;
            ball.position.x += 14;
        }
        else if(e.keyCode == UP && ball.position.z >= -62 && !map[z-1][x]){
            z -= 1;
            ball.position.z -= 14;
        }
        else if(e.keyCode == DOWN && ball.position.z <= 62 && !map[z+1][x]){
            z += 1;
            ball.position.z +=14;  
        }
        if(x == 9 && z == 9){
            const music = new Audio('congrats.mp3');
            music.play();
            Swal.fire({
                text: "Congratulation! You've completed this level!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
            x = 0;
            z = 0;
            ball.position.x -= (14*9);
            ball.position.z -= (14*9);
            // console.log("yeee");
        }
    }

    window.addEventListener("mousemove", onMouseMove, false);
    // window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);
    
    // function
    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // resetMaterials();
        // hoverPieces();

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();

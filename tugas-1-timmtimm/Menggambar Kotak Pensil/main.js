function createShader(gl, type, source)
{
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success)
        return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

let canvas = document.getElementById('myCanvas');
let gl = canvas.getContext('webgl');

let vertices =
[
    /* Vertex Depan Atas */

    // Segitiga Kiri Panjang Atas
    0.219, -0.331,
    -0.220, -0.328,
    -0.12382, 0.3988,

    // Segitiga Kanan Panjang Atas
    -0.12382, 0.3988,
    0.13191, 0.39397,
    0.219, -0.331,

    // Segitiga Kiri Mendalam Kiri
    0.19783, -0.39835,
    0.185, -0.374,
    0.19944, -0.33097,
    
    // Segitiga Kanan Mendalam Kiri
    0.219, -0.331,
    0.19783, -0.39835,
    0.19944, -0.33097,

    // Segitiga Kiri Mendalam Kanan
    -0.220, -0.328,
    -0.203, -0.396,
    -0.18657, -0.37375,

    // Segitiga Kanan Mendalam Kanan
    -0.18657, -0.37375,
    -0.20018, -0.32824,
    -0.220, -0.328,

    // Segitiga Kiri Mendalam Bawah
    -0.18657, -0.37375,
    -0.203, -0.396,
    0.19783, -0.39835,

    // Segitiga Kanan Mendalam Bawah
    0.19783, -0.39835,
    0.185, -0.374,
    -0.18657, -0.37375,

    // Segitiga Kiri Mendalam
    -0.20018, -0.32824,
    -0.18657, -0.37375,
    0.185, -0.374,

    // Segitiga Kanan Mendalam
    0.19944, -0.33097,
    0.185, -0.374,
    -0.20018, -0.32824,
    

    /* Vertex Belakang Atas */

    // Segitiga Kiri Panjang Atas
    -0.14421, -0.23385,
    0.14118, -0.23574,
    -0.07563, 0.26622,

    // Segitiga Kanan Panjang Atas
    0.14118, -0.23574,
    -0.07563, 0.26622,
    0.09603, 0.27188,

    // Segitiga Kiri Mendalam Kiri
    -0.12378, -0.27512,
    -0.11509, -0.25892,
    -0.14421, -0.23385,
    
    // Segitiga Kanan Mendalam Kiri
    -0.11509, -0.25892,
    -0.12774, -0.23393,
    -0.14421, -0.23385,

    // Segitiga Kiri Mendalam Kanan
    0.13265, -0.27443,
    0.12333, -0.26068,
    0.1286, -0.23588,

    // Segitiga Kanan Mendalam Kanan
    0.14118, -0.23574,
    0.1286, -0.23588,
    0.13265, -0.27443,

    // Segitiga Kiri Mendalam Bawah
    0.13265, -0.27443,
    -0.12378, -0.27512,
    -0.11509, -0.25892,

    // Segitiga Kanan Mendalam Bawah
    -0.11509, -0.25892,
    0.12333, -0.26068,
    0.13265, -0.27443,

    // Segitiga Kiri Mendalam
    -0.11509, -0.25892,
    -0.12774, -0.23393,
    0.12333, -0.26068,

    // Segitiga Kanan Mendalam
    0.12333, -0.26068,
    0.1286, -0.23588,
    -0.12774, -0.23393,
]


let vertexShaderCode =
`
    attribute vec2 a_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    uniform mat4 matScale;
    uniform mat4 matTranslation;

    void main()
    {
        gl_Position = matTranslation * matScale * vec4(a_position, 0, 1);
        v_color = a_color;
    }
`;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);


let fragmentShaderCode =
`
    precision mediump float;
    varying vec4 v_color;

    void main()
    {
        gl_FragColor = v_color;
    }
`;
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

let coords = gl.getAttribLocation(shaderProgram, "a_position");
var colorLocation = gl.getAttribLocation(shaderProgram, "a_color");

// Generate warna untuk setiap

var color = [];
let buttonTemp = false;
function changeColor()
{
    color=[];
    if(buttonTemp)
    {
        for (let i = 0; i < vertices.length/3; i++)
        {
            let r = Math.random()/2 + 0.45;
            let g = Math.random()/2 + 0.45;
            let b = Math.random()/2 + 0.45;
        
            for (let j = 0; j < 3; j++)
            {
                color.push(r);
                color.push(g);
                color.push(b);
                color.push(1);
            }
        }
    }
    else
    {
        // Panjang Atas
        for(let i = 0; i < 6; i++)
        {
            color.push(0.65);
            color.push(0.6);
            color.push(0.52);
            color.push(1);
        }

        // Menadalam Kiri
        for(let i = 0; i < 6; i++)
        {
            color.push(0.23);
            color.push(0.2);
            color.push(0.14);
            color.push(1);
        }
        
        // Mendalam Kanan
        for(let i = 0; i < 6; i++)
        {
            color.push(0.18);
            color.push(0.15);
            color.push(0.11);
            color.push(1);
        }

        // Mendalam Bawah
        for(let i = 0; i < 6; i++)
        {
            color.push(0.31);
            color.push(0.26);
            color.push(0.21);
            color.push(1);
        }

        // Mendalam
        for(let i = 0; i < 6; i++)
        {
            color.push(0.35);
            color.push(0.31);
            color.push(0.25);
            color.push(1);
        }

        // Panjang Atas
        for(let i = 0; i < 6; i++)
        {
            color.push(0.65);
            color.push(0.6);
            color.push(0.52);
            color.push(1);
        }

        // Menadalam Kiri
        for(let i = 0; i < 6; i++)
        {
            color.push(0.17);
            color.push(0.16);
            color.push(0.15);
            color.push(1);
        }

        // Mendalam Kanan
        for(let i = 0; i < 6; i++)
        {
            color.push(0.18);
            color.push(0.16);
            color.push(0.11);
            color.push(1);
        }
        
        // Mendalam Bawah
        for(let i = 0; i < 6; i++)
        {
            color.push(0.30);
            color.push(0.24);
            color.push(0.20);
            color.push(1);
        }

        // Mendalam
        for(let i = 0; i < 6; i++)
        {
            color.push(0.33);
            color.push(0.28);
            color.push(0.23);
            color.push(1);
        }
    }

    console.log(color)

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLocation);
}

changeColor();

let vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coords);

let speed = 0.0161;
let dy = 0;

$(document).ready(function() {
    $(`button`).on (`click`, function() {
        buttonTemp = !buttonTemp;
        console.log("Button set as", buttonTemp);
        changeColor();
    })
});

function drawScene()
{
    if (dy >= 0.63)
        speed = -speed;

    if (dy <= -0.63)
        speed = -speed;

    dy += speed;

    gl.useProgram(shaderProgram);
    
    const left =
    [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -0.5, 0.0, 0.0, 1.0,
    ];

    const right =
    [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.5, dy, 0.0, 1.0,
    ];

    var Sx = 1.0, Sy = 1.0, Sz = 1.0;
    var formMatrix = new Float32Array(
    [
        Sx, 0.0, 0.0, 0.0,
        0.0, Sy, 0.0, 0.0,
        0.0, 0.0, Sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);

    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    const matrixScale = gl.getUniformLocation(shaderProgram, "matScale");
    gl.uniformMatrix4fv(matrixScale, false, formMatrix);

    const matrixTranslation = gl.getUniformLocation(shaderProgram, "matTranslation");
    gl.uniformMatrix4fv(matrixTranslation, false, left);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length/4);

    Sx = 1.4;
    Sy = 1.4;
    Sz = 1.4;
    formMatrix = new Float32Array(
    [
        Sx, 0.0, 0.0, 0.0,
        0.0, Sy, 0.0, 0.0,
        0.0, 0.0, Sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);

    gl.uniformMatrix4fv(matrixScale, false, formMatrix);
    gl.uniformMatrix4fv(matrixTranslation, false, right);
    gl.drawArrays(gl.TRIANGLES, vertices.length/4, vertices.length/2);

    requestAnimationFrame(drawScene);
}

drawScene();
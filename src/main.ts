import "./style.css";
import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Element {
	texture: string;
}
const fileNames = [
	"AWS-Dark.svg",
	"Cloudflare-Dark.svg",
	"Flask-Dark.svg",
	"JQuery.svg",
	"Netlify-Dark.svg",
	"Replit-Dark.svg",
	"ThreeJS-Dark.svg",
	"AndroidStudio-Dark.svg",
	"Dart-Dark.svg",
	"Flutter-Dark.svg",
	"JavaScript.svg",
	"NextJS-Dark.svg",
	"SQLite.svg",
	"qwik.png",
	"Arduino.svg",
	"Git.svg",
	"Linux-Dark.svg",
	"NodeJS-Dark.svg",
	"Sass.svg",
	"Bash-Dark.svg",
	"Django.svg",
	"Github-Dark.svg",
	"Markdown-Dark.svg",
	"Postman.svg",
	"StackOverflow-Dark.svg",
	"Bootstrap.svg",
	"Electron.svg",
	"Godot-Dark.svg",
	"MongoDB.svg",
	"Python-Dark.svg",
	"Svelte.svg",
	"CPP.svg",
	"ExpressJS-Dark.svg",
	"HTML.svg",
	"MySQL-Dark.svg",
	"React-Dark.svg",
	"TailwindCSS-Dark.svg",
	"CSS.svg",
	"Firebase-Dark.svg",
	"Heroku.svg",
	"NeoVim-Dark.svg",
	"Regex-Dark.svg",
	"TensorFlow-Dark.svg",
	"VueJS-Dark.svg",
	"VSCode-Dark.svg",
	"Vite-Dark.svg",
	"VIM-Dark.svg",
	"Unity-Dark.svg",
	"TypeScript.svg",
	"codeforces.png",
	"colab.png",
	"jupyter.png",
	"copilot.png",
];
// these are my elements
// web frameworks:
let elementTextures = [] as Element[];

fileNames.forEach((e) => {
	elementTextures.push({
		texture: `./public/code/${e}`,
	});
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg") as HTMLCanvasElement,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//camera.position.setZ(30);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/* const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper); */

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);
	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill(0).forEach(addStar);

let elements = [] as THREE.Mesh[];
elementTextures.forEach((e) => {
	const elementTexture = new THREE.TextureLoader().load(e.texture);
	elementTexture.wrapS = THREE.RepeatWrapping;
	elementTexture.wrapT = THREE.RepeatWrapping;

	const elementGeometry = new THREE.PlaneGeometry(5, 5);
	const elementMaterial = new THREE.MeshBasicMaterial({
		map: elementTexture,
		transparent: true,
	});
	elementMaterial.side = THREE.DoubleSide;
	const element = new THREE.Mesh(elementGeometry, elementMaterial);
	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(15) * 5 + 10);
	element.position.set(x, y, z);
	const [rx, ry, rz] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(10));
	element.rotation.set(rx, ry, rz);
	elements.push(element);
	scene.add(element);
});

(() => {
	/* const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(10) * 5 + 10); */

	const cubeTexture = new THREE.TextureLoader().load("./public/enes.png");
	const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
	const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.set(0, 0, 0);
	scene.add(cube);
	elements.push(cube);
})();

function animate() {
	requestAnimationFrame(animate);
	//=======================================================
	elements.forEach((e) => {
		e.rotation.x += 0.01;
		e.rotation.y += 0.01;
		e.rotation.z += 0.01;
	});

	camera.position.x = 40 * Math.sin(Date.now() / 3000);
	camera.position.z = 40 * Math.cos(Date.now() / 3000);
	camera.position.y = 40 * Math.sin(Date.now() / 1000);

	camera.lookAt(0, 0, 0);

	//=======================================================
	//controls.update();
	renderer.render(scene, camera);
}

animate();

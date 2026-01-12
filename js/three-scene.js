function initThreeJS(){
const container=document.getElementById("canvas-container");
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x050505,0.02);

const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera.position.z=5;

const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(innerWidth,innerHeight);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040,2));

const light1=new THREE.PointLight(0x00f3ff,2,10);
light1.position.set(2,2,2);
scene.add(light1);

const light2=new THREE.PointLight(0xbc13fe,2,10);
light2.position.set(-2,-2,2);
scene.add(light2);

const group=new THREE.Group();

const core=new THREE.Mesh(
new THREE.IcosahedronGeometry(1,1),
new THREE.MeshStandardMaterial({color:0x111111,metalness:.9,roughness:.2})
);
group.add(core);

const inner=new THREE.Mesh(
new THREE.IcosahedronGeometry(.8,0),
new THREE.MeshBasicMaterial({color:0x00f3ff,wireframe:true})
);
group.add(inner);

const torusGeo=new THREE.TorusGeometry(2,.05,16,100);
const torusMat=new THREE.MeshBasicMaterial({color:0xbc13fe,opacity:.6,transparent:true});
const ring1=new THREE.Mesh(torusGeo,torusMat);
const ring2=new THREE.Mesh(torusGeo,torusMat);
ring1.rotation.x=Math.PI/2;
ring2.rotation.x=Math.PI/2;
ring2.rotation.y=Math.PI/4;
group.add(ring1,ring2);

scene.add(group);

let mouseX=0,mouseY=0;
document.addEventListener("mousemove",e=>{
mouseX=(e.clientX-innerWidth/2)*0.001;
mouseY=(e.clientY-innerHeight/2)*0.001;
});

const clock=new THREE.Clock();
(function animate(){
const t=clock.getElapsedTime();
group.rotation.y+=0.005+(mouseX-group.rotation.y)*0.05;
group.rotation.x+=0.002+(mouseY-group.rotation.x)*0.05;
ring1.rotation.z=t*.2;
ring2.rotation.z=-t*.3;
const s=1+Math.sin(t*2)*.05;
core.scale.set(s,s,s);
renderer.render(scene,camera);
requestAnimationFrame(animate);
})();

window.addEventListener("resize",()=>{
camera.aspect=innerWidth/innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(innerWidth,innerHeight);
});

gsap.from(group.scale,{x:0,y:0,z:0,duration:2,ease:"elastic.out"});
}

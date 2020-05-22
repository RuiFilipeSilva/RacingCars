let renderer, camera, scene;
let car, car2, angle = Math.PI,
    angle2 = Math.PI,
    velocity = 0,
    velocity2 = 0,
    start = false,
    count = 3

window.onload = function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#739122')
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement);

    //Create Scene
    scene = new THREE.Scene();

    //Create Axes
    let axes = new THREE.AxesHelper(3);
    scene.add(axes);

    //Create Camera
    let aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(45, aspect, 0.01, 1000)
    camera.position.set(180, 200, 240)
    scene.add(camera)

    /* camera.lookAt(0, 0, 0) */

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    })

    //Create Light
    spotLight = new THREE.SpotLight(0x404040, 2)
    spotLight.position.set(100, 100, 250)
    spotLight.visible = true
    spotLightHelper = new THREE.SpotLightHelper(spotLight, 0x404040)
    spotLightHelper.visible = true
    spotLight.castShadow = true
    scene.add(spotLight);
    scene.add(spotLightHelper)

    //Floor
/*     let geometry = new THREE.PlaneGeometry(300, 300, 32);
    let material = new THREE.MeshBasicMaterial({
        color: "",
        side: THREE.DoubleSide
    })
    let floor = new THREE.Mesh(geometry, material);
    floor.rotateX(Math.PI / 2)
    floor.castShadow = true
    floor.receiveShadow = true
    floor.position.set(0, -1, 0)
    scene.add(floor) */



    createCars()
    createTrack()
    animation()


}
window.addEventListener('keydown', keyPressed);
window.addEventListener('keyup', keyReleased);
let keys = [];

function timer() {
    count= count-1
    console.log(count)
}

function keyPressed(e) {
    keys[e.key] = true; //store an entry for every key pressed
    if (e.key == "a")
        angle += 0.3;
    else if (e.key == "d")
        angle -= 0.3

    if (e.key == "j")
        angle2 += 0.3
    else if (e.key == "l")
        angle2 -= 0.3
    e.preventDefault();
}

function keyReleased(e) {
    keys[e.key] = false; //mark released keys
}
/* document.onkeydown = function (e) {
    let key = e.key;
    if (key == "a") {
        angle += 0.1
    } else if (key == "d") {
        angle -= 0.1
    }

    if (key == "j") {
        angle2 += 0.1
    } else if (key == "l") {
        angle2 -= 0.1
    }
    e.preventDefault();
} */

function createTrack() {
    //Track
    let track = new THREE.Object3D
    let asphaltTexture = new THREE.TextureLoader().load('models/Asphalt.jpg')
    let geometry2 = new THREE.PlaneGeometry(30, 170, 32)
    let material2 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track1 = new THREE.Mesh(geometry2, material2)
    track.rotateX(Math.PI / 2)
    track.position.set(120, 0, 0)
    track1.position.set(0, 10, 0)
    track.add(track1)

    //Curve 1
    let geometry4 = new THREE.CircleGeometry(30, 32, 0, -Math.PI / 2)
    let material4 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track2 = new THREE.Mesh(geometry4, material4)
    track2.position.set(-15, -75, 0)
    track.add(track2)

    let geometry5 = new THREE.PlaneGeometry(70, 30, 32)
    let material5 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track3 = new THREE.Mesh(geometry5, material5)
    track3.position.set(-45, -90, 0)
    track.add(track3)

    //Curve 2
    let geometry6 = new THREE.CircleGeometry(30, 32, -Math.PI / 2, -Math.PI / 2)
    let material6 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track4 = new THREE.Mesh(geometry6, material6)
    track4.position.set(-80, -75, 0)
    track.add(track4)

    let geometry7 = new THREE.PlaneGeometry(30, 90, 32)
    let material7 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track5 = new THREE.Mesh(geometry7, material7)
    track5.position.set(-95, -30, 0)
    track.add(track5)

    //Curve3
    let geometry8 = new THREE.CircleGeometry(30, 32, Math.PI / 2, -Math.PI / 2)
    let material8 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track6 = new THREE.Mesh(geometry8, material8)
    track6.position.set(-110, 15, 0)
    track.add(track6)

    let geometry9 = new THREE.PlaneGeometry(5, 30, 32)
    let material9 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track7 = new THREE.Mesh(geometry9, material9)
    track7.position.set(-112, 30, 0)
    track.add(track7)

    //Curve4
    let geometry10 = new THREE.CircleGeometry(30, 32, Math.PI / 2, Math.PI / 2)
    let material10 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track8 = new THREE.Mesh(geometry10, material10)
    track8.position.set(-114, 15, 0)
    track.add(track8)

    let geometry11 = new THREE.PlaneGeometry(30, 130, 32)
    let material11 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track9 = new THREE.Mesh(geometry11, material11)
    track9.position.set(-129, -50, 0)
    track.add(track9)

    //Curve5
    let geometry12 = new THREE.CircleGeometry(30, 32, 0, -Math.PI / 2)
    let material12 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track10 = new THREE.Mesh(geometry12, material12)
    track10.position.set(-144, -115, 0)
    track.add(track10)

    let geometry13 = new THREE.PlaneGeometry(90, 30, 32)
    let material13 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track11 = new THREE.Mesh(geometry13, material13)
    track11.position.set(-187, -130, 0)
    track.add(track11)

    //Curve6
    let geometry14 = new THREE.CircleGeometry(30, 32, -Math.PI / 2, -Math.PI / 2)
    let material14 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track12 = new THREE.Mesh(geometry14, material14)
    track12.position.set(-230, -115, 0)
    track.add(track12)

    let geometry15 = new THREE.PlaneGeometry(30, 210, 32)
    let material15 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track13 = new THREE.Mesh(geometry15, material15)
    track13.position.set(-245, -10, 0)
    track.add(track13)

    //Curve7
    let geometry16 = new THREE.CircleGeometry(30, 32, Math.PI / 2, Math.PI / 2)
    let material16 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track14 = new THREE.Mesh(geometry16, material16)
    track14.position.set(-230, 95, 0)
    track.add(track14)

    let geometry17 = new THREE.PlaneGeometry(215, 30, 32)
    let material17 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track15 = new THREE.Mesh(geometry17, material17)
    track15.position.set(-122.5, 110, 0)
    track.add(track15)

    //Curve8
    let geometry18 = new THREE.CircleGeometry(30, 32, Math.PI / 2, -Math.PI / 2)
    let material18 = new THREE.MeshBasicMaterial({
        map: asphaltTexture,
        side: THREE.DoubleSide
    })
    let track16 = new THREE.Mesh(geometry18, material18)
    track16.position.set(-15, 95, 0)
    track.add(track16)

    scene.add(track)
}

function createCars() {
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('./models/mercedes_0001.mtl', function (materials) {
        materials.preload();
        let loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
        loader.load('./models/mercedes_0001.obj', function (object) {
            car = object;
            car.scale.set(0.05, 0.05, 0.05);
            car.position.set(125, 0, 80)
            car.rotateX(-Math.PI / 2)
            scene.add(car);

        });
    })
    mtlLoader.castShadow = true
    mtlLoader.receiveShadow = true

    let mtlLoader2 = new THREE.MTLLoader();
    mtlLoader2.load('./models/ferrari.mtl', function (materials) {
        materials.preload();
        let loader2 = new THREE.OBJLoader();
        loader2.setMaterials(materials);
        loader2.load('./models/ferrari.obj', function (object) {
            car2 = object;
            car2.scale.set(0.05, 0.05, 0.05);
            car2.position.set(115, 0, 80)
            car2.rotateX(-Math.PI / 2)
            scene.add(car2);
            animation()
            
        });
    })
}

function acceleration() {
    /* console.log(velocity) */
    if (velocity <= 1) {
        velocity += 0.01
    } else {
        velocity == 1
    }

    if (velocity2 <= 1) {
        velocity2 += 0.01
    } else {
        velocity2 == 1
    }

    car.rotation.z = (angle)
    car.position.x += velocity * Math.sin(angle)
    car.position.z += velocity * Math.cos(angle)

    car2.rotation.z = (angle2)
    car2.position.x += velocity2 * Math.sin(angle2)
    car2.position.z += velocity2 * Math.cos(angle2)

}

function animation() {
    if (count > 0) {
        setInterval(timer(), 1000)
    }
    else{
        acceleration()
    }
    
    

    renderer.render(scene, camera)
    requestAnimationFrame(animation)
}
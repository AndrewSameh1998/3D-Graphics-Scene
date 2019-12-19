function main(){
var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        camera.position.z = 5;

        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor("#e5e5e5");
        renderer.setSize(window.innerWidth,window.innerHeight);

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {

            renderer.setSize(window.innerWidth,window.innerHeight);
            camera.aspect = window.innerWidth/ window.innerHeight;
            camera.updateProjectionMatrix();
        });
        var light = new THREE.PointLight(0xffffff, 1 ,500);
            light.position.set(10,0,25);
        scene.add(light);

        var mtlLoader = new THREE.MTLLoader();
     //   mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
     //   mtlLoader.setPath('/examples/3d-obj-loader/assets/');
        mtlLoader.load('New Folder/r2-d2.mtl', function (materials) {
 
            materials.preload();
 
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
          //  objLoader.setPath('/examples/3d-obj-loader/assets/');
            objLoader.load('New Folder/r2-d2.obj', function (object) {
 
                scene.add(object);
                mesh = object;
                object.position.y -= 60;
                object.position.z -= 60;
 
    });
 
});
var render = function (){

    requestAnimationFrame(render);

    window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 38) {
        camera.position.z += 1;
    }
    else if (key == 40) {
        camera.position.z -= 1;
    }    
    else if (key == 39){
        mesh.rotation.y +=1
    }
    else if (key == 37){
        mesh.position.x -=1
    }

    }

    renderer.render(scene,camera);
}

       render();

    }


    main();
function main(){
  var scene = new THREE.Scene();
  var mesh;
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
          var light2 = new THREE.AmbientLight(0xf0f0f0);
              
         // scene.add(light);
          scene.add(light2);

          var mtlLoader = new THREE.MTLLoader();
          mtlLoader.load('New Folder/r2-d2.mtl', function (materials) {
   
              materials.preload();
   
              var objLoader = new THREE.OBJLoader();
              objLoader.setMaterials(materials);
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
          camera.position.z -= 0.8;
      }
      else if (key == 40) {
          camera.position.z += 0.8;
      }    
      else if (key == 39){
          mesh.rotation.y +=0.1
      }
      else if (key == 37){
          mesh.rotation.y -=0.1
      }
      else if (key == 87){
          mesh.position.y +=1
      }
      else if (key == 83){
          mesh.position.y -=1
      }
  
      }
  
      renderer.render(scene,camera);
  }

  function loadSkyBox() {
    var aCubeMap = THREE.ImageUtils.loadTextureCube([
      'assets/img/px.jpg',
      'assets/img/nx.jpg',
      'assets/img/py.jpg',
      'assets/img/ny.jpg',
      'assets/img/pz.jpg',
      'assets/img/nz.jpg'
    ]);
    aCubeMap.format = THREE.RGBFormat;

    var aShader = THREE.ShaderLib['cube'];
    aShader.uniforms['tCube'].value = aCubeMap;

    var aSkyBoxMaterial = new THREE.ShaderMaterial({
      fragmentShader: aShader.fragmentShader,
      vertexShader: aShader.vertexShader,
      uniforms: aShader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    var aSkybox = new THREE.Mesh(
      new THREE.BoxGeometry(1000000, 1000000, 1000000),
      aSkyBoxMaterial
    );
    
    scene.add(aSkybox);
  }

        loadSkyBox();
         render();
  
      }
  
  
      main();
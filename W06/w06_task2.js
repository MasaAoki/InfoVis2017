function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var cz = 10;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, cz );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
      [-1, 1, 1],
      [-1,-1, 1],
      [ 1,-1, 1],
      [ 1, 1, 1],
      [-1, 1, -1],
      [-1,-1, -1],
      [ 1,-1, -1],
      [ 1, 1, -1]
    ];

    var faces = [
      [0,1,3],
      [1,2,3],
      [4,5,0],
      [5,1,0],
      [4,0,7],
      [0,3,7],
      [1,5,2],
      [5,6,2],
      [3,2,7],
      [2,6,7],
      [7,6,4],
      [6,5,4]
    ];

    var geometry = new THREE.Geometry();
    for(var i=0; i<vertices.length; i++) {
        geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
    }

    for(i=0; i<faces.length; i++) {
      geometry.faces.push(new THREE.Face3(faces[i][0], faces[i][1], faces[i][2]));
    }

    geometry.computeFaceNormals();

    var material = new THREE.MeshPhongMaterial();
    material.vertexColors = THREE.FaceColors;
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.x = 0.5;

    var ambientLight = new THREE.AmbientLight(0x555555);
    var directionalLight = new THREE.DirectionalLight( 0xffffff);
    directionalLight.position.set(1,1,1);
    scene.add(ambientLight, directionalLight);

    document.addEventListener( 'mousedown', mouse_down_event);

    var copt = [];
    for(i=0; i<faces.length; i++) {
      copt[i] = 0;
    }

    function mouse_down_event( event )
    {
      var x_win = event.clientX;
      var y_win = event.clientY;

      var vx = renderer.domElement.offsetTop;
      var vy = renderer.domElement.offsetTop;
      var vw = renderer.domElement.width;
      var vh = renderer.domElement.height;

      var x_NDC = 2*(x_win-vx)/vw-1;
      var y_NDC = -(2*(y_win-vy)/vh-1);

      var p_NDC = new THREE.Vector3(x_NDC, y_NDC, 1);
      p_NDC.unproject(camera);

      var raycaster = new THREE.Raycaster(camera.position, p_NDC.sub(camera.position).normalize());
      var intersects = raycaster.intersectObjects([cube]);

      if(intersects.length > 0)
      {
        switch(copt[intersects[0].faceIndex]) {
          case 0:
            intersects[0].face.color.setRGB(1,0,0);
            break;
          case 1:
            intersects[0].face.color.setRGB(0,1,0);
            break;
          case 2:
            intersects[0].face.color.setRGB(0,0,1);
            break;
          case 3:
            intersects[0].face.color.setRGB(1,1,1);
            break;
        }
        intersects[0].object.geometry.colorsNeedUpdate=true;
        copt[intersects[0].faceIndex] = (copt[intersects[0].faceIndex]+1)%4;
      }
    }

    loop();

    function loop()
    {
        requestAnimationFrame( loop );

        cube.rotation.x += 0.005;
        cube.rotation.y += 0.0025;
/*
        camera.rotation.y += Math.PI*0.0025;
        camera.position.x = cz*Math.sin(camera.rotation.y);
        camera.position.z = cz*Math.cos(camera.rotation.y);
*/
        renderer.render( scene, camera );
    }
}

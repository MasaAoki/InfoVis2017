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

    var v0 = new THREE.Vector3().fromArray(vertices[0]);
    var v1 = new THREE.Vector3().fromArray(vertices[1]);
    var v2 = new THREE.Vector3().fromArray(vertices[2]);
    var v3 = new THREE.Vector3().fromArray(vertices[3]);
    var v4 = new THREE.Vector3().fromArray(vertices[4]);
    var v5 = new THREE.Vector3().fromArray(vertices[5]);
    var v6 = new THREE.Vector3().fromArray(vertices[6]);
    var v7 = new THREE.Vector3().fromArray(vertices[7]);

    var id = faces[0];
    var f0 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[1];
    var f1 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[2];
    var f2 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[3];
    var f3 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[4];
    var f4 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[5];
    var f5 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[6];
    var f6 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[7];
    var f7 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[8];
    var f8 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[9];
    var f9 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[10];
    var f10 = new THREE.Face3(id[0], id[1], id[2]);
    id = faces[11];
    var f11 = new THREE.Face3(id[0], id[1], id[2]);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(v0);
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.vertices.push(v4);
    geometry.vertices.push(v5);
    geometry.vertices.push(v6);
    geometry.vertices.push(v7);

    geometry.faces.push(f0);
    geometry.faces.push(f1);
    geometry.faces.push(f2);
    geometry.faces.push(f3);
    geometry.faces.push(f4);
    geometry.faces.push(f5);
    geometry.faces.push(f6);
    geometry.faces.push(f7);
    geometry.faces.push(f8);
    geometry.faces.push(f9);
    geometry.faces.push(f10);
    geometry.faces.push(f11);

    geometry.computeFaceNormals();

    var material = new THREE.MeshPhongMaterial();

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var ambientLight = new THREE.AmbientLight(0x555555);
    var directionalLight = new THREE.DirectionalLight( 0xffffff);
    directionalLight.position.set(1,1,1);
    scene.add(ambientLight, directionalLight);

    loop();

    function loop()
    {
        requestAnimationFrame( loop );

        cube.rotation.x += 0.005;
        cube.rotation.y += 0.0025;
/*
        camera.rotation.y += Math.PI*0.005;
        camera.position.x = cz*Math.sin(camera.rotation.y);
        camera.position.z = cz*Math.cos(camera.rotation.y);
*/
        renderer.render( scene, camera );
    }
}

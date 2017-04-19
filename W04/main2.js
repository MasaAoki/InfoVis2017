function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var cz = 5;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, cz );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0xfff0000 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    var material2 = new THREE.MeshLambertMaterial( { color: 0xffff22 } );
    var cube2 = new THREE.Mesh( geometry, material2 );
    scene.add( cube2 );

    var material3 = new THREE.MeshLambertMaterial( { color: 0x0022ff } );
    var cube3 = new THREE.Mesh( geometry, material3 );
    scene.add( cube3 );
    
    var material4 = new THREE.MeshLambertMaterial( { color: 0x00ff22 } );
    var cube4 = new THREE.Mesh( geometry, material4 );
    scene.add( cube4 );
    
    var light = new THREE.PointLight( 0xffffff );
    light.position.set(0,0,20);
    scene.add(light);

    var opt = Math.floor(Math.random()*8)+1;
    var speed = 0.02;
    var copt = 1;
    var cspeed = 0.002;
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );

        if(cube.position.y > 1 && !(opt == 3) && !(opt == 7))
        {
          if(cube.position.x > 1)
          {
            opt = Math.floor(Math.random()*3)+5;
          }
          else if(cube.position.x < -1)
          {
            opt = Math.floor(Math.random()*3)+3;
          }
          else
          {
            opt = Math.floor(Math.random()*5)+3;
          }
        }

        if(cube.position.y < -1 && !(opt == 3) && !(opt == 7))
        {
          if(cube.position.x > 1)
          {
            opt = (Math.floor(Math.random()*3)+6)%8+1;
          }
          else if(cube.position.x < -1)
          {
            opt = Math.floor(Math.random()*3)+1;
          }
          else
          {
            opt = (Math.floor(Math.random()*5)+6)%8+1;
          }
        }

        if(cube.position.x > 1 && !(opt == 1) && !(opt == 5))
        {
          if(cube.position.y > 1)
          {
            opt = Math.floor(Math.random()*3)+5;
          }
          else if(cube.position.y < -1)
          {
            opt = (Math.floor(Math.random()*3)+6)%8+1;
          }
          else
          {
            opt = (Math.floor(Math.random()*5)+4)%8+1;
          }
        }

        if(cube.position.x < -1 && !(opt == 1) && !(opt == 5))
        {
          if(cube.position.y > 1)
          {
            opt = Math.floor(Math.random()*3)+3;
          }
          else if(cube.position.y < -1)
          {
            opt = Math.floor(Math.random()*3)+1;
          }
          else
          {
            opt = Math.floor(Math.random()*5)+1;
          }
        }

        if (opt==1) {
          cube.position.y += speed;
        }
        if (opt==2) {
          cube.position.x += speed;
          cube.position.y += speed;
        }
        if (opt==3) {
          cube.position.x += speed;
        }
        if (opt==4) {
          cube.position.x += speed;
          cube.position.y -= speed;
        }
        if (opt==5) {
          cube.position.y -= speed;
        }
        if (opt==6) {
          cube.position.x -= speed;
          cube.position.y -= speed;
        }
        if (opt==7) {
          cube.position.x -= speed;
        }
        if (opt==8) {
          cube.position.x -= speed;
          cube.position.y += speed;
        }

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;

        cube2.position.x = -cube.position.x;
        cube2.position.y = -cube.position.y;
        cube3.position.x = +cube.position.x;
        cube3.position.y = -cube.position.y;
        cube4.position.x = -cube.position.x;
        cube4.position.y = +cube.position.y;
        
        cube2.rotation.x += 0.02;
        cube2.rotation.y += 0.02;
        cube3.rotation.x += 0.02;
        cube3.rotation.y += 0.02;
        cube4.rotation.x += 0.02;
        cube4.rotation.y += 0.02;

        camera.rotation.y += Math.PI*cspeed;
        camera.position.x = cz*Math.sin(camera.rotation.y);
        camera.position.z = cz*Math.cos(camera.rotation.y);
        
        renderer.render( scene, camera );
    }
}

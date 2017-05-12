function main()
{
    var width = 500;
    var height = 500;

    document.write("Lambertian Reflection<br>");

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    document.write("<br>");
    document.write("<br>Phong Reflection<br>");

    var scene2 = new THREE.Scene();

    var renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize( width, height );
    document.body.appendChild( renderer2.domElement );

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong.vert').text,
        fragmentShader: document.getElementById('phong.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position }
        }
    });
    var torus_knot = new THREE.Mesh( geometry, material );
    scene.add( torus_knot );

    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong.vert').text,
        fragmentShader: document.getElementById('phong2.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position }
        }
    });
    var torus_knot2 = new THREE.Mesh( geometry, material );
    scene2.add( torus_knot2 );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
        torus_knot2.rotation.x += 0.01;
        torus_knot2.rotation.y += 0.01;
        renderer.render( scene, camera );
        renderer2.render( scene2, camera );
    }
}

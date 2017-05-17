function main()
{
    var width = 500;
    var height = 500;

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

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ]  // 2
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
    ];

    var scalars = [
        0.1, // S0
        0.2, // S1
        0.8  // S2
    ];

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }

    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    var nid = id.length;
    var cmin = 0.1;
    var cmax = 0.8;
    for ( var i = 0; i < nfaces; i++ )
    {
        for(var j = 0; j < nid; j++ ) {
            var id = faces[i];
            var S0 = 255.0*(scalars[ id[j] ]-cmin)/(cmax-cmin);
            var U0 = Math.floor(S0);
            var T0 = Math.min(U0+1,255);
            var CU0 = new THREE.Color().setHex( cmap[ U0 ][1] );
            var CT0 = new THREE.Color().setHex( cmap[ T0 ][1] );
            T0 = U0+1;
            var R0 = CU0.r*(S0-U0)+CT0.r*(T0-S0);
            var G0 = CU0.g*(S0-U0)+CT0.g*(T0-S0);
            var B0 = CU0.b*(S0-U0)+CT0.b*(T0-S0);
            geometry.faces[i].vertexColors.push( new THREE.Color(R0,G0,B0) );
        }
    }

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}

function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth*0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = document.getElementById('isovalue').value;
    var surfaces_geo = Isosurfaces( volume, isovalue );

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var cmap = [];
    var cresolution = 256;
    for ( var i = 0; i < cresolution; i++ )
    {
        var S = i / (cresolution-1); // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( screen.width, screen.height );
    document.body.appendChild( renderer.domElement );

    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong.vert').text,
        fragmentShader: document.getElementById('cook-trrance.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: screen.light.position },
            camera_position: { type: 'v3', value: screen.camera.position },
            material_color: { type: 'v3', value: get_color(isovalue, smin, smax, cmap, cresolution) }
        }
    });

    surfaces=new THREE.Mesh(surfaces_geo, material);
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth*0.8, window.innerHeight ] );
    });

    var elem = document.getElementById('isovalue');
    var target = document.getElementById('setvalue');
    var rangeValue = function (elem, target) {
      return function(evt){
        target.innerHTML = elem.value;
        isovalue = elem.value;
        screen.scene.remove(surfaces);
        surfaces_geo.dispose();
        surfaces_geo = Isosurfaces( volume, isovalue );
        material.uniforms.material_color.value = get_color(isovalue, smin, smax, cmap, cresolution);
        surfaces=new THREE.Mesh(surfaces_geo, material);
        screen.scene.add( surfaces );
      }
    }
    elem.addEventListener('input', rangeValue(elem, target));

    var button1 = document.getElementById('blinn-phong');
    var shading1 = function () {
      return function(evt) {
        screen.scene.remove(surfaces);
        material = new THREE.ShaderMaterial({
            vertexColors: THREE.VertexColors,
            vertexShader: document.getElementById('phong.vert').text,
            fragmentShader: document.getElementById('blinn-phong.frag').text,
            uniforms: {
                light_position: { type: 'v3', value: screen.light.position },
                camera_position: { type: 'v3', value: screen.camera.position },
                material_color: { type: 'v3', value: get_color(isovalue, smin, smax, cmap, cresolution) }
            }
        });
        surfaces=new THREE.Mesh(surfaces_geo, material);
        screen.scene.add( surfaces );
      }
    }
    button1.addEventListener('click', shading1());

    var button2 = document.getElementById('cook-trrance');
    var shading2 = function () {
      return function(evt) {
        screen.scene.remove(surfaces);
        material = new THREE.ShaderMaterial({
            vertexColors: THREE.VertexColors,
            vertexShader: document.getElementById('phong.vert').text,
            fragmentShader: document.getElementById('cook-trrance.frag').text,
            uniforms: {
                light_position: { type: 'v3', value: screen.light.position },
                camera_position: { type: 'v3', value: screen.camera.position },
                material_color: { type: 'v3', value: get_color(isovalue, smin, smax, cmap, cresolution) }
            }
        });
        surfaces=new THREE.Mesh(surfaces_geo, material);
        screen.scene.add( surfaces );
      }
    }
    button2.addEventListener('click', shading2());

    screen.loop();

    function get_color(value, cmin, cmax, cmap, cresolution)
    {
      var S0 = (cresolution-1)*(value-cmin)/(cmax-cmin);
      var U0 = Math.floor(S0);
      var T0 = Math.min(U0+1,cresolution-1);
      var CU0 = new THREE.Color().setHex( cmap[ U0 ][1] );
      var CT0 = new THREE.Color().setHex( cmap[ T0 ][1] );
      T0 = U0+1;
      var SU0 = S0-U0;
      var TS0 = T0-S0;
      var R0 = CU0.r*SU0 + CT0.r*TS0;
      var G0 = CU0.g*SU0 + CT0.g*TS0;
      var B0 = CU0.b*SU0 + CT0.b*TS0;
      return new THREE.Color(R0,G0,B0);
    }
}

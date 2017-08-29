#ifdef GL_ES
precision mediump float;
#endif

// the death

uniform vec2 u_resolution;

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);
    color 			+= step(0.5, (st.x + st.y) * 0.5);
    gl_FragColor 	= vec4(color,1.0);
}
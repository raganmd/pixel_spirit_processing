#ifdef GL_ES
precision mediump float;
#endif

// the justice

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
   	vec3 color 		= vec3(0.0);
   	vec3 mouse 		= u_mouse/u_resolution;

    color 			+= step(st.x, 0.5);
    gl_FragColor 	= vec4(color,1.0);
}
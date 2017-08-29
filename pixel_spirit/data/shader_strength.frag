#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

// strength

uniform vec2 u_resolution;

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);
    color 			+= step(0.5+cos(st.y*PI)*0.25, st.x);
    gl_FragColor 	= vec4(color,1.0);
}
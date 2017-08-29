#ifdef GL_ES
precision mediump float;
#endif

// the void

uniform vec2 u_resolution;

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);
    gl_FragColor 	= vec4(color,1.0);
}
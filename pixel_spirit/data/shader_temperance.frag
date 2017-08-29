#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

// temperance

uniform vec2 u_resolution;

float stroke(float x, float s, float width){
	float d 		= 	step(s, x + (width * 0.5)) - 
						step(s, x - (width * 0.5));
	return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);
    float offset 	= cos(st.y*PI) * 0.15;

    color 			+= stroke(st.x, 0.28 + offset, 0.1);    
    color 			+= stroke(st.x, 0.5 + offset, 0.1);
    color 			+= stroke(st.x, 0.72 + offset, 0.1);
    
    gl_FragColor 	= vec4(color,1.0);
}
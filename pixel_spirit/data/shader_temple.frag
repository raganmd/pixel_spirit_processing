#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

// priestess

uniform vec2 u_resolution;

float stroke(float x, float s, float width){
	float d 		= 	step(s, x + (width * 0.5)) - 
						step(s, x - (width * 0.5));
	return clamp(d, 0.0, 1.0);
}

float circle_SDF(vec2 st){
    return length(st - 0.5)*2.0;
}

float fill(float x, float size){
    return 1.0 - step(size, x);
}

float rectSDF(vec2 st, vec2 s){
    st              = st * 2.0 - 1.0;
    return max( abs(st.x/s.x),
                abs(st.y/s.y));
}

float crossSDF(vec2 st, float s){
    vec2 size       = vec2(0.25, s);
    return min( rectSDF(st, size.xy),
                rectSDF(st, size.yx));
}

float flip(float v, float pct){
    return mix(v, 1.0 - v, pct);
}

float vesicaSDF(vec2 st, float w){
    vec2 offset     = vec2(w * 0.5, 0.0);
    return max( circle_SDF(st-offset), 
                circle_SDF(st+offset));
}

float triSDF(vec2 st){
    st              = (st*2.0 - 1.0)*2;
    return max( abs(st.x) * 0.866025 + st.y * 0.5,
                -st.y * 0.5 );
}

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);

    st.y            = 1.0 - st.y;
    vec2 ts         = vec2( st.x, 0.82 - st.y);
    color           += fill(triSDF(st), 0.7);
    color           -= fill(triSDF(ts), 0.36);

    gl_FragColor 	= vec4(color,1.0);
}
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

// priestess

uniform vec2 u_resolution;
uniform float u_time;

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

float rhombSDF(vec2 st){
    return max( triSDF(st), 
                triSDF(vec2(st.x, 1.0 - st.y)));
}

vec2 rotate(vec2 st, float a){
    st              = mat2( cos(a), -sin(a),
                            sin(a), cos(a) ) * (st - 0.5);
    return st + 0.5;
}

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);

    st              = rotate( st, radians(45.0));

    vec2 s          = vec2(1.0);

    float r1        = rectSDF(st, vec2(1.0));
    float r2        = rectSDF(st + 0.15, vec2(1.0));

    color           += stroke(r1, 0.5, 0.05);
    color           *= step(0.325, r2);
    color           += stroke(r2, 0.325, 0.05) * fill(r1, 0.525);
    color           += stroke(r2, 0.2, 0.05);


    gl_FragColor 	= vec4(color,1.0);
}
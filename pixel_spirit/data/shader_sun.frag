#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415
#define TAU 6.28318530718
#define QTR_PI 0.78539816339

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

float polySDF(vec2 st, int V){
    st              = st * 2.0 - 1.0;
    float a         = atan(st.x, st.y) + PI;
    float r         = length(st);
    float v         = TAU / float(V);
    return cos(floor(0.5 + a/v) * v - a) * r;
}

float starSDF(vec2 st, int V, float s){
    st              = st * 4.0 - 2.0;
    float a         = atan(st.y, st.x) / TAU;
    float seg       = a * float(V);
    a               = ((floor(seg) + 0.5) / float(V) +
                        mix(s, -s, step(0.5, fract(seg))))
                        * TAU;
    return abs(dot(vec2(cos(a), sin(a)), st));
}

vec2 rotate(vec2 st, float a){
    st              = mat2( cos(a), -sin(a),
                            sin(a), cos(a) ) * (st - 0.5);
    return st + 0.5;
}

void main() {
    vec2 st 		= gl_FragCoord.st/u_resolution;
    vec3 color 		= vec3(0.0);

    float bg        = starSDF(st, 16, 0.1);
    color           += fill(bg, 1.3);
    float l         = 0.0;
    for(float i = 0; i < 8; i++){
        vec2 xy     = rotate(st, QTR_PI * i);
        xy.y        -= 0.3;
        float tri   = polySDF(xy, 3);
        color       += fill(tri, 0.3);
        l           += stroke(tri, 0.3, 0.030);
    }

    color           *= 1.0 - l;
    float c         = polySDF(st, 8);
    color           -= stroke(c, 0.15, 0.04);

    gl_FragColor 	= vec4(color,1.0);
}
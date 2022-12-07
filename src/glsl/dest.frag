uniform sampler2D tNormal;
uniform sampler2D tEffect;
uniform vec3 mouse;
uniform float time;

varying vec2 vUv;

vec3 rgb2hsv(vec3 rgb) {
  vec3 hsv = vec3(0.0);

  float maxValue = max(rgb.r, max(rgb.g, rgb.b));
  float minValue = min(rgb.r, min(rgb.g, rgb.b));
  float delta = maxValue - minValue;

  hsv.z = maxValue;

  if (maxValue != 0.0){
    hsv.y = delta / maxValue;
  } else {
    hsv.y = 0.0;
  }

  if (hsv.y > 0.0){
    if (rgb.r == maxValue) {
      hsv.x = (rgb.g - rgb.b) / delta;
    } else if (rgb.g == maxValue) {
      hsv.x = 2.0 + (rgb.b - rgb.r) / delta;
    } else {
      hsv.x = 4.0 + (rgb.r - rgb.g) / delta;
    }
    hsv.x /= 6.0;
    if (hsv.x < 0.0) {
       hsv.x += 1.0;
    }
  }

  return hsv;
}

void main(void) {
  vec4 destA = texture2D(tNormal, vUv);
  vec3 hsv = rgb2hsv(destA.rgb);

  if(hsv.z <= 0.75) {
    destA = texture2D(tEffect, vUv);
    float contrast = 0.99;
    destA.rgb = (destA.rgb - 0.5) / (1.0 - contrast) + 0.5;
    // destA.rgb *= vec3(0.25, 1.0, 1.0);
  }

  gl_FragColor = destA;
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toHex(){
    let r = this.r.toString(16);
    let g = this.g.toString(16);
    let b = this.b.toString(16);

    if(r.length<2){r = '0'+r;}
    if(g.length<2){g = '0'+g;}
    if(b.length<2){b = '0'+b;}

    return '#' + r + g + b;
  }

  getRGB(){
    return [this.r, this.g, this.b];
  }

  getHSL(){ //adapted from algorithms posted by mjackson https://gist.github.com/mjackson/5311256
    const r = this.r/255;
    const g = this.g/255;
    const b = this.b/255;

    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);

    let h = (max + min) / 2;
    let s = (max + min) / 2;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    }
    else {
      const d = max - min;
      s = l>.5 ? d/(2-max-min) : d/(max+min);

      switch (max) {
        case r:
          h = (g - b) / d + (g<b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = h/6;
    }
    return [h,s,l];
  }

  HSLtoRGB(h, s, l){ //adapted from algorithms posted by mjackson https://gist.github.com/mjackson/5311256
    function hueToRGB(p, q, t){
      if (t < 0) { t += 1; }
      if (t > 1) { t -= 1; }
      if (t < 1/6) { return p + (q - p) * 6 * t; }
      if (t < 1/2) { return q; }
      if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
      return p;
    }

    let r, g, b;

    if(s === 0){
      r = g = b = l;
    }
    else {
      const q = l<.5 ? l*(1+s) : l+s-l*s;
      const p = 2 * l - q;

      r = hueToRGB(p, q, h+1/3);
      g = hueToRGB(p, q, h);
      b = hueToRGB(p, q, h-1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  getHueShift(S){
    const shifted = this.getHSL();
    let h = shifted[0] + S;
    while ( h>1 ) { //if the shifted value of h is greater than 100% of the circle, trim it back down
      h = h - 1;
    }
    while ( h<0 ) { //if the shifted value of h is less than 0% of the circle, trim it back down
      h = h + 1;
    }
    shifted[0] = h;
    const ret = new Color(...this.HSLtoRGB(...shifted));
    return ret;
  }

  getSaturationShift(S){
    const shifted = this.getHSL();
    let s = shifted[1] + S;
    while ( s>1 ) { //if the shifted value of h is greater than 100% of the circle, trim it back down
      s = s - 1;
    }
    while ( s<0 ) {
      s = s + 1;
    }
    shifted[1] = s;
    return new Color(...this.HSLtoRGB(...shifted));
  }

  getLightShift(S){
    const shifted = this.getHSL();
    let l = shifted[2] + S;
    while ( l>1 ) { //if the shifted value of h is greater than 100% of the circle, trim it back down
      l = l - 1;
    }
    while ( l<0 ) {
      l = l + 1;
    }
    shifted[2] = l;
    return new Color(...this.HSLtoRGB(...shifted));
  }
}

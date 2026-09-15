import assets from '../data/assets.json';
export const asset = (suffix: string) => '/assets/' + (assets.find(a => a.file.endsWith(suffix))?.file ?? suffix);
export const logo = '/brand/tech-judge-wordmark.png';
export const logoMark = '/brand/tech-judge-mark.png';
export const brandAssets = assets.filter(a => a.alt.includes('Logo') && !a.alt.includes('Tech Judge') && !a.alt.includes('Icon'));

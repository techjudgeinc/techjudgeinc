import {names} from '../data/content';
export const siteUrl='https://www.techjudge.com';
export const pageNames:Record<string,string>={
 '/':'Home','/services':'All services','/industries':'Who we work with',
 '/about-us':'About us','/projects':'Our work','/plan-your-it':'Pricing',
 '/partners':'Technology partners','/service-areas':'Where we work',
 '/contact-us':'Let’s talk','/support':'Client support','/careers':'Careers',
 '/what-is-an-msp':'What is an MSP?','/privacy-policy':'Privacy policy',
 '/terms-of-service':'Terms of service',
 '/projects/pinnacle-estate-properties':'Pinnacle Estate Properties',
 ...Object.fromEntries(Object.entries(names).map(([slug,name])=>['/'+slug,name]))
};
export const searchDescriptions:Record<string,string>={
 '/it-and-cyber-security':'Managed IT and cybersecurity for Los Angeles businesses. Network, email, server and user support from your local IT team in Chatsworth.',
 '/infrastructure-and-security':'C7-licensed network cabling, Wi-Fi, cameras and access control across Los Angeles and the San Fernando Valley. Arrange a site walk with Tech Judge.',
 '/luxury-smart-home':'Smart-home networking, lighting, audio, video and security in Los Angeles, Thousand Oaks and the Valley. Plan your home technology with Tech Judge.'
};
export function breadcrumbs(path:string){
 const items=[{name:'Home',path:'/'}];
 if(path==='/'||!pageNames[path])return items;
 if(['/it-and-cyber-security','/infrastructure-and-security','/luxury-smart-home'].includes(path))items.push({name:'All services',path:'/services'});
 else if(path.startsWith('/projects/'))items.push({name:'Our work',path:'/projects'});
 else if(names[path.slice(1)]&&path!=='/what-is-an-msp')items.push({name:'Who we work with',path:'/industries'});
 items.push({name:pageNames[path],path});
 return items;
}

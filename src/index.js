import ApartLetter from './apart-letter'

const version = '0.0.1'
const components = [
  ApartLetter
]

const install = (Vue) => {
  components.forEach(component => Vue.component(component.name, component));
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  ApartLetter,
}

export default {
  install,
  version,
}

module.exports = `import {{upperComponentName}} from './src/{{name}}';
{{upperComponentName}}.install = function (Vue) {
  Vue.component({{upperComponentName}}.name, {{upperComponentName}});
};
export default {{upperComponentName}};
`;

const scss = []
function dfs(node) {
  for (let i = 0; i < node.childElementCount; i++) {
    const childNode = node.children[i];
    if (childNode.nodeName !== 'SCRIPT') {
      let style = [];
      style.push(childNode.tagName.toLowerCase());
      childNode.id ? style.push('#'.concat(childNode.id)) : null;
      for (let j = 0; j < childNode.classList.length; j++) {
        style.push('.'.concat(childNode.classList[j]));
      }
      scss.push(style.join('').concat(' {'));
      dfs(childNode);
      scss.push('}');
    }
  }
}
dfs(document.getElementsByTagName('body')[0]);
console.log(scss.join(''));

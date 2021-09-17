function dfs(node) {
  let scss = "";

  for (let i = 0; i < node.childElementCount; i++) {
    const childNode = node.children[i];

    if (childNode.nodeName !== "SCRIPT") {
      scss += childNode.tagName.toLowerCase();

      if (childNode.id) {
        scss += "#" + childNode.id;
      }

      for (let j = 0; j < childNode.classList.length; j++) {
        scss += "." + childNode.classList[j];
      }

      scss += " {";

      if (typeof childNode.onclick === "function") {
        scss += "background: red;";
      }

      if (childNode.getAttribute("href")) {
        scss += "background: blue;";
      }

      scss += dfs(childNode);

      scss += "}";
    }
  }

  return scss;
}

console.log(
  `html:not(#abdsada) {${dfs(document.getElementsByTagName("body")[0])}}`
);

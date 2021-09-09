{
  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("styles.css");
  document.getElementsByTagName("head")[0].appendChild(link);

  html2canvas(document.querySelector("#drawingArea")).then((canvas) => {
    let a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "timetable.png";
    document.body.appendChild(a);
    a.click();
    document.getElementsByTagName("head")[0].removeChild(link);
  });
}

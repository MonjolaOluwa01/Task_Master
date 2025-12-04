async function loadComponent(targetId, filePath) {
  const container = document.getElementById(targetId);
  console.log(container)
  if(!container) return;

  const response = await fetch(filePath);
  const html = await response.text();
  container.innerHTML = html;

  const cssPath = filePath.replace(".html", ".css");
  if (!document.querySelector(`link[href="${cssPath}"]`)){
     const link = document.createElement("link");
     link.rel = "stylesheet";
     link.href = cssPath;
     document.head.appendChild(link);
  }
 
  const jsPath = filePath.replace(".html", ".js");
  if (!document.querySelector(`script[src="${jsPath}"]`)){
    const script = document.createElement("script");
    script.src = jsPath;
    document.body.appendChild(script);

    script.onload = () => {
        window.dispatchEvent(new Event("sidebar-loaded"));
    };
    return;
  }
  window.dispatchEvent(new Event("sidebar-loaded"));
  
}

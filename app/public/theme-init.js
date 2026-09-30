(function () {
  var dark = true;
  try {
    var stored = localStorage.getItem("darkMode");
    dark = stored !== null
      ? stored === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    dark = true;
  }
  document.documentElement.classList.toggle("dark", dark);
})();

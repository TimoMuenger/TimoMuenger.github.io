/* Hell/Dunkel-Umschaltung.
   Läuft blockierend im <head>, damit beim Laden nicht kurz
   das falsche Thema aufblitzt. Die Wahl bleibt im Browser
   gespeichert; ohne gespeicherte Wahl gilt die Systemeinstellung. */

(function () {
  var KEY = "theme";

  function gespeichert() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function merken(wert) {
    try { localStorage.setItem(KEY, wert); } catch (e) { /* file:// ohne Speicher */ }
  }

  function setzen(thema) {
    document.documentElement.setAttribute("data-theme", thema);
    var schalter = document.getElementById("themeSwitch");
    if (schalter) schalter.setAttribute("aria-pressed", String(thema === "dark"));
  }

  var systemDunkel = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setzen(gespeichert() || (systemDunkel ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", function () {
    var schalter = document.getElementById("themeSwitch");
    if (!schalter) return;

    setzen(document.documentElement.getAttribute("data-theme"));

    schalter.addEventListener("click", function () {
      var neu = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setzen(neu);
      merken(neu);
    });
  });
})();

// https://lolchess.gg/champions/set3.5/zoe
// run in browser

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

download(
  "heros-info.json",
  JSON.stringify(
    Array.from(
      document
        .querySelector(".guide-champion-list__content")
        .querySelectorAll(".guide-champion-list__item")
    ).map((hero) => {
      return {
        imgSrc: hero.querySelector("img").src,
        keyword: hero.getAttribute("data-keyword"),
        name: hero.querySelector(".guide-champion-list__item__name").innerHTML,
      };
    }),
    null,
    2
  )
);

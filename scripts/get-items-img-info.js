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

var firstLine = [0, ...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

var ids = [
  firstLine,
  ...Array.from({ length: 9 }, (_, i) => {
    let t = 1 << (i * 2);
    return [
      ...Array.from({ length: 10 }, (_, i2) => {
        return firstLine[i2] + t;
      }),
    ];
  }),
]
  .flat()
  .slice(1);

download(
  "items-img-info.json",
  JSON.stringify(
    Array.from(
      document.querySelector("#new-item-table").querySelectorAll("img")
    ).map((img, i) => {
      return { src: img.src, dest: ids[i] };
    })
  )
);

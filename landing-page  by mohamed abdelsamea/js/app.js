// this is to recall and store the ul element to app.js
const ul = document.querySelector("#navbar__list");
// this is to recall and store the section element to app.js
const sections = document.querySelectorAll("section");
// this code to store fragment in the memory.
const fragment = document.createDocumentFragment();

// this function to build the nav bar menu and makes it dynamicly.
function buildNavigationMenu() {
  //this loop for make the nav bar have the same number of li elments with the same number of sections.
  sections.forEach(function (section) {
    //this to add id attribute inside every section element.
    const sectionId = section.getAttribute("id");
    //this to add an attribute  data-nav
    const sectionTitle = section.getAttribute("data-nav");
    // this to create li elment.
    const li = document.createElement("li");
    //this to create anchor elemnt.
    const link = document.createElement("a");
    //this to create attribute href contain the sectionId insid <a> element
    link.setAttribute("href", "#" + sectionId);
    //this to create class inside <a> element
    link.setAttribute("class", "menu__link");
    //this create the content inside the <a> element contain the sectionTitle.
    link.textContent = sectionTitle;
    //this function makes the scrolling smooth.
    link.addEventListener("click", function (evt) {
      evt.preventDefault();
      section.scrollIntoView({
        behavior: "smooth",
      });
    });
    //this code to put the link inside the li elements.
    li.appendChild(link);
    // fragment is in memory and not part of the main DOM tree, so it is not make a page reflow
    fragment.appendChild(li);
  });
  // this code to show <li> in the nav with out reflow the Dom tree.
  ul.appendChild(fragment);
}
// this code to make the function above work when page load.
window.addEventListener("load", buildNavigationMenu);
// this function to make the li  elemnt have a different style when the page scrolling on his section by using the observer pattern .
function callback(entries) {
  const activelink = document.querySelector(
    `a[href="#${entries[0].target.id}"]`
  );

  if (entries[0].isIntersecting) {
    entries[0].target.classList.add("your-active-class");
    activelink.classList.add("active-link");
  } else {
    entries[0].target.classList.remove("your-active-class");
    activelink.classList.remove("active-link");
  }
}
// this code to make the li elemenst has diffrenet style when show 65% of his section elment
const options = {
  root: null,
  rootMargin: "0px",
  // this code to make the li elemenst has diffrenet style when show 65% of his section elment
  threshold: 0.65,
};

const observer = new IntersectionObserver(callback, options);
window.addEventListener("scroll", function () {
  for (const section of sections) {
    observer.observe(section);
  }
});

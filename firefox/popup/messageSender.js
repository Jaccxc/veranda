function listenForClicks() {
  document.addEventListener("click", (e) => {

    function fillSurvey(tabs) {
      let score = 5;
      if (e.target.id === "check-radios-button"){
        score = 5;
      } else {
        score = 1;
      }
      browser.tabs.sendMessage(tabs[0].id, {
        command: "fillSurvey",
        option: score
      });
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#menu")) {
      // Ignore when click is not on a button within <div id="menu">.
      return;
    } 

    browser.tabs.query({active: true, currentWindow: true})
      .then(fillSurvey);
  })
}

browser.tabs.executeScript({file: "/content_script/veranda.js"})
.then(listenForClicks)

  
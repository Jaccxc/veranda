function listenForClicks() {
  document.addEventListener("click", (e) => {

    function fillSurvey(tabs) {
      let score = 5;
      if (e.target.id === "check-radios-button"){
        score = 5;
      } else {
        score = 1;
      }
      
      chrome.tabs.sendMessage(tabs[0].id, {
        command: "fillSurvey",
        option: score
      });
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#menu")) {
      // Ignore when click is not on a button within <div id="menu">.
      return;
    } 

    chrome.tabs.query({active: true})
      .then(fillSurvey);
  })
}

function getTabIDHelper() {
  return new Promise((resolve, reject) => {
      try {
          chrome.tabs.query({
              active: true,
          }, function (tabs) {
              resolve(tabs[0].id);
          })
      } catch (e) {
          reject(e);
      }
  })
}

getTabIDHelper().then(ctabId => chrome.scripting.executeScript({
  target: {tabId : ctabId},   
  files: [ "/content_script/veranda.js" ] 
}).then(listenForClicks))

  
(function() {
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    function checkInput(name, score){
        score = score.toString();
        var mainFrame = document.getElementsByName("mainFrame")[0];
        var htmlContent = mainFrame.contentDocument.getElementsByTagName("html")[0];
        var radioButtons = htmlContent.getElementsByTagName("input");
        for (var i = 0; i < radioButtons.length; i++) {
            if ( radioButtons[i].name === name && radioButtons[i].value === score ) {
                radioButtons[i].checked = true;
                break;
            }
        }
    }

    function fillSurvey(score) {
        const neg_score = ((parseInt(score)+4)%8).toString();
        checkInput("q1", score);
        checkInput("q2", score);
        checkInput("q3", score);
        checkInput("q4", neg_score);
        checkInput("q5", score);
        checkInput("q6", score);
        checkInput("q7", score);
        checkInput("q8", score);
        checkInput("q9", score);
        checkInput("q10", score);
        checkInput("q11", neg_score);
        checkInput("q12", score);
        checkInput("q13", score);
        checkInput("q14", score);
        checkInput("q19", score);
        checkInput("q20", score);
        checkInput("q21", score);
        checkInput("q23", score);
        checkInput("q24", score);
        checkInput("qc47", "q471");
        checkInput("qc48", "10");
        checkInput("qc49", "4");
        checkInput("qc410", "79");
    }
  
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "fillSurvey") {
        fillSurvey(message.option);
      }
    });

  })();
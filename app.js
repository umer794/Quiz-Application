const questions = [ /* Your 19 questions */ 
    {
      question: "What does HTML stand for?",
      option1: "Hyperlinks and Text Markup Language",
      option2: "Hypertext Markup Language",
      option3: "Home Tool Markup Language",
      correctOption: "Hypertext Markup Language",
    },
    {
      question: "Who is making the Web standards?",
      option1: "Google",
      option2: "The World Wide Web Consortium",
      option3: "Microsoft",
      correctOption: "The World Wide Web Consortium",
    },
    {
      question: "Choose the correct HTML element for the largest heading:",
      option1: "<heading>",
      option2: "<h6>",
      option3: "<h1>",
      correctOption: "<h1>",
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      option1: "<break>",
      option2: "<br>",
      option3: "<lb>",
      correctOption: "<br>",
    },
    {
      question: "What does CSS stand for?",
      option1: "Creative Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Computer Style Sheets",
      correctOption: "Cascading Style Sheets",
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      option1: "style",
      option2: "font",
      option3: "class",
      correctOption: "style",
    },
    {
      question: "Which is the correct CSS syntax?",
      option1: "body {color: black;}",
      option2: "{body;color:black;}",
      option3: "body:color=black;",
      correctOption: "body {color: black;}",
    },
    {
      question: "How do you add a comment in CSS?",
      option1: "// this is a comment",
      option2: "<!-- this is a comment -->",
      option3: "/* this is a comment */",
      correctOption: "/* this is a comment */",
    },
    {
      question: "Which property is used to change the background color?",
      option1: "bgcolor",
      option2: "background-color",
      option3: "color",
      correctOption: "background-color",
    },
    {
      question: "How do you select an element with id 'demo'?",
      option1: "#demo",
      option2: ".demo",
      option3: "*demo",
      correctOption: "#demo",
    },
    {
      question: "Which HTML element is used to define the title of a document?",
      option1: "<meta>",
      option2: "<title>",
      option3: "<head>",
      correctOption: "<title>",
    },
    {
      question: "What is the purpose of the <div> tag in HTML?",
      option1: "To create a division or section in a document",
      option2: "To define a hyperlink",
      option3: "To create a list",
      correctOption: "To create a division or section in a document",
    },
    {
      question: "Which HTML element is used to define an unordered list?",
      option1: "<ol>",
      option2: "<ul>",
      option3: "<li>",
      correctOption: "<ul>",
    },
    {
      question: "What is the correct HTML element for playing video files?",
      option1: "<video>",
      option2: "<media>",
      option3: "<movie>",
      correctOption: "<video>",
    },
    {
      question: "Which attribute is used to specify the URL of an image in HTML?",
      option1: "src",
      option2: "href",
      option3: "link",
      correctOption: "src",
    },
    {
      question: "How do you create a hyperlink in HTML?",
      option1: "<a href='url'>link</a>",
      option2: "<link href='url'>link</link>",
      option3: "<hyperlink href='url'>link</hyperlink>",
      correctOption: "<a href='url'>link</a>",
    },
    {
      question: "Which HTML element is used to define a table?",
      option1: "<table>",
      option2: "<tab>",
      option3: "<tbl>",
      correctOption: "<table>",
    },
    {
      question: "What is the purpose of the <form> tag in HTML?",
      option1: "To create a form for user input",
      option2: "To define a table",
      option3: "To create a hyperlink",
      correctOption: "To create a form for user input",
    },
    {
      question: "Which attribute is used to specify the action of a form in HTML?",
      option1: "method",
      option2: "action",
      option3: "submit",
      correctOption: "action",
    },
  ];
  
  let index = 0;
  let score = 0;
  let timeLeft = 900; // 15 minutes = 900 seconds
  let timerId = null;
  
  const htmlques = document.getElementById('ques');
  const htmlopt1 = document.getElementById('opt1');
  const htmlopt2 = document.getElementById('opt2');
  const htmlopt3 = document.getElementById('opt3');
  const getBtn = document.getElementById('btn');
  const progressBar = document.getElementById('progress');
  const timeDisplay = document.getElementById('time');
  const questionCount = document.getElementById('question-count');
  const backBtn = document.getElementById('back-btn');
  
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
  
  function startTimer() {
    timeDisplay.innerText = formatTime(timeLeft);
    timerId = setInterval(() => {
      timeLeft--;
      timeDisplay.innerText = formatTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerId);
        showResult();
      }
    }, 1000);
  }
  
  function nextQuestion() {
    if (index >= questions.length) {
      clearInterval(timerId);
      showResult();
      return;
    }
  
    const current = questions[index];
    htmlques.innerText = current.question;
    htmlopt1.innerText = current.option1;
    htmlopt2.innerText = current.option2;
    htmlopt3.innerText = current.option3;
  
    document.getElementById('inp1').value = current.option1;
    document.getElementById('inp2').value = current.option2;
    document.getElementById('inp3').value = current.option3;
  
    document.getElementById('inp1').checked = false;
    document.getElementById('inp2').checked = false;
    document.getElementById('inp3').checked = false;
  
    getBtn.disabled = true;
    updateProgress();
    updateQuestionCounter();
  }
  
  function btnWork() {
    getBtn.disabled = false;
  }
  
  function checkAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected && selected.value === questions[index].correctOption) {
      score++;
    }
  
    index++;
    nextQuestion();
  }
  
  function updateProgress() {
    let percent = (index / questions.length) * 100;
    progressBar.style.width = percent + "%";
  }
  
  function updateQuestionCounter() {
    questionCount.innerText = `Question ${index + 1} of ${questions.length}`;
  }
  
  function showResult() {
    Swal.fire({
      title: "Quiz Completed!",
      html: `<h3>You scored ${score} out of ${questions.length}</h3>`,
      icon: "success",
      confirmButtonText: "Awesome!",
      confirmButtonColor: "red"
    });
  
    backBtn.style.display = "inline-block";
  }
  
  function restartQuiz() {
    index = 0;
    score = 0;
    timeLeft = 900;
    backBtn.style.display = "none";
    nextQuestion();
    startTimer();
  }
  
  nextQuestion();
  startTimer();
  
var buttHurt = (function () {

	var main,
			quiz,
			cloze,
			match;

	var _allowCheck;

	var _init = function () {

		if (_checkState()) {

			try {
				_allowCheck = (localStorage.remember == "true") ? 1 : 0;
			} catch (err) {
				console.log(err);
				_allowCheck = 0;
			}

			main = document.querySelector("#MainDiv");

			if (main && I !== undefined) {
				quiz = main.querySelector(".QuizQuestions");

				if (!quiz) {
					cloze = main.querySelector("#ClozeDiv");
					if (cloze) {
						_cloze();
					} else {
						match = main.querySelector("#MatchDiv");
						if (match) {
							_match();
						}
					}
				} else {
					_quiz();
				}
			} else {
				if (F !== undefined && D !== undefined) {
					_cards();
				}
			}
		} else {
			console.log("Solved!");
		}

	};

	var _quiz = function () {
		var questions = quiz.querySelectorAll(".QuizQuestion");
		for (var i = 0; i < questions.length; i++) {
			var id = parseInt(questions[i].id.substr(2));
			switch (parseInt(I[id][2])) {
				case 0:
					// MCAnswer
					for (var j = 0; j < I[id][3].length; j++) {
						if (I[id][3][j][2] == 1) {
							quiz.querySelector("#Q_"+id+"_"+j+"_Btn").click();
							break; 
						} 
					}
					break;
				case 1:
					// ShortAnswer
					quiz.querySelector("#Q_"+id+"_Guess").value = I[id][3][0][0];
					if (_allowCheck) {
						CheckShortAnswer(id);
					}
					break;
				case 2:
					// ?
					break;
				case 3:
					// MSelAnswer
					for (var j = 0; j < I[id][3].length; j++) {
						if (I[id][3][j][2] == 1) {
							quiz.querySelector("#Q_"+id+"_"+j+"_Chk").checked = true;
						}
					} 
					if (_allowCheck) {
						CheckMultiSelAnswer(id);
					}
					break;
				default:
					break;
			}
			console.log(id);
		};
	};

	var _cloze = function () {
		for (var i = 0; i < I.length; i++) {
			try {
				cloze.querySelector("#Gap"+i).value = I[i][1][0][0];
			} catch (err) {

			}
		}
		if (_allowCheck) {
			CheckAnswers();
		}
	};

	var _match = function () {
		questions = match.querySelectorAll("select");
		for (var i = 0; i < questions.length; i++) {
			id = parseInt(questions[i].id.substr(1).split("_")[0]);
			val = parseInt(questions[i].id.substr(1).split("_")[1]);
			questions[i].value = val;
		};
		if (_allowCheck) {
			CheckAnswers();
		}
	};

	var _cards = function () {
		for (var i = 0; i < D.length; i++) { 
			var k = -1; 
			for (var j = 0; j < F.length; j++) { 
				if (D[i][1] == F[j][1]) { 
					k = j; 
					break; 
				}
			} 
			D[i][2] = F[k][1]; 
			DC[i].DockToR(FC[k]); 
			DC[i].tag = k+1;
			DC[i].Unhighlight();
		};
		if (_allowCheck) {
			CheckAnswers();
		}
	}

	var _checkState = function () {
		var currState = false;
		try {
			for (var i = 0; i < State.length; i++ ) {
				currState = currState || State[i].AnsweredCorrectly
			}
		} catch (err) {

		}

		return !currState;
	};

	return {
		init: _init,
	}
}());

buttHurt.init();

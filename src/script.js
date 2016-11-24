(function () {

var MoodleBreaker = function () {
    this._allowCheck = false;

    if (!this._checkState()) {
        try {
            this._allowCheck = localStorage.remember === 'true';
        } catch (err) {
            window.console.log(err);
        }

        var mainNode = document.querySelector('#MainDiv');
        var quizNode = mainNode.querySelector('.QuizQuestions');
        var clozeNode = mainNode.querySelector('#ClozeDiv');
        var matchNode = mainNode.querySelector('#MatchDiv');
        var crossNode = mainNode.querySelector('.CrosswordGrid');

        if (mainNode) {
            if (quizNode) {
                this._solveQuiz(quizNode);
            } else if (clozeNode) {
                this._solveCloze(closeNode);
            } else if (matchNode) {
                this._solveMatch(matchNode);
            } else if (crossNode) {
                this._solveCross();
            }
        } else if (F !== undefined && D !== undefined) {
            this._solveCards();
        }
    } else {
        console.log('Already solved!');
    }
};

MoodleBreaker.prototype = {
    _checkState: function () {
        var state = false;
        try {
            for (var i = 0; i < State.length; i++ ) {
                state = state || State[i].AnsweredCorrectly;
            }
        } catch (_err) {}

        return state;
    },

    _solveQuiz: function (quizNode) {
        var questions = quizNode.querySelectorAll('.QuizQuestion');
        for (var i = 0; i < questions.length; i++) {
            var id = parseInt(questions[i].id.substr(2), 10);
            switch (parseInt(I[id][2], 10)) {
                case 0:
                    // MCAnswer
                    for (var j = 0; j < I[id][3].length; j++) {
                        if (I[id][3][j][2] === 1) {
                            quizNode.querySelector('#Q_' + id + '_' + j + '_Btn').click();
                            break;
                        }
                    }
                    break;
                case 1:
                    // ShortAnswer
                    quizNode.querySelector('#Q_' + id + '_Guess').value = I[id][3][0][0];
                    if (this._allowCheck) {
                        CheckShortAnswer(id);
                    }
                    break;
                case 2:
                    // ?
                    break;
                case 3:
                    // MSelAnswer
                    for (var j = 0; j < I[id][3].length; j++) {
                        if (I[id][3][j][2] === 1) {
                            quizNode.querySelector('#Q_' + id + '_' + j + '_Chk').checked = true;
                        }
                    }
                    if (this._allowCheck) {
                        CheckMultiSelAnswer(id);
                    }
                    break;
                default:
                    break;
            }
            window.console.log(id);
        };
    },

    _solveCloze: function (closeNode) {
        for (var i = 0; i < I.length; i++) {
            try {
                clozeNode.querySelector('#Gap' + i).value = I[i][1][0][0];
            } catch (err) {}
        }
        if (this._allowCheck) {
            CheckAnswers();
        }
    },

    _solveMatch: function (matchNode) {
        var questions = matchNode.querySelectorAll('select');
        for (var i = 0; i < questions.length; i++) {
            id = parseInt(questions[i].id.substr(1).split('_')[0], 10);
            val = parseInt(questions[i].id.substr(1).split('_')[1], 10);
            questions[i].value = val;
        }
        if (this._allowCheck) {
            CheckAnswers();
        }
    },

    _solveCards = function () {
        for (var i = 0; i < D.length; i++) {
            var k = -1;
            for (var j = 0; j < F.length; j++) {
                if (D[i][1] === F[j][1]) {
                    k = j;
                    break;
                }
            }
            D[i][2] = F[k][1];
            DC[i].DockToR(FC[k]);
            DC[i].tag = k + 1;
            DC[i].Unhighlight();
        }
        if (this._allowCheck) {
            CheckAnswers();
        }
    },

    _solveCross = function () {
        G = L;
        for (var i = 0; i < G.length; i++) {
            for (var j = 0; j < G[0].length; j++) {
                if (G[i][j]) {
                    document.getElementById('L_' + i + '_' + j).innerHTML = G[i][j];
                }
            }
        }
        if (this._allowCheck) {
            CheckAnswers();
        }
    }
};

new MoodleBreaker();

}());

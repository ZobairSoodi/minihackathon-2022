<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/ab021e0629.js" crossorigin="anonymous"></script>
    <title>Document</title>
</head>

<body>
    <script>
        let difficulty = "<?php
                            if (isset($_POST["hard"])) {
                                echo "hard";
                            } else if (isset($_POST["normal"])) {
                                echo "normal";
                            } else {
                                echo "easy";
                            }
                            ?>";
    </script>
    <div>
        <div id="HUD">
            <div id="score_div">Score: <span id="score">0</span></div>
            <div id="timer_div">Time: <span id="timer"></span></div>
            <div id="error_div">Errors: <span id="error">0</span></div>
        </div>
    </div>

    <div id="cont">
        <div id="text">

        </div>
    </div>

    <div id="inp_cont">
        <div id="inp_div">
            <input type="text" id="inp" disabled>
        </div>
        <div id="start_div">
            <button id="start_btn"><i class="fa-solid fa-circle-play"></i></button>
        </div>
    </div>



    <div id="win">
        <h2>You Won!</h2>
        <div>
            <p>Score: <span id="score_end"></span></p>
            <p>Errors: <span id="error_end"></span></p>
        </div>
        <input id="replay" type="button" value="Replay" onclick="resetGame()">
    </div>

    <div id="lose">
        <h2>You Lost!</h2>
        <div>
            <p>Score: <span id="score_end"></span></p>
            <p>Errors: <span id="error_end"></span></p>
        </div>
        <input id="try_again" type="button" value="Try Again" onclick="resetGame()">
    </div>

    <script src="main.js"></script>
</body>

</html>
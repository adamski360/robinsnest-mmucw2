<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
</head>
<?php   require_once 'header.php';?>



<script src="Scripts/<?php echo $_GET["Game"] ?>.js"></script>

 </script>

<body>
<p id="counter"></p>
<canvas id="halma_canvasss" width="800" height="800"></canvas>
<script>
 initGame("halma_canvasss","counter");
 </script>
</body>
</html>

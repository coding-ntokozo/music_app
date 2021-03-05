<!doctype html>
<html>
<head>
  <title>Music App</title>
  <link rel="stylesheet" type="text/css" href="../assets/css/styles.css">
  <link rel="stylesheet" href="../assets/css/app_styles.css" type="text/css">
</head>
<body>

  <div  class="info-container">
    <span class="display-content">
      <div class="currentTrackInfo">
        <h4 id="currentTrack"></h4>
        <p id="currentTrackDescription">The best music</p>
      </div>
      <input type="range" id="seekbar" min="1" max="100" value="0" onchange="seekTo()">
      <div id="previous-btn" onclick="previous()"></div>
      <div id="play-btn"></div>
      <div id="next-btn" onclick='next()'></div>
    </span>
    <h3 id="display-content-title">The last Artisti</h3>
    <span class="display-content-items">
    </span>
  </div>
  </div>
  <div class="app-container">
    <h1>Music App</h1>
    <span id="search_box" ><input type="text" id="search" placeholder="search" ><span id="search_box_icon"></span> </span>
    <div class="main-app-container">
        <p id="currentTitle">Recents</p>
        <span class="items-container">
        </span>
        <span class="items-container">
          <p class="items-container-header">artist</p>
          <p class="items-container-header">genre</p>
          <p class="items-container-header">popular</p>
         </span>
        <span class="items-container">
        </span>
    </div>
  </div>
  <div id="footer">
  </div>
  <script src="../assets/js/musicshop.js">
  </script>
</body>
</html>

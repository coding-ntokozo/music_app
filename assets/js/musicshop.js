const itemsContainer = document.querySelectorAll(".items-container")[0];
const displayItemsContainer = document.querySelectorAll('.items-container')[2];
const itemsHeaderContainer = document.querySelectorAll('.items-container')[1];
const itemsContainerHeader = document.querySelectorAll('.items-container-header');
const nowPlayingItemsContainer = document.querySelector(".display-content-items");
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const seekbar = document.getElementById('seekbar');
const currentTitle = document.getElementById('currentTitle');
const MaxGrowHeight = parseInt(getComputedStyle(itemsContainer).maxHeight.replace('px','')) +
parseInt(getComputedStyle(displayItemsContainer).maxHeight.replace('px',''));
const StandardGrowHeight = parseInt(getComputedStyle(itemsContainer).maxHeight.replace('px',''));
const MinHeight = 0;
const search = document.getElementById('search');
const activeTitle = document.getElementById('currentTitle');


let currentGroupBy = 'none';
let currentPlayingTrackPos = 0;
let nowPlayingList = [];
let nowCurrentPlaying = 1;
let isPlaying = false;
let nowPlaying = document.createElement('audio');
nowPlaying.setAttribute('onEnded', 'next()');

playingTrackInfo = new Object();
playingTrackInfo.trackId= "";
playingTrackInfo.trackName="";
playingTrackInfo.artistName = "Black Coffee";
playingTrackInfo.trackPath= "1.mp3";
playingTrackInfo.genre="House";
playingTrackInfo.iconPath="";
playingTrackInfo.numberOfListenings= 0;



trackList = [
  {
    trackId: "item1",
    trackName:"I wish you were here",
    artistName: "Black Coffee",
    trackPath: "1.mp3",
    genre:"House",
    iconPath:"",
    numberOfListenings: 0

  },
  {
    trackId: "item2",
    trackName:"We fall down",
    artistName: "Mc Donnie",
    trackPath: "2.mp3",
    genre:"Gospel",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item3",
    trackName:"Lift up",
    artistName: "Mc Donnie",
    trackPath: "3.mp3",
    genre:"Gospel",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item4",
    trackName:"Great is your mercy",
    artistName: "Mc Donnie",
    trackPath: "4.mp3",
    genre:"Gospel",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item5",
    trackName:"Moments",
    artistName: "Jhene Aiko",
    trackPath: "5.mp3",
    genre:"RnB",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item6",
    trackName:"New Balance",
    artistName: "Jhene Aiko",
    trackPath: "6.mp3",
    genre:"RnB",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item7",
    trackName:"No Body",
    artistName: "Jhene Aiko",
    trackPath: "7.mp3",
    genre:"RnB",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item8",
    trackName:"Sativa",
    artistName: "Jhene Aiko",
    trackPath: "8.mp3",
    genre:"RnB",
    iconPath:"",
    numberOfListenings: 0
  }
  ,
  {
    trackId: "item9",
    trackName:"When We Love",
    artistName: "Jhene Aiko",
    trackPath: "9.mp3",
    genre:"RnB",
    iconPath:"",
    numberOfListenings: 0
  }
  ,
  {
    trackId: "item10",
    trackName:"While Were Young",
    artistName: "Jhene Aiko",
    trackPath: "10.mp3",
    genre:"RnB",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item11",
    trackName:"I wish I knew",
    artistName: "Jimmy Dlulu",
    trackPath: "11.mp3",
    genre:"Jazz",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item12",
    trackName:"Stuff",
    artistName: "Kirk Whalum",
    trackPath: "12.mp3",
    genre:"Jazz",
    iconPath:"",
    numberOfListenings: 0
  },
  
  {
    trackId: "item13",
    trackName:"Inkondlo KaShaka",
    artistName: "Mthizman",
    trackPath: "13.mp3",
    genre:"Jazz",
    iconPath:"",
    numberOfListenings: 0
  },
  {
    trackId: "item14",
    trackName:"Im healed",
    artistName: "James Fortune",
    trackPath: "14.mp3",
    genre:"Gospel",
    iconPath:"",
    numberOfListenings: 0
  }
];



//adding Events Listeners

playBtn.addEventListener('click', e=>{
if(isPlaying){
  nowPlaying.pause();
  isPlaying= false;
  playBtn.style.cssText = "background: url(../assets/img/play_btn.svg);" +
  "background-position: center;"+
  "background-size: contain;"+
  "background-repeat: no-repeat;";
}
else{
  nowPlaying.play();
  isPlaying = true;
  playBtn.style.cssText = "background: url(../assets/img/pauseBtn.svg);" +
  "background-position: center;"+
  "background-size: contain;"+
  "background-repeat: no-repeat;";

}
});
function onClickHeaderEvent(e){
  clickedHeader = e.toElement;
  if(currentGroupBy != clickedHeader.textContent){
  tempArray = groupBy(clickedHeader.textContent);
  removeDisplayItems();
    displayItemContainerGrow(tempArray.length);
  for(let i =  0 ; i < tempArray.length ; i++){
      createDisplayItem(tempArray[i]);
    }
  for(let i = 0; i< itemsContainerHeader.length; i++){
  itemsContainerHeader[i].style.fontWeight = 'normal';
  }
  clickedHeader.style.fontWeight = 'bold';
  currentGroupBy = clickedHeader.textContent;
}
}

function addEventHandlerToHeader(){
  for(let i = 0; i < itemsContainerHeader.length ; i++){
      itemsContainerHeader[i].addEventListener('click',onClickHeaderEvent);
    }
}
addEventHandlerToHeader();
/*
<span class="item-layout-small" id="item_3"><img><h4>Lift Up</h4><p>Mc Donnie</p><button  class="btn-x">PLAY</button><button class="btn-x btn-x-black">ADD</button>
  <span class="item-div"></span>
</span>;
*/
//Layout method
function fullSizeDisplayItems(){
  itemsContainer.style.height = '0';
  currentTitle.style.display = 'none';
}
//creation methods
function createTrackItem(trackItemInfo){
trackItem = document.createElement('span');
trackItem.setAttribute('class', 'item-layout-small');
console.log(trackItemInfo);
trackItem.setAttribute('id', trackItemInfo.trackId);
trackItemImage = document.createElement('img');
//trackItemImage.setAttribute('src', trackItem.iconPath);
trackItem.appendChild(trackItemImage);
trackItemHeader = document.createElement('h4');
trackItemHeader.textContent = trackItemInfo.trackName;
trackItem.appendChild(trackItemHeader);
trackItemParagraph = document.createElement('p');
trackItemParagraph.textContent = trackItemInfo.artistName;
trackItem.appendChild(trackItemParagraph);
trackItemButtonPlay = document.createElement('button');
trackItemButtonPlay.textContent = "PLAY";
trackItemButtonPlay.setAttribute('class','btn-x');
trackItem.appendChild(trackItemButtonPlay);
trackItemButtonAdd = document.createElement("button");
trackItemButtonAdd.textContent = "ADD";

trackItemButtonAdd.setAttribute('class', 'btn-x btn-x-black');
trackItem.appendChild(trackItemButtonAdd);
trackItemDiv = document.createElement('span');
trackItemDiv.setAttribute('class', 'item-div');
trackItem.appendChild(trackItemDiv);

trackItemButtonAdd.addEventListener('click', e=>{
  parent = e.toElement.parentElement;
  parentElementId = parent.getAttribute('id');
  addToNowPlayingList(parent.childNodes[1].textContent,parent.childNodes[2].textContent, parentElementId);
});

trackItemButtonPlay.addEventListener('click', e =>{
  play(e.toElement.parentElement.getAttribute('id'));
});
itemsContainer.appendChild(trackItem);
}
/*
  <span class="display-content-item"><h4>Track 1</h4><p>dfdfdsdf df</P><button class="btn-x">Play</button><span></span></span>
  */



function createNowPlayingItem(trackName, artistName, itemId){
  nowPlayingItem = document.createElement('span');
  nowPlayingItem.setAttribute('class', 'display-content-item');
  nowPlayingItemHeader = document.createElement('h4');
  nowPlayingItemHeader.textContent = trackName;
  nowPlayingItem.appendChild(nowPlayingItemHeader);
  nowPlayingItemParagraph = document.createElement('p');
  nowPlayingItemParagraph.textContent = artistName;
  nowPlayingItem.appendChild(nowPlayingItemParagraph);
  nowPlayingItemsContainer.appendChild(nowPlayingItem);
  nowPlayingItem.addEventListener('click',()=>{
      play(itemId);
  });
}

function createDisplayItem(name){
displayItem = document.createElement('span');
displayItemInfoContainer = document.createElement('span');
displayItemInfoContainerImage = document.createElement('div');
displayItem.appendChild(displayItemInfoContainerImage);
displayItemInfoHeader = document.createElement('h3');
displayItemInfoHeader.textContent = name;
displayItemInfoContainer.appendChild(displayItemInfoHeader);
displayItemInfoDescribtion = document.createElement('p');
displayItem.appendChild(displayItemInfoContainer);
displayItem.setAttribute('class','item-layout-large');
displayItemsContainer.appendChild(displayItem);
}

function removeDisplayItems(){
  let b = displayItemsContainer.children.length;
  while(b > 0){
  displayItemsContainer.removeChild(displayItemsContainer.children[0]);
  b--;
}
}
function addToNowPlayingList(trackName, trackArtist, trackId){
  if(elemInArray(nowPlayingList,trackId)==1){
  nowPlayingList.push(trackId);
  createNowPlayingItem(trackName,trackArtist,trackId);
}
}

function play(trackId){
  nowPlayingDisplayContent = document.querySelector('.currentTrackInfo').children;
  for(let i = 0; i < trackList.length; i++){
    if(trackList[i].trackId == trackId){
      isPlaying = true;
      nowPlaying.src = trackList[i].trackPath;
      nowPlayingDisplayContent[0].textContent = trackList[i].trackName;
      nowPlayingDisplayContent[1].textContent = trackList[i].artistName;
      playingTrackInfo.trackId = trackList[i].trackId;
      playingTrackInfo.trackName = trackList[i].trackName;
      playingTrackInfo.artistName = trackList[i].artistName;
      playingTrackInfo.genre = trackList[i].genre;
      currentPlayingTrackPos = i + 1;
      nowPlaying.load();
      nowPlaying.play();
      break;
    }
  }
  if(isPlaying == true){
      playBtn.style.cssText = "background: url(../assets/img/pauseBtn.svg);" +
      "background-position: center;"+
      "background-size: contain;"+
      "background-repeat: no-repeat;";
  }
  else{
    playBtn.style.cssText = "background: url(../assets/img/play_btn.svg);" +
    "background-position: center;"+
    "background-size: contain;"+
    "background-repeat: no-repeat;";
  }

  setInterval(updateSeekbar, 1000);

}

function loadTracks(){
  for(let i = 0; i < trackList.length; i++){
    createTrackItem(trackList[i]);

}
}
loadTracks();
//SeekMethods

function seekTo(){
  position = nowPlaying.duration * (seekbar.value/100);
  nowPlaying.currentTime = position;
}
let a = 1;

function updateSeekbar(){
  seekbar.value = (nowPlaying.currentTime / nowPlaying.duration) * 100;
}

function elemInArray(arraName, element){
  for(let i = 0; i < arraName.length; i++){
    if(arraName[i] == element ){
      return -1;
    }
  }
  return 1;
}

function groupBy(sortInfo){
  results = [];
  if(sortInfo == "artist"){
    for (let i = 0; i < trackList.length ; i++){
        if(elemInArray(results, trackList[i].artistName) == 1){
          results.push(trackList[i].artistName);
        }
    }
  }
  else if(sortInfo == "genre"){
    for (let i = 0; i < trackList.length ; i++){
        if(elemInArray(results, trackList[i].genre) == 1){
          results.push(trackList[i].genre);
        }
    }
  }
  else if(sortInfo == "popular"){
    tempArray = [];
    for (let i = 0; i < trackList.length ; i++){
        if(elemInArray(tempArray, trackList[i].numberOfListenings) == 1){
          tempArray.push(trackList[i].numberOfListenings);
        }
    }
    console.log(tempArray);
    for(let i  = 0; i < tempArray.length; i++){
      if(i >= 4)
      break;
      results.push(tempArray[i]);
    }

}
      return results.sort();
}

function next(){
goto = currentPlayingTrackPos + 1;
if(nowPlayingList.length == 0){
    if(0 < goto && goto < trackList.length){
      play("item" + goto);
    }
    else{
      goto = 1;
      play("item" + goto);
  }
}
else {
  console.log(playingTrackInfo);

}
}
function previous(){
goto = currentPlayingTrackPos - 1;
if(nowPlayingList.length == 0){
    if(0 <goto && goto < trackList.length){
      play("item" + goto);
    }
    else{
      goto = trackList.length - 1;
      play("item" + goto);
    }
}
}
console.log(this);


//animating the items container

itemsContainer.addEventListener('scroll',()=>{
    itemsContainerHeightGrow();

  });

let itemsContainerHeightFull = false;
let itemsContainerInitialHeight = parseInt(getComputedStyle(itemsContainer).maxHeight.replace('px','')); 

function itemsContainerHeightGrow(){
  if(itemsContainer.scrollTop + itemsContainer.clientHeight > 1.1* itemsContainer.clientHeight){
      if(itemsContainerHeightFull == false){
        itemsContainerHeightFull = true;
          let growHeight = setInterval(()=>{
            let itemsContainerHeight = getComputedStyle(itemsContainer).maxHeight;
            itemsContainerHeight = itemsContainerHeight.replace('px','');
            itemsContainerHeight = parseInt(itemsContainerHeight);
            itemsContainerHeight = itemsContainerHeight + 2;
            
            displayItemsContainerHeight = parseInt(getComputedStyle(displayItemsContainer).maxHeight.replace('px',''));
            if(displayItemsContainerHeight > 0)
              displayItemsContainerHeight = displayItemsContainerHeight - 2;
            displayItemsContainer.style.maxHeight = displayItemsContainerHeight + 'px';
            itemsContainer.style.maxHeight = itemsContainerHeight + 'px';
            if(itemsContainerHeight > 2 *itemsContainerInitialHeight){
              console.log(itemsContainerHeight);
              clearInterval(growHeight);
//              console.log(itemsContainerMaxHeight);
            }
          },5);
        }
    }
    if(itemsContainer.scrollTop == 0 && itemsContainerHeightFull == true){
      itemsContainerHeightFull = false;
       growHeight = setInterval(()=>{
        itemsContainerHeight = parseInt(getComputedStyle(itemsContainer).maxHeight.replace('px',''));
        displayItemsContainerHeight = parseInt(getComputedStyle(displayItemsContainer).maxHeight.replace('px',''));
        itemsContainerHeight = itemsContainerHeight - 2;
        displayItemsContainerHeight =displayItemsContainerHeight + 2;
        displayItemsContainer.style.maxHeight = displayItemsContainerHeight + 'px';
        itemsContainer.style.maxHeight = itemsContainerHeight + 'px';
        if(itemsContainerHeight < itemsContainerInitialHeight){
          clearInterval(growHeight);
        }
      },5);
    }
  }

function convertVwToPx(vw){
  screenWidth = document.documentElement.clientWidth;
  return vw * screenWidth/100;
}

let displayItemsContainerInitialHeight = parseInt(getComputedStyle(displayItemsContainer).maxHeight.replace('px',''));
let containerItemsCollapsed = false;

function displayItemContainerGrow(numberOfItems){
  displayItemsWidth = convertVwToPx(14.2); 
  displayItemsContainerWidth = displayItemsContainer.clientWidth;
  numberOfItemsInARow = displayItemsContainerWidth / displayItemsWidth;
  numberOfItemsInARow = Math.floor(numberOfItemsInARow);
  if(numberOfItemsInARow < numberOfItems){
    growHeight = setInterval(()=>{
      displayItemsContainerHeight = parseInt(getComputedStyle(displayItemsContainer).maxHeight.replace('px',''));
      itemsContainerHeight = parseInt(getComputedStyle(itemsContainer).maxHeight.replace('px',''))
      displayItemsContainerHeight = displayItemsContainerHeight + 5;
      itemsContainerHeight = itemsContainerHeight - 5;
      if(itemsContainerHeight < 0 ){
        itemsContainerHeight = 0;
      }
      containerItemsCollapsed = true;
      displayItemsContainer.style.maxHeight = displayItemsContainerHeight + 'px';
      itemsContainer.style.maxHeight = itemsContainerHeight + 'px';
    
      if(displayItemsContainerHeight > 2* displayItemsContainerInitialHeight){
        clearInterval(growHeight);
      }
    },5);    
  }
}


function uncollapseItemsContainer(){
    if(containerItemsCollapsed == true){
      containerItemsCollapsed = false;
      growHeight = setInterval(()=>{
        displayItemsContainerHeight = parseInt(getComputedStyle(displayItemsContainer).maxHeight.replace('px',''));
        itemsContainerHeight = parseInt(getComputedStyle(itemsContainer).maxHeight.replace('px',''));
        itemsContainerHeight = itemsContainerHeight + 2;
        displayItemsContainerHeight = displayItemsContainerHeight - 2;
        displayItemsContainer.style.maxHeight = displayItemsContainerHeight + 'px';
        itemsContainer.style.maxHeight = itemsContainerHeight + 'px';
        if(itemsContainerHeight > itemsContainerInitialHeight){
          clearInterval(growHeight);
        }
      },5);
    }
  }

activeTitle.addEventListener('click',e=>{
  elem =  e.toElement;
  if(containerItemsCollapsed == true){
    uncollapseItemsContainer();
  }
  elem.style.fontWeight = 'bold';

});


search.addEventListener('input',()=>{
  searchValue = search.value;
  console.log(searchValue);
  if(searchValue.length == 0){
    restoreContainers();   
  }
  else{
    clearContainers();
  }
});

let searchActiveState = false;


function clearContainers(){
  itemsContainer.style.display = 'none';
  currentTitle.style.display = 'none';
  if(searchActiveState == false){
    for(let i = 0; i < itemsHeaderContainer.children.length ; i++){
    itemsHeaderContainer.children[i].style.display = 'none';
    }
  resultsHeader = document.createElement('p');
  resultsHeader.setAttribute('class','items-container-header');
  resultsHeader.textContent = 'Resuls';
  itemsHeaderContainer.appendChild(resultsHeader);
  console.log('here');
}

 searchActiveState = true;
}

function restoreContainers(){
  itemsContainer.style.display = 'flex';
  currentTitle.style.display = 'block';
  
  for(let i =0; i < itemsHeaderContainer.children.length ; i++){
    itemsHeaderContainer.children[i].style.display = 'block';
  }
  itemsHeaderContainer.removeChild(itemsHeaderContainer.lastChild);

}
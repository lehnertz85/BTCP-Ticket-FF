window.addEventListener("load", loadPopup());

function rotateRefreshIcon() {
    // transform: rotate(12deg);
    var refreshIcon = document.getElementById("refresh-icon");
    var rotateValue = 0;
    var refreshInt = setInterval(function(){
        rotateValue+=10;
        if(rotateValue>1080){
            clearInterval(refreshInt)
            refreshIcon.style.transform="rotate(0deg)";
            loadOptions();
        }
        refreshIcon.style.transform="rotate("+rotateValue+"deg)";
    },10)
}
var optionsSelected = false;
function toggleOptions(){
    var quicklinks = document.getElementById("quicklinks");
    var optionsTable = document.getElementById("options-table");
    var optionsIcon = document.getElementById("options-icon");
    var theBody = document.getElementById("theBody")
    if(!optionsSelected){
        optionsIcon.style.backgroundImage="url(images/options_selected.png)";
        quicklinks.style.display="none";
        optionsTable.style.display="block";
        theBody.style.height="425px";
        theBody.style.width="270px";
    }else{
        optionsIcon.style.backgroundImage="url(images/options.png)";
        quicklinks.style.display="block";
        optionsTable.style.display="none";
        theBody.style.height="330px";
        theBody.style.width="220px";
    }
    loadOptions();
    optionsSelected=!optionsSelected;
}
function loadPopup() {
    window.onload = function(){
        var editorExtensionId = "ogmiolejjgikhpbhnbnkdlhopfknldcb";
        browser.runtime.sendMessage({type: "priceHistory"},
            function (response) {
                console.log(response);
            });
        var btcpIcon = document.getElementById("logo-icon");
        btcpIcon.onclick=function(e){
            var redirectWindow = window.open('https://btcprivate.org/', '_blank');
            redirectWindow.location;
        };
        var refreshIcon = document.getElementById("refresh-icon");
        refreshIcon.onclick=function(e){
            rotateRefreshIcon();
            refreshBadgeAndTitle()
        };
        var optionsIcon = document.getElementById("options-icon");
        optionsIcon.onclick=function(e){
            toggleOptions();
        };
        var githubIcon = document.getElementById("github-icon");
        githubIcon.onclick=function(e){
            var redirectWindow = window.open('https://github.com/BTCPrivate', '_blank');
            redirectWindow.location;
        };
    }
}
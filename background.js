window.addEventListener("load", loadBackground());
var fetchInterval;
function loadBackground() {
    var valid = store.validateIntegrity();
    if(valid){
        prepareBadge();
        prepareListener();

        BtcpPrice
            .fetch
            .currencyList()
            .then(function () {
                BtcpPrice
                    .fetch
                    .btcpPrice()
                    .then(function () {
                        BtcpPrice
                            .fetch
                            .nanoPrice()
                            .then(function () {
                                setTitle();
                                if (shouldMonitorWealth() === true) {
                                    var wealth = BtcpPrice.getWealth()
                                    setBadge(wealth);
                                } else {
                                    setBadge();
                                }
                                launchInterval();
                            })
                    })
            })
    }else{
        loadBackground();
    }
}

function fetchBtcpPrice(cb) {
    BtcpPrice
        .fetch
        .btcpPrice()
        .then(function () {
            setTitle();
            setBadge();
        })
}


function prepareListener() {
    browser.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log('Received');

            if (sender.tab) {
                //RECEIVED FROM A CONTENT SCRIPT : Options ?
            } else {
                //RECEIVED FROM THE EXTENSION (POPUP)
                if (request && request.hasOwnProperty('type')) {
                    switch (request.type) {
                        case "priceHistory":
                            sendResponse(BtcpPrice.getPriceHistory());
                            break;
                    }
                }

            }
        }
    )
}
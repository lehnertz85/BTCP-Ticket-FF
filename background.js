function updatebadge() {
  var exchange = localStorage["exchange"];
  var currency = localStorage["currency"];
  if (!exchange) {
    // default to cmc
    exchange = "cmc";
  }
  if (!currency) {
    // default to usd
    currency = "usd";
  }
/******************************************************************************************************/

  if (exchange === "cmc") {
    if (currency === "usd") {
      $.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin-private/", function(data) {
        var badge = "n/a";

        var price = data[0].price_usd;
        console.log(price);
        if (price) {
          localStorage['btcp_usd'] = price;
        }
      });
    } else if (currency === "eur") {
      $.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin-private/?convert=EUR", function(data) {
        var badge = "n/a";

        var price_eur = data[0].price_eur;
        console.log(price_eur);
        if (price_eur) {
          localStorage['btcp_eur'] = price_eur;
        }
      });
    } else if (currency === "cad") {
      $.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin-private/?convert=CAD", function(data) {
        var badge = "n/a";

        var price_cad = data[0].price_cad;
        console.log(price_cad);
        if (price_cad) {
          localStorage['btcp_cad'] = price_cad;
        }
      });
    } else {badge = "n/a"}
  }

/******************************************************************************************************/

  if (exchange === "nano") {
    if (currency === "nano") {
      $.getJSON("https://nanex.co/api/public/ticker/btcpnano", function(data) {
        var badge = "n/a";

        var price_nano = data.last_trade;
        console.log(price_nano);
        if (price_nano) {
          localStorage['btcp_nano'] = price_nano;
        }
      });
    } else {badge = "n/a"}
  }
/******************************************************************************************************/

  if (exchange === "ts") {
    if (currency === "ltc") {
      $.getJSON("https://tradesatoshi.com/api/public/getticker?market=BTCP_LTC", function(data) {
        var badge = "n/a";

        var price_ltc = data.result.last;
        console.log(price_ltc);
        if (price_ltc) {
          localStorage['btcp_ltc_ts'] = price_ltc;
        }
      });
    }else if (currency === "bch") {
      $.getJSON("https://tradesatoshi.com/api/public/getticker?market=BTCP_BCH", function(data) {
        var badge = "n/a";

        var price_bch = data.result.last;
        console.log(price_bch);
        if (price_bch) {
          localStorage['btcp_bch_ts'] = price_bch;
        }
      });
    } else {badge = "n/a"}
  }

/******************************************************************************************************/

  if (currency == "eur") {
    if (localStorage['btcp_eur']) {
      badge = localStorage['btcp_eur'];
      badge = roundForBadge(badge);
    }
  } else if (currency == "usd") {
    if (localStorage['btcp_usd']) {
      badge = localStorage['btcp_usd'];
      badge = roundForBadge(badge);
    }
  } else if (currency == "cad") {
    if (localStorage['btcp_cad']) {
      badge = localStorage['btcp_cad'];
      badge = roundForBadge(badge);
    }
  }else if (currency == "nano") {
    if (localStorage['btcp_nano']) {
      badge = localStorage['btcp_nano'];
      badge = roundForBadge(badge);
    }
  }else if (currency == "ltc") {
    if (localStorage['btcp_ltc_ts']) {
      badge = localStorage['btcp_ltc_ts'];
      badge = roundForBadge(badge);
    }
  }else if (currency == "bch") {
    if (localStorage['btcp_bch_ts']) {
      badge = localStorage['btcp_bch_ts'];
      badge = roundForBadge(badge);
    }
  }

  browser.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 255]});

  browser.browserAction.setBadgeText({'text': badge});
}
//setInterval(updatebadge, 5 * 60 * 1000);
setInterval(updatebadge, 1 * 60 * 1000);
updatebadge();

browser.browserAction.onClicked.addListener(function(tab) {
  browser.browserAction.setBadgeBackgroundColor({color: [75, 244, 66, 255]});
  browser.browserAction.setBadgeText({'text': "..."});
  updatebadge();

});

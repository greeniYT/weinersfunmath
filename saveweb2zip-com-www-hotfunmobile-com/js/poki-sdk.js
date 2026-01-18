var adTime = new Date().getTime();
var isShowAFG = false;
var adNum = 0;
var afttimestep = 36000;
//console.log =function(){};
function showAFG(){
 var aftafg = (window.AFTAFG != null) ? (window.AFTAFG) : ((window.top.AFTAFG != null) ? (window.top.AFTAFG) : null);
 var timestamp=new Date().getTime();
 console.log("timestamp.........",timestamp,adTime);
 if(timestamp-adTime>afttimestep){
 afttimestep = 36000;
 setTimeout(function() {
  console.log("setTimeout .........");
  if (aftafg&&!isShowAFG) {
   adTime = timestamp;
   isShowAFG = true;
   aftafg.playAd(function(ret) {
    console.log("sdk banner ret type", ret, 1);
    isShowAFG = false;
   }, 1);
  } 
  else{
    isShowAFG = false;
  }
 }, 600)}
};

function showRewardAFG(callBack){
  var aftafg = (window.AFTAFG != null) ? (window.AFTAFG) : ((window.top.AFTAFG != null) ? (window.top.AFTAFG) : null);
     if(!callBack)return; 
     if(isShowAFG)return;
     isShowAFG = true;
  if (aftafg) {
   aftafg.playAd(function(ret) {
    var timestamp=new Date().getTime();
    adTime = timestamp;
    console.log("sdk banner ret type", ret, 1);
     callBack&&callBack(ret);
     //如果没有自己的广告失败提示 则加入我们自己的提示 否则注视掉
    //  if(ret==false){ui.alert("Ad is not ready.Pls try later!",2000);}
    isShowAFG = false;
   }, 2);
  }
  else{
     console.log("NO AFG SHOW OK...");
     isShowAFG = false;
     callBack&&callBack(false);  //默认情况下返回false  本地测试的时候可以返回true
    //  ui.alert("Ad is not ready.Pls try later!",2000);	
  }
 };

var game_load_finished = 0;
function send_gameStatus(type){
 var aftafg = (window.AFTAFG != null) ? (window.AFTAFG) : ((window.top.AFTAFG != null) ? (window.top.AFTAFG) : null);
 if(aftafg){
  aftafg.send_gameStatus(type);
 }
}



(() => {
  var e = function (e) {
      var t = RegExp("[?&]" + e + "=([^&]*)").exec(window.location.search);
      return t && decodeURIComponent(t[1].replace(/\+/g, " "));
    },
    t = "kids" === e("tag"),
    n = "yes" === e("gdhoist"),
    o = new ((function () {
      function e() {
        var e = this;
        (this.queue = []),
          (this.init = function (t, n) {
            return (

              // void 0 === t && (t = 1),
              // void 0 === n && (n = 1),
              new Promise(function (o, i) {
                o(1);
                // e.enqueue("init", [t, n], o, i);
              })
            );
          }),
          (this.rewardedBreak = function () {
            return new Promise(function (e) {
              showRewardAFG(function(state){
                if(state){
                    e(1);
                }else{
                    e(!1);
                }
            });
            });
          }),
          (this.commercialBreak = function (t) {
            return new Promise(function (n, o) {
              n(1);

              // e.enqueue("commercialBreak", [t], n, o);
            });
          }),
          (this.displayAd = function (e, t, n, o) {
            o && o(!0), n && n();
          }),
          (this.withArguments = function (t) {
            return function () {
              for (var n = [], o = 0; o < arguments.length; o++)
                n[o] = arguments[o];
              e.enqueue(t, n);
            };
          }),
          (this.handleAutoResolvePromise = function () {
            return new Promise(function (e) {
              e();
            });
          }),
          (this.throwNotLoaded = function () {
            console.debug(
              "PokiSDK is not loaded yet. Not all methods are available."
            );
          }),
          (this.doNothing = function () {});
      }
      return (
        (e.prototype.enqueue = function (e, n, o, i) {
          var r = { fn: e, args: n || [], resolveFn: o, rejectFn: i };
          t ? o && o(!0) : this.queue.push(r);
        }),
        (e.prototype.dequeue = function () {
          for (
            var e = this,
              t = function () {
                var t,
                  o,
                  i = n.queue.shift(),
                  r = i,
                  a = r.fn,
                  u = r.args;
                if ("function" == typeof window.PokiSDK[a])
                  if (
                    (null == i ? void 0 : i.resolveFn) ||
                    (null == i ? void 0 : i.rejectFn)
                  ) {
                    var s = "init" === a;
                    if (
                      ((t = window.PokiSDK)[a]
                        .apply(t, u)
                        .catch(function () {
                          for (var t = [], n = 0; n < arguments.length; n++)
                            t[n] = arguments[n];
                          "function" == typeof i.rejectFn &&
                            i.rejectFn.apply(i, t),
                            s &&
                              setTimeout(function () {
                                e.dequeue();
                              }, 0);
                        })
                        .then(function () {
                          for (var t = [], n = 0; n < arguments.length; n++)
                            t[n] = arguments[n];
                          "function" == typeof i.resolveFn &&
                            i.resolveFn.apply(i, t),
                            s &&
                              setTimeout(function () {
                                e.dequeue();
                              }, 0);
                        }),
                      s)
                    )
                      return "break";
                  } else (o = window.PokiSDK)[a].apply(o, u);
                else console.error("Cannot execute " + a);
              },
              n = this;
            this.queue.length > 0;

          ) {
            if ("break" === t()) break;
          }
        }),
        e
      );
    })())();
  (window.PokiSDK = {
    init: o.init,
    initWithVideoHB: o.init,
    commercialBreak: o.commercialBreak,
    rewardedBreak: o.rewardedBreak,
    displayAd: o.displayAd,
    destroyAd: o.doNothing,
    getLeaderboard: o.handleAutoResolvePromise,
    shareableURL: function () {
      return new Promise(function (e, t) {
        return t();
      });
    },
    getURLParam: function (t) {
      return e("gd" + t) || e(t) || "";
    },
    getLanguage: function () {
      return navigator.language.toLowerCase().split("-")[0];
    },
    isAdBlocked: function () {},

    gameLoad: function(){
        
        if(game_load_finished==0){game_load_finished=1;send_gameStatus(1);console.log(" game  load  ")}
      },

      gameStart: function(){
        
        if(game_load_finished==1){game_load_finished=2;send_gameStatus(2);console.log(" game  start  ")}

      },

      gameEnd: function(){
          console.log(" game  end end ")
          showAFG();
      }
  }),
    [
      "captureError",
      "customEvent",
      "gameInteractive",
      "gameLoadingFinished",
      "gameLoadingProgress",
      "gameLoadingStart",
      "gameplayStart",
      "gameplayStop",
      "happyTime",
      "logError",
      "muteAd",
      "roundEnd",
      "roundStart",
      "sendHighscore",
      "setDebug",
      "setDebugTouchOverlayController",
      "setLogging",
      "setPlayerAge",
      "setPlaytestCanvas",
      "enableEventTracking",
    ].forEach(function (e) {
      window.PokiSDK[e] = o.withArguments(e);
    });
//   var i,
//     r,
//     a =
//       ((i = window.pokiSDKVersion || e("ab") || "v2.308.0"),
//       (r = "poki-sdk-core-" + i + ".js"),
//       t && (r = "poki-sdk-kids-" + i + ".js"),
//       n && (r = "poki-sdk-hoist-" + i + ".js"),
//       "https://game-cdn.poki.com/scripts/" + i + "/" + r),
//     u = document.createElement("script");
//   u.setAttribute("src", a),
//     u.setAttribute("type", "text/javascript"),
//     u.setAttribute("crossOrigin", "anonymous"),
//     (u.onload = function () {
//       return o.dequeue();
//     }),
//     document.head.appendChild(u);
})();

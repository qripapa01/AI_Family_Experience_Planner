// 교과ON 측정 모듈: 방문·클릭·사전신청을 구글 시트로 보냅니다.
// 수집: 무작위 방문자 ID(브라우저 저장), UTM, 유입 경로, 화면 동작. 아이 개인정보는 수집하지 않습니다.
(function () {
  var ENDPOINT = window.GYOGWAON_ENDPOINT || '';
  function ls(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function ss(k, v) {
    try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; }
  }
  function rid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  var vid = ls('go_vid'); if (!vid) { vid = rid(); ls('go_vid', vid); }
  var sid = ss('go_sid'); if (!sid) { sid = rid(); ss('go_sid', sid); }

  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utm = {};
  try {
    var p = new URLSearchParams(location.search), found = false;
    KEYS.forEach(function (k) { var v = p.get(k); if (v) { utm[k] = v.slice(0, 80); found = true; } });
    if (found) ss('go_utm', JSON.stringify(utm));
    else { var s = ss('go_utm'); if (s) utm = JSON.parse(s); }
  } catch (e) {}

  function send(type, data) {
    if (!ENDPOINT) return Promise.resolve(false);
    var payload = {
      type: type, ts: new Date().toISOString(), vid: vid, sid: sid,
      page: location.pathname + location.hash,
      ref: (document.referrer || '').slice(0, 200),
      ua: (navigator.userAgent || '').slice(0, 120),
      w: window.innerWidth || 0,
      utm_source: utm.utm_source || '', utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '', utm_content: utm.utm_content || '', utm_term: utm.utm_term || '',
      data: data || {}
    };
    return fetch(ENDPOINT, {
      method: 'POST', mode: 'no-cors', keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(function () { return true; });
  }
  window.GO = { send: send, enabled: !!ENDPOINT, vid: vid };
  send('pageview', {});
})();

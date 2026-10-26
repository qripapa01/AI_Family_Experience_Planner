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
    payload.eid = rid() + rid(); payload.av = window.GYOGWAON_VER || '';
    // 중요 기록(신청·설문)은 즉시 결과를 돌려주고, 실패하면 저장해 두었다가 다시 보냅니다(서버는 eid로 중복을 걸러냄).
    var critical = (type === 'signup' || type === 'survey');
    if (critical) {
      return post(payload).then(function () { return true; }, function (err) { enqueue(payload); throw err; });
    }
    enqueue(payload);
    return Promise.resolve(true);
  }
  function post(payload) {
    return fetch(ENDPOINT, {
      method: 'POST', mode: 'no-cors', keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
  }
  // 보내지 못한 기록 대기열(브라우저에 저장, 최대 100건). 한 번에 하나씩 순서대로 보내 서버 부하를 줄입니다.
  var flushing = false, fails = 0;
  function loadQ() { try { return JSON.parse(ls('go_q') || '[]'); } catch (e) { return []; } }
  function saveQ(q) { ls('go_q', JSON.stringify(q.slice(-100))); }
  function enqueue(payload) { var q = loadQ(); q.push(payload); saveQ(q); flush(); }
  function flush() {
    if (flushing || !ENDPOINT) return;
    var q = loadQ(); if (!q.length) return;
    flushing = true;
    post(q[0]).then(function () {
      var cur = loadQ(); cur.shift(); saveQ(cur); fails = 0; flushing = false;
      setTimeout(flush, 80);
    }, function () {
      flushing = false; fails++;
      setTimeout(flush, Math.min(60000, 3000 * fails));
    });
  }
  window.addEventListener('online', flush);
  window.addEventListener('pageshow', flush);
  window.GO = { send: send, enabled: !!ENDPOINT, vid: vid };
  send('pageview', {}).catch(function () {});
  flush();
})();

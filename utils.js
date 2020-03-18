const loadScript = (url, cb) => {
  const el = document.createElement('script');
  el.src = url;
  el.onload = () => {
    console.log('sdk loaded!');
    cb();
  };

  document.body.appendChild(el);
};


export {
  loadScript
}
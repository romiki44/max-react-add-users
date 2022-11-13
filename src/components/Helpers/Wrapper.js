//namiesto <div></div> tento Wrapper
//ide o to, ze ak react-element obshauje viac sub-elementov, musi byt nad nimi jeden div...ako wrapper
//ak sa to pouzije casto, tak napr. vo vacsej apke moze existovat vela prazdnych divov...
//...takze preto tento prazdny Wrapper component!
//P.S. Netreba pouzivat vlastny Wrapper, staci pouzit <React.Fragment></React.Fragment> alebo <></>
//<></> sa musi projekt nastavit tak, aby ho podporoval, React.Fragment podporuje automaticky
const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;

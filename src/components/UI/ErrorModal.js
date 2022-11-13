import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Card from './Card';
import classes from './ErrorModal.module.css';

//pouzitie portalu pre modal-overlay okno...
//najprv treba v index.htm nadefinovat div#id pre BackDrop aj pre ModalOverlay...vid index.html!
//vytvorime componenty BackDrop/ModalOverlay...teraz pre jednoduchost su v ramci ErrorModal componentu
//v ErrorModal volame funkciu ReactDOM.createPortal, kde vlozime jsx-component a id-elementu kde sa pripne v dom-e
//treba este presmerovat vsetky props z ErrorModal do BackDrop a ModalOverlay aby to fungovalo
//pozor...v sub-componentoch volame props.onConfirm namiesto props.onClick(!!!)....ale to je otazka zapisu
//vysledok je, ze vzdy ked zavolame Backdrop alebo ModalOverlay, budu v Doome navrchu mimo root!!!
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>{props.message}</div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModale = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
        />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

// const ErrorModale = (props) => {
//   return (
//     <Fragment>
//       <div className={classes.backdrop} onClick={props.onConfirm}></div>
//       <Card className={classes.modal}>
//         <header className={classes.header}>
//           <h2>{props.title}</h2>
//         </header>
//         <div className={classes.content}>{props.message}</div>
//         <footer className={classes.actions}>
//           <Button onClick={props.onConfirm}>Okay</Button>
//         </footer>
//       </Card>
//     </Fragment>
//   );
// };

export default ErrorModale;

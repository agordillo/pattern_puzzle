import "./../assets/scss/MainScreen.scss";

import { useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";

export default function MainScreen({ solvePuzzle, solved, solvedTrigger }) {


  const { appSettings: config, I18n } = useContext(GlobalContext);




  return (
    <div className="mainScreen">



    </div>
  );
}

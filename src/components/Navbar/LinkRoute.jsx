import IconHome from "../../icons/IconHome";
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconCheckList from '../../icons/IconCheckList'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LinkRoute({ link }) {

  const [selectIcon, setSelectIcon] = useState({
    home: <IconHome />,
    question: <IconCircleQuestion />,
    checklist: <IconCheckList />
  })
  return (
    <li className="sidebar__li">

      <Link to={link.route}>
        {console.log(link.route)}
        {selectIcon[link.icon]}
        <span className="sidebar__li--name">{link.title}</span>
      </Link>
      {/* <a href={link.route}>
        {selectIcon[link.icon]}
        <span className="sidebar__li--name">{link.title}</span>
      </a> */}


      <ul className="sidebar__submenu blank">
        <li>
          <Link
            className="sidebar__submenu--name sidebar__submenu--link"
            to={link.route}
          >
            {link.title}
          </Link>
        </li>
      </ul>
    </li>
  );
}

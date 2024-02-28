import IconHome from "../../icons/IconHome";
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconCheckList from '../../icons/IconCheckList'
import { useState } from "react";

export default function LinkRoute({ link }) {

  const [selectIcon, setSelectIcon] = useState({
    home: <IconHome />,
    question: <IconCircleQuestion />,
    checklist: <IconCheckList />
  })
  return (
    <li className="sidebar__li">
      <a href={link.route}>
        {selectIcon[link.icon]}
        <span className="sidebar__li--name">{link.title}</span>
      </a>
      <ul className="sidebar__submenu blank">
        <li>
          <a
            className="sidebar__submenu--name sidebar__submenu--link"
            href={link.route}
          >
            {link.title}
          </a>
        </li>
      </ul>
    </li>
  );
}

import { useState } from "react";
import IconCircleQuestion from "../../icons/IconCircleQuestion";
import IconArrowDown from "../../icons/IconArrowDown";
import IconArrowUp from "../../icons/IconArrowUp";
import IconHome from "../../icons/IconHome";
import IconCheckList from "../../icons/IconCheckList";

export default function DropDown({link}) {

      const [dropDownActive, setDropDownActive] = useState(false)
      const [selectIcon, setSelectIcon] = useState({
            home: <IconHome />,
            question: <IconCircleQuestion />,
            checklist: <IconCheckList />
          })
  const toggleDropDown = () => {
    if (dropDownActive) return setDropDownActive(!dropDownActive);
    return setDropDownActive(!dropDownActive);
  };

  return (
    <li
      className={"sidebar__li " + dropDownActive.toString()}
      onClick={toggleDropDown}
    >
      <div className="sidebar__drop">
        <p className="none">
          {selectIcon[link.icon]}
          <span className="sidebar__li--name">{link.title}</span>
        </p>
        {!dropDownActive && <IconArrowDown />}
        {dropDownActive && <IconArrowUp />}
      </div>

      <ul className="sidebar__submenu">
        <li>
          <p className="sidebar__submenu--name sidebar__submenu--link">
            {link.title}
          </p>
        </li>
        {link.dropDown.map((el, i) => (
          <li key={i}>
            <a className="sidebar__submenu--name dato-buscado" href={el.route}>
              {el.title}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

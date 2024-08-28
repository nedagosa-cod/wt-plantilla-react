import { useContext, useEffect, useRef, useState } from 'react'
import CheckListContext from '../../../context/ChecklistContext'
import IconEdit from '../../../icons/IconEdit'
import GlobalContext from '../../../context/GlobalContext'
import { bottom } from '@popperjs/core'

const ListCheck = ({ check, title, updateCheck, data }) => {
    const {
        checkSelected,
        changeDescription,
        relativePosition,
        resetList,
        hover,
        posHover,
        refRightSide,
        refListCheck,
    } = useContext(CheckListContext)
    const { admin, setAdmin } = useContext(GlobalContext)

    const [stepTitle, setStepTitle] = useState(title)
    const [listChecked, setListChecked] = useState('')
    const [edit, setEdit] = useState(stepTitle === 'XXXXX' ? true : false)

    const inputCheck = useRef()

    const showRelativeDescription = e => {
        const relativeDescription = () => {
            refRightSide.current.scrollTo({ top: 0, behavior: 'smooth' })
            if (e.target.checked) {
                console.log(e.target)
                setListChecked('checked')
                return relativePosition[check][0]
            } else {
                e.target.parentNode.parentNode.parentNode.classList.remove('checked')
                setListChecked('')
                return relativePosition[check][1]
            }
        }

        if (relativePosition[check].includes(checkSelected)) {
            changeDescription(relativeDescription())
        } else {
            e.target.checked = !e.target.checked
        }
    }
    const createStep = valor => {
        updateCheck(prevState => ({
            ...prevState,
            DESCRIPCIONES: prevState.DESCRIPCIONES.map(desc => {
                if (desc.check === check) {
                    return {
                        ...desc,
                        html: desc.html.map(
                            item => (item.TITULO ? { ...item, TITULO: valor } : item) // Actualiza solo el objeto que tiene TITULO
                        ),
                    }
                } else {
                    return desc
                }
            }),
        }))
    }
    useEffect(() => {
        setListChecked('')
        inputCheck.current.checked = false
        inputCheck.current.parentNode.parentNode.parentNode.classList.remove('checked')
        const adminInputText = document.getElementById('inputText')
        if (adminInputText && admin) {
            adminInputText.focus()
        }
    }, [resetList, edit])

    return (
        <li className="LeftSide__ul--li">
            {admin && (
                <label
                    htmlFor="inputText"
                    onClick={() => {
                        setEdit(true)
                    }}>
                    <IconEdit className={admin ? 'admin svg-edit' : 'admin off'} />
                </label>
            )}
            <label className={'ListCheck ' + listChecked + ' ' + (posHover == check ? hover : '')}>
                <span>{check}</span>
                {stepTitle === 'XXXXX' || edit ? (
                    <input
                        type="text"
                        placeholder="Asignar titulo del paso"
                        className={admin ? 'admin input-step' : 'admin off'}
                        id="inputText"
                        value={stepTitle}
                        onChange={e => setStepTitle(e.target.value)}
                        onBlur={e => {
                            setEdit(false)
                            createStep(e.target.value)
                        }}
                        onKeyUp={e => {
                            if (e.key === 'Enter') {
                                setEdit(false)
                                setStepTitle(e.target.value)
                                createStep(e.target.value)
                            }
                        }}
                    />
                ) : (
                    <h2>{title}</h2>
                )}

                <div className="checkbox-wrapper-44">
                    <label className="toggleButton">
                        <input ref={inputCheck} type="checkbox" onChange={showRelativeDescription} id={check} />
                        <div className="svg">
                            <svg viewBox="0 0 44 44">
                                <path
                                    transform="translate(-2.000000, -2.000000)"
                                    d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"></path>
                            </svg>
                        </div>
                    </label>
                </div>
            </label>
        </li>
    )
}

export default ListCheck

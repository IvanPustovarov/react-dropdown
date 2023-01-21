import React, { useState, useCallback, useEffect } from "react";
import '../assets/styles/dropdown.scss';
import Rus from '../assets/img/rus.svg';
import Eng from '../assets/img/eng.svg';
import Esp from '../assets/img/esp.svg';
import Gem from '../assets/img/gem.svg';
import Italy from '../assets/img/italy.svg';
import Pol from '../assets/img/pol.svg';

export function DropDown() {
    interface IItem {
        name: string,
        url: JSX.Element,
        checked: boolean,
        disabled: boolean
    }
    const handleInputCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const item = languageArray?.find((item) => item.name === target.name);
        item.checked = !item.checked;
        setLanguage(languageArray);
        memoizedFilteredArray();
    }
    const handleInputOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        if (target.id === 'multi') setIsMultiselect(target.checked);
        if (target.id === 'icon') setIsIcon(target.checked);
    }
    const languages: IItem[] = [
        {
            name: 'Русский',
            url: <Rus />,
            checked: false,
            disabled: false,
        },
        {
            name: 'Английский',
            url: <Eng />,
            checked: false,
            disabled: false,
        },
        {
            name: 'Испанский',
            url: <Esp />,
            checked: false,
            disabled: false,
        },
        {
            name: 'Немецкий',
            url: <Gem />,
            checked: false,
            disabled: false,
        },
        {
            name: 'Итальянский',
            url: <Italy />,
            checked: false,
            disabled: false,
        },
        {
            name: 'Польский',
            url: <Pol />,
            checked: false,
            disabled: false,
        }
    ];

    const [languageArray, setLanguage] = useState(languages);
    const [filteredArray, setFilteredArray] = useState([]);
    const [searchedArray, setSearchedArray] = useState([]);
    const [isMultiselect, setIsMultiselect] = useState(true);
    const [isIcon, setIsIcon] = useState(true);
    const [search, setSearch] = useState('');

    const memoizedFilteredArray = useCallback(
        () => {
            const resultFilteredArray = languageArray.filter(item => item.checked);
            setFilteredArray(resultFilteredArray);
        },
        [languageArray, isMultiselect],
    );

    const isMultiselectUI = () => {
        return isMultiselect && filteredArray.length > 1;
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const renderedArray = (): IItem[] => {
        return searchedArray.length ? searchedArray : languageArray;
    }

    useEffect(() => {
        if (!isMultiselect && filteredArray.length) {
            const uncheckedArray = languageArray.slice();
            for (let index = 0; index < uncheckedArray.length; index++) {
                const element = uncheckedArray[index];
                if (!element.checked) {
                    element.disabled = true;
                }
            }
            setLanguage(uncheckedArray);
        }
        return () => {
            if (!isMultiselect && filteredArray.length) {
                const uncheckedArray = languageArray.slice();
                for (let index = 0; index < uncheckedArray.length; index++) {
                    const element = uncheckedArray[index];
                    if (!element.checked) {
                        element.disabled = false;
                    }
                }
                setLanguage(uncheckedArray);
            }
        };
    }, [isMultiselect, filteredArray.length]);

    useEffect(() => {
        const resultArray = languageArray.filter((item) => item.name.includes(search));
        setSearchedArray(resultArray);
    }, [search]);

    return (
        <div>
            <div>
                Мульти-селект
                <input
                    type="checkbox"
                    name="multi"
                    id="multi"
                    onChange={handleInputOptionsChange}
                    checked={isMultiselect}
                    disabled={isMultiselectUI()}
                />
                Иконка
                <input
                    type="checkbox"
                    name="icon"
                    id="icon"
                    onChange={handleInputOptionsChange}
                    checked={isIcon}
                />
            </div>
            <div>Язык</div>
            <div>
                {filteredArray?.map((item) =>
                    <div key={item.name}>
                        {item.name}
                    </div>)}
            </div>
            <div>
                <input type="text" value={search} onChange={handleSearchChange} />
            </div>
            <div>
                {renderedArray().map((item) =>
                    <div key={item.name}>
                        {isIcon ? item.url : ''} {item.name}
                        <input
                            type="checkbox"
                            name={item.name}
                            id={item.name}
                            onChange={handleInputCheckChange}
                            disabled={item.disabled}
                            defaultChecked={item.checked}
                        />
                    </div>)
                }
            </div>
        </div>
    )
}

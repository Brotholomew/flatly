import Button from "./Button";
import {useState} from "react";
import {ButtonType} from "../../common/enums/ButtonType";

export interface sortCriterion {
    placeholder: string,
    order: boolean,
    checked: boolean,
    callback: (how: boolean, order: boolean) => void
}

export interface searchField {
    placeholder: string,
    callback: (q: string) => void
}

export interface searchProps {
    mainSearchField: searchField,
    extendedSearchFields: searchField[],
    sortCriteria: sortCriterion[]
}

const Search = (props: searchProps) => {
    const [extended, setExtended] = useState<boolean>(false);
    const extendedContent =
        extended
            ?
            <div className={'extended'}>
                {props.extendedSearchFields.map((value, index) =>
                    <div className={'searcher'} key={index}>
                        <input type="text" placeholder={value.placeholder} onChange={(e) => value.callback(e.target.value)}/>
                    </div>
                )}
                {props.sortCriteria.map((value, index) =>
                    <div className={'sorter'} key={index}>
                        <input type={"checkbox"} checked={value.checked} onChange={(e) => value.callback(e.target.checked, value.order)} />
                        <label>{value.placeholder}</label>
                        <Button
                            type={ButtonType.BLANK}
                            click={() => value.callback(true, !value.order)}
                        >
                            {value.order ? 'Ascending' : 'Descending'}
                        </Button>
                    </div>
                )}
            </div>
            :
            <></>

    return(
        <div className={'searcher-wrapper'}>
            <div className={'extender-button-wrapper'}>
                <Button
                    icon={'search'}
                    type={ButtonType.BLANK}
                    click={() => setExtended(!extended)}
                    />
                <Button
                    icon={extended ? 'caret-down' : 'caret-right'}
                    type={ButtonType.BLANK}
                    click={() => setExtended(!extended)}
                />
            </div>
            <div className={'search-area'}>
                <div className={'always-visible'}>
                    <div className={'searcher'}>
                        <input type="text" placeholder={props.mainSearchField.placeholder} onChange={(e) => props.mainSearchField.callback(e.target.value)}/>
                    </div>
                </div>
                {
                    extendedContent
                }
            </div>
        </div>
    )
}

export default Search;
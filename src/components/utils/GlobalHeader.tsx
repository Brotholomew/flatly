import SwitchButton, {SwitchButtonProps} from "./SwitchButton";
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import useAuth from "../../modules/useAuth";
import {ButtonType} from "../../common/enums/ButtonType";
import {setStyle} from "../../store/modules/styles/actions";

export interface GlobalHeaderProps {
    extended: boolean,
    sbProps: SwitchButtonProps
}

const GlobalHeader = (props: GlobalHeaderProps) => {
    const [style, setInnerStyle] = useState(useSelector((state: any) => state.styleReducers))
    const { logout } = useAuth();
    const dispatch = useDispatch();

    const changeStyle = () => {
        if (style === 'theme-default') {
            dispatch(setStyle('theme-dark'))
            setInnerStyle('theme-dark')
        }
        else {
            dispatch(setStyle('theme-default'))
            setInnerStyle('theme-default');
        }
    }

    let content =
        <div className={'header'}>
            <div className={"header right"}><h1>Flatly</h1></div>
            <div className={'header left'}>
                <SwitchButton {...props.sbProps} />
                <Button icon={'sign-out-alt'} click={() => logout()} type={ButtonType.BLANK}/>
                <Button icon={'moon'} click={changeStyle} type={ButtonType.BLANK}/>
            </div>
        </div>;

    if (!props.extended)
        content =
            <div className={'header'}>
                <div className={"header right"}><h1>Sign in</h1></div>
                <div className={'header left'}>
                    <Button icon={'moon'} click={changeStyle} type={ButtonType.BLANK}/>
                </div>
            </div>;
    return(content);
}

export default GlobalHeader;
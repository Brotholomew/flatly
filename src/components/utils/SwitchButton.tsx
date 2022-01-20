import Button from "./Button";
import {ButtonType} from "../../common/enums/ButtonType";

export interface SwitchButtonElement {
    title: string,
    callback: () => void
}

export interface SwitchButtonProps {
    options: SwitchButtonElement[],
    selectedIndex: number
}

const SwitchButton = (props: SwitchButtonProps) => {
    return(
      <div className={'switch-button'} >
          {props.options.map((element: SwitchButtonElement, index) =>
              <Button
                  type={index === props.selectedIndex ? ButtonType.SWITCH_BUTTON_SELECTED : ButtonType.SWITCH_BUTTON}
                  click={element.callback}
                  key={index}
              >
                  {element.title}
              </Button>
          )}

      </div>
    );
}

export default SwitchButton;
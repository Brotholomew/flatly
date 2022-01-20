import {Tag} from "../../common/types/Tag";
import Button from "../utils/Button";
import {ButtonType} from "../../common/enums/ButtonType";

interface TagInterface<T extends Tag> {
    deleteTag: (tag: T) => void,
    tag: T
}

const TagBrick = <T extends Tag,> (props: TagInterface<T>) => {
    return (
        <div className={'tag-brick'}>
            {props.tag.name}
            <Button
                icon={'times'}
                click={() => props.deleteTag(props.tag)}
                type={ButtonType.TAG_DELETION}
            />
        </div>
    );
}

export default TagBrick;
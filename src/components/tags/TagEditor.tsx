import {Tag} from "../../common/types/Tag";
import TagBrick from "./TagBrick";
import "./TagEditor.scss"

export interface TagEditorInterface<T extends Tag> {
    addTag: (name: string) => Promise<any>,
    deleteTag: (tag: T) => void,
    initialTags: T[]
}

const TagEditor = <T extends Tag,> (props: TagEditorInterface<T>) => {
    const addTag = (name: string) => {
        props.addTag(name)
            .catch((e: any) => console.error(e))
    }

    const inputChange = (event: any) => {
        if ((event.target.value as string).endsWith(',')) {
            // get the tag name without a comma
            let tag = (event.target.value as string).substring(0, (event.target.value as string).length - 1).trim();

            // if the tag is not empty, add it
            if (tag.length > 0)
                addTag(tag);

            // clear the input field
            event.target.value = "";

            // set focus on the input again, once the component re-renders
            setTimeout(() => {
                document.getElementById('tag-input')?.focus();
            }, 100)
        }
    }

    return (
        <div className={'tag-editor-wrapper'}>
            {props.initialTags.map((tag: T, index: number) =>
                <TagBrick tag={tag} deleteTag={props.deleteTag} key={index} />
            )}
            <input id={'tag-input'} className={'tag-input'} type={'text'} onChange={inputChange} />
        </div>
    );
}

export default TagEditor;
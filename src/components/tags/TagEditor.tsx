import {Tag} from "../../common/types/Tag";
import TagBrick from "./TagBrick";
import {useEffect} from "react";

export interface TagEditorInterface<T extends Tag> {
    addTag: (name: string) => Promise<any>,
    deleteTag: (tag: T) => void,
    initialTags: T[]

    focused: boolean,
    setFocused: (flag: boolean) => void
}

const TagEditor = <T extends Tag,> (props: TagEditorInterface<T>) => {
    useEffect(() => {
       if (!props.focused){
           document.getElementById('tag-input')?.focus();
       }
    });

    const addTag = (name: string) => {
        props.addTag(name)
            .catch((e: any) => console.error(e))

        props.setFocused(true);
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
            props.setFocused(false);

            // in case the component does not re-render, set the focus here too
            document.getElementById('tag-input')?.focus();
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
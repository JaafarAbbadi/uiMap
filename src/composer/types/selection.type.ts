import { Icon } from "./icons"

/**Selection Item Variations */
type SelectionTitle = {title: string; subTitle?: string}
type SelectionType = 'single'|'limited'|'multi'
type SelectionMode = 'radio'|'checkbox'|'chip'|'list'|'search'
type selectionOptions = string[]| {image: string; title: SelectionTitle}[] | {icon: Icon; title: SelectionTitle}[] | {title: string; subTitle: string;}

export interface Selection {
    type: SelectionType;
    mode: SelectionMode;
    options: selectionOptions;
}

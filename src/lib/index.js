/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

export {
    copyToClipboard,
    createRouteFromName,
    generateMaterialDocsFromMarkdown,
    getElementOffsetSum,
    usePageScroll,
    AspectRatio,
    getContainerByType,
    getChildrenFromContainer,
    getTextFromChildren,
    createChainableTypeChecker,
    goToPage,
    replaceMarkdownParams,
    getFieldFromLang,
} from "./utils";
export {
    useGroups,
    GroupsContext,
    LangContext,
    useLang,
    NestingContext,
    useNesting,
    SearchContext,
    useSearch,
    TaggingContext,
    useTags,
    useMenu,
    MenuContext,
    useSwitchPage,
    SwitchPageContext,
} from "./hooks";
export {
    withGroups,
    withLang,
    withLocalLang,
    withMenu,
    withNesting,
    withSearch,
    withSwitchPage,
    withTags
} from "./HOCs"
export {
    TableRow,
    TableHead,
    TableBody,
    Table,
    DocsMenuItem,
    PagesGroup,
    AutoDocsMenu,
    ListItem,
    Block,
    Bold,
    Code,
    CodeSpan,
    DemoWithCode,
    DocsMenu,
    DocsPage,
    DocsPages,
    ExpansionCode,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Header,
    Image,
    Italic,
    LanguageSelector,
    List,
    ListItemContained,
    Markdown,
    SearchField,
    TableCell,
    Tagable,
    Link,
    DocsLayout,
    Locale,
} from "./components";
export {
    DefaultTheme
} from "./theme";
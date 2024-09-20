// store/layoutStore.ts
import { atom } from 'recoil';
import LayoutItem from '@/utils/Types';

// Atom for layout state
export const GlobalLayoutRecState = atom<LayoutItem[]>({
    key: 'GlobalLayoutRecState', // unique ID (with respect to other atoms/selectors)
    default: [],        // initial value
});

// Atom for unsaved changes state
export const GlobalLayoutUnsavedChangesRecState = atom<boolean>({
    key: 'GlobalLayoutUnsavedChangesRecState',
    default: false,     // initial value
});

// Atom for new item index
export const newLayoutItemIndexRecState = atom<number>({
    key: 'newLayoutItemIndexRecState',
    default: 0,
});

// Atom for the URL state
export const urlRecState = atom<string>({
    key: 'urlRecState',
    default: '',        // initial value
});

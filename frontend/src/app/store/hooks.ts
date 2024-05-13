import { AppDispatch, RootState } from './store';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

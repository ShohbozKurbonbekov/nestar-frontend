export interface T {
  [key: string]: any;
}

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

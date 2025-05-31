/* eslint-disable react/prop-types */
export function Header({author}){
    return (<h1>Belajar React {author ? author : 'Dudul'}</h1>);
}
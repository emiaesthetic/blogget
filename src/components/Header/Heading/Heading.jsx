import style from './Heading.module.css';

export const Heading = ({ children }) => (
  <h1 className={style.heading}>{children}</h1>
);

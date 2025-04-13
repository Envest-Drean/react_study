import style from "./Header.module.css";
import ignitelogo from "../assets/Ignite-logo.svg";

console.log(ignitelogo);
export function Header() {
	return (
		<header className={style.header}>
			<img src={ignitelogo} alt="ignite logotipo" />
			<strong> ignite feed </strong>;
		</header>
	);
}
